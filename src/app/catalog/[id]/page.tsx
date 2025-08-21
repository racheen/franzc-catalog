'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProductDetails } from '@/hooks/useProductDetails';
import { useEffect, useState } from 'react';
import { useCatalog } from '@/hooks/useCatalog';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { product, loading, error } = useProductDetails(id as string);
  const { catalogItems } = useCatalog();
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    if (product && product.mainImageIndex !== undefined) {
      setMainImage(product.mainImageIndex);
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const currentIndex = catalogItems.findIndex((item) => item.id === id);
  const prevProduct = catalogItems[currentIndex - 1];
  const nextProduct = catalogItems[currentIndex + 1];

  const navigateProduct = (productId: string) => {
    router.push(`/catalog/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Link href="/catalog" className="text-black font-serif mb-8 inline-block">
        ← BACK TO CATALOG
      </Link>
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="sticky top-8 self-start">
            <img
              src={product.imageUrls[mainImage]}
              alt={`${product.name} - Main Image`}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-2">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-serif font-bold text-black mb-1">
                  {product.name.toUpperCase()}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      prevProduct && navigateProduct(prevProduct.id)
                    }
                    disabled={!prevProduct}
                    className={`mr-4 text-2xl ${
                      prevProduct
                        ? 'text-black hover:text-gray-700 cursor-pointer'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    aria-label="Previous product"
                  >
                    &#8249;
                  </button>
                  <button
                    onClick={() =>
                      nextProduct && navigateProduct(nextProduct.id)
                    }
                    disabled={!nextProduct}
                    className={`text-2xl ${
                      nextProduct
                        ? 'text-black hover:text-gray-700 cursor-pointer'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    aria-label="Next product"
                  >
                    &#8250;
                  </button>
                </div>
              </div>
              <p className="text-md text-gray-600">{product.description}</p>
              <p className="text-md font-serif font-bold text-black">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="overflow-y-auto max-h-200 grid grid-cols-2 gap-4">
              {product.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${product.name} - Image ${index + 1}`}
                  className={`w-full h-auto object-cover cursor-pointer ${
                    index === mainImage ? 'border-2 border-black' : ''
                  }`}
                  onClick={() => setMainImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
