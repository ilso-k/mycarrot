import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Upload an image file to Firebase Storage
 * @param file - The image file to upload
 * @param folder - The folder path in storage (default: 'products')
 * @returns The public download URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string = 'products'): Promise<string> {
    try {
        // Create a unique filename using timestamp and random string
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 9);
        const filename = `${timestamp}_${randomString}_${file.name}`;

        // Create a reference to the storage location
        const storageRef = ref(storage, `${folder}/${filename}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('이미지 업로드에 실패했습니다.');
    }
}

/**
 * Upload multiple images to Firebase Storage
 * @param files - Array of image files to upload
 * @param folder - The folder path in storage (default: 'products')
 * @returns Array of public download URLs
 */
export async function uploadMultipleImages(files: File[], folder: string = 'products'): Promise<string[]> {
    try {
        const uploadPromises = files.map(file => uploadImage(file, folder));
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        console.error('Error uploading multiple images:', error);
        throw new Error('이미지 업로드에 실패했습니다.');
    }
}
