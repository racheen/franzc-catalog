export interface Experience {
  id: string;
  as: string;
  company: string;
  website?: string;
  year: string[];
  description: string[];
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string[];
  description: string[];
  repo?: string;
  prod?: string;
  demo?: string;
  year: string[];
  hide?: boolean;
}

export interface Academic {
  id?: string;
  school: string;
  degree: string;
  year: string[];
  website: string;
  description?: string[];
  gpa: string;
  logo?: string;
}

export interface Profile {
  createdAt: string;
  githubLink: string;
  id: string;
  instagramLink: string;
  linkedinLink: string;
  resumeLink: string;
  updatedAt: string;
  email: string;
  name: string;
  about: string;
  location: string;
}

export interface PortfolioData {
  experiences: Experience[];
  projects: Project[];
  academics: Academic[];
  profile: Profile;
}
