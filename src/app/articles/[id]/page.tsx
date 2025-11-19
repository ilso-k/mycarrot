import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { productService } from '@/service/productService';
import Image from 'next/image';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await productService.getById(id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className={styles.image}
                        priority
                    />
                </div>

                <div className={styles.profileSection}>
                    <div className={styles.profile}>
                        <div className={styles.avatarWrapper}>
                            <Image
                                src={product.seller.avatar}
                                alt={product.seller.name}
                                width={40}
                                height={40}
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.sellerName}>{product.seller.name}</div>
                            <div className={styles.region}>{product.region}</div>
                        </div>
                    </div>
                    <div className={styles.temperature}>
                        <div className={styles.tempValue}>{product.seller.temperature}°C</div>
                        <div className={styles.tempBar}>
                            <div className={styles.tempFill} style={{ width: `${product.seller.temperature}%` }}></div>
                        </div>
                        <div className={styles.tempLabel}>매너온도</div>
                    </div>
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <div className={styles.categoryTime}>
                        {product.category} ∙ {product.timeAgo}
                    </div>
                    <div className={styles.price}>{product.price.toLocaleString()}원</div>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.counts}>
                        관심 {product.likeCount} ∙ 채팅 {product.chatCount} ∙ 조회 100
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
