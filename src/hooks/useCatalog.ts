import { useState, useEffect } from 'react';
import { catalogCollection } from '@/lib/firebase';
import { getDocs } from 'firebase/firestore';
import { CatalogItem } from '@/types/CatalogItem';

export function useCatalog() {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogItems = async () => {
      try {
        const snapshot = await getDocs(catalogCollection);
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as CatalogItem)
        );
        setCatalogItems(items);
        setLoading(false);
      } catch (err) {
        setError('Error loading catalog items');
        setLoading(false);
      }
    };

    fetchCatalogItems();
  }, []);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(catalogItems.length - 1, prevIndex + 1)
    );
  };

  const previousItem = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const currentItem = catalogItems[currentIndex];

  return {
    catalogItems,
    currentItem,
    currentIndex,
    loading,
    error,
    nextItem,
    previousItem,
    isFirstItem: currentIndex === 0,
    isLastItem: currentIndex === catalogItems.length - 1,
  };
}
