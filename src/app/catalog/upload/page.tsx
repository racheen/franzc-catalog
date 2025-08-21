'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SpotlightLayout from '@/components/Navigation';
import { useUploadCatalogItem } from '@/hooks/useUploadCatalogItem';

export default function UploadCatalogItem() {
  const router = useRouter();
  const { uploadItem, uploading, error } = useUploadCatalogItem();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    const success = await uploadItem(
      {
        name,
        description,
        price: parseFloat(price),
        imageUrls: [],
        mainImageIndex: 0,
      },
      files
    );

    if (success) {
      router.push('/catalog');
    }
  };

  return (
    <SpotlightLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Upload New Catalog Item
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Images
              </label>
              <input
                type="file"
                id="images"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                required
                className="mt-1 block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {uploading ? 'Uploading...' : 'Upload Item'}
            </button>
          </form>
        </main>
      </div>
    </SpotlightLayout>
  );
}
