import { useState } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { catalogCollection } from '@/lib/firebase';
import { CatalogItem } from '@/types/CatalogItem';

export function useUploadCatalogItem() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadItem = async (item: Omit<CatalogItem, 'id'>, files: FileList) => {
    setUploading(true);
    setError(null);

    try {
      console.log('Starting upload process');
      console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      console.log(
        'Upload Preset:',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const imageUrls = await Promise.all(
        Array.from(files).map(async (file, index) => {
          console.log(`Uploading file ${index + 1} of ${files.length}`);
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
          );

          const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
          console.log('Upload URL:', uploadUrl);

          const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary upload error:', errorData);
            throw new Error(
              `Failed to upload image to Cloudinary: ${JSON.stringify(
                errorData
              )}`
            );
          }

          const data = await response.json();
          console.log(
            `File ${index + 1} uploaded successfully:`,
            data.secure_url
          );
          return data.secure_url;
        })
      );

      console.log('All files uploaded successfully');
      console.log('Image URLs:', imageUrls);

      // Firebase Firestore addition
      try {
        const docRef = await addDoc(catalogCollection, {
          ...item,
          imageUrls,
          price: parseFloat(item.price.toString()),
          mainImageIndex: 0, // Set default value to 0
          createdAt: serverTimestamp(),
        });
        console.log('Catalog item added to Firestore with ID:', docRef.id);
        return true;
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        if (firestoreError instanceof Error) {
          setError(`Firestore error: ${firestoreError.message}`);
        } else {
          setError('Unknown Firestore error occurred');
        }
        return false;
      }
    } catch (err) {
      console.error('Error in uploadItem:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to upload catalog item. Please try again.'
      );
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { uploadItem, uploading, error };
}
