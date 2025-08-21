import { useState, useEffect } from 'react';
import { catalogCollection } from '@/lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { CatalogItem } from '@/types/CatalogItem';

export function useProductDetails(id: string) {
  const [product, setProduct] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(catalogCollection, id));
        if (productDoc.exists()) {
          setProduct({
            id: productDoc.id,
            ...productDoc.data(),
          } as CatalogItem);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
