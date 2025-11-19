import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/mockProducts';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/articles/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
            </div>
            <h2 className={styles.title}>{product.title}</h2>
            <div className={styles.price}>{product.price.toLocaleString()}원</div>
            <div className={styles.region}>{product.region}</div>
            <div className={styles.counts}>
                <span>관심 {product.likeCount}</span>
                <span>∙</span>
                <span>채팅 {product.chatCount}</span>
            </div>
        </Link>
    );
}
