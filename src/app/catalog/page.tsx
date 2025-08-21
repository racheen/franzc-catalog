'use client';

import Link from 'next/link';
import { useCatalog } from '@/hooks/useCatalog';

export default function CatalogPage() {
  const { catalogItems, loading, error } = useCatalog();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-serif font-bold text-black mb-12 text-center">
        COLLECTION
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {catalogItems.map((item, index) => (
          <div key={item.id} className="relative group">
            <Link href={`/catalog/${item.id}`}>
              <div className="aspect-w-3 aspect-h-4 mb-4">
                <img
                  src={item.imageUrls[item.mainImageIndex || 0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 left-2 bg-white  text-black px-2 py-1 text-sm">
                {item.name.toUpperCase()}
              </div>
            </Link>
            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              ☆
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
