import { Product } from '@/data/mockProducts';
import { db } from '@/lib/firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    query,
    orderBy
} from 'firebase/firestore';

class ProductService {
    private collectionName = 'products';

    async getAll(): Promise<Product[]> {
        try {
            const q = query(collection(db, this.collectionName), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Product));
        } catch (error) {
            console.error("Error getting documents: ", error);
            return [];
        }
    }

    async getById(id: string): Promise<Product | undefined> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Product;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error("Error getting document: ", error);
            return undefined;
        }
    }

    async search(keyword: string): Promise<Product[]> {
        const allProducts = await this.getAll();
        return allProducts.filter(p =>
            p.title.includes(keyword) ||
            p.region.includes(keyword) ||
            p.description.includes(keyword)
        );
    }

    async addProduct(product: Omit<Product, 'id' | 'timeAgo' | 'likeCount' | 'chatCount' | 'seller'> & { sellerName: string }) {
        const newProductData = {
            ...product,
            likeCount: 0,
            chatCount: 0,
            timeAgo: '방금 전',
            createdAt: new Date().toISOString(),
            seller: {
                name: product.sellerName,
                avatar: 'https://picsum.photos/100/100',
                temperature: 36.5
            }
        };

        try {
            const docRef = await addDoc(collection(db, this.collectionName), newProductData);
            return { id: docRef.id, ...newProductData } as Product;
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    }
}

export const productService = new ProductService();
