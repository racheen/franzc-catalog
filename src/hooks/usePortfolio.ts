'use client';

import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import {
  Academic,
  Experience,
  PortfolioData,
  Profile,
  Project,
} from '@/types/portfolio';

// Helper function to parse date strings
const parseDate = (dateString: string): number => {
  if (dateString === 'Present') return Infinity;
  const [month, year] = dateString.split(' ');
  const monthIndex = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ].indexOf(month);
  return new Date(parseInt(year), monthIndex).getTime();
};

// Sorting function
const sortByDate = (a: { year: string[] }, b: { year: string[] }): number => {
  const dateA =
    a.year[1] === 'Present' ? parseDate(a.year[0]) : parseDate(a.year[1]);
  const dateB =
    b.year[1] === 'Present' ? parseDate(b.year[0]) : parseDate(b.year[1]);

  if (dateA === dateB) {
    // If both end dates are the same (e.g., both are 'Present'),
    // sort by the start date instead
    return parseDate(b.year[0]) - parseDate(a.year[0]);
  }

  return dateB - dateA;
};
export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const mainData = docSnap.data();
          setProfile(mainData.profile);

          // Fetch experiences subcollection
          const experiencesCollection = collection(docRef, 'experiences');
          const experiencesSnapshot = await getDocs(experiencesCollection);
          const experiencesData = experiencesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Experience[];
          const sortedExperiences = experiencesData.sort(sortByDate);
          setExperiences(sortedExperiences);

          // Fetch projects subcollection
          const projectsCollection = collection(docRef, 'projects');
          const projectsSnapshot = await getDocs(projectsCollection);
          const projectsData = projectsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
          const sortedProjects = projectsData.sort(sortByDate);
          setProjects(sortedProjects);

          // Fetch academics subcollection
          const academicsCollection = collection(docRef, 'academics');
          const academicsSnapshot = await getDocs(academicsCollection);
          const academicsData = academicsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Academic[];
          const sortedAcademics = academicsData.sort(sortByDate);
          setAcademics(sortedAcademics);

          setData({
            profile: mainData.profile,
            experiences: experiencesData,
            projects: projectsData,
            academics: academicsData,
          } as PortfolioData);
        } else {
          throw new Error('No portfolio data found');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

  return { data, experiences, profile, projects, academics, loading, error };
}
