'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UploadPage() {
    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [region, setRegion] = useState(''); // New state for region
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const router = useRouter();
    const { user } = useAuth(); // Get user info

    const categories = [
        '디지털기기', '생활가전', '가구/인테리어', '생활/주방',
        '유아동', '여성패션', '남성패션', '뷰티/미용',
        '스포츠/레저', '취미/게임/음반', '도서', '티켓/교환권',
        '가공식품', '반려동물용품', '식물', '기타 중고물품'
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImages([...images, URL.createObjectURL(e.target.files[0])]);
        }
    };

    const handleSubmit = async () => {
        if (!title || !category || !description || !region) {
            alert('필수 정보를 모두 입력해주세요. (제목, 카테고리, 내용, 거래 장소)');
            return;
        }

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    category,
                    price,
                    description,
                    images,
                    region,
                    sellerName: user?.name || '익명'
                }),
            });

            if (response.ok) {
                alert('상품이 등록되었습니다!');
                router.push('/');
                router.refresh(); // Refresh server components
            } else {
                alert('등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.uploadHeader}>
                    <button className={styles.closeButton} onClick={() => router.back()}>닫기</button>
                    <h1 className={styles.title}>중고거래 글쓰기</h1>
                    <button className={styles.submitButton} onClick={handleSubmit}>완료</button>
                </div>

                <div className={styles.form}>
                    <div className={styles.imageSection}>
                        <label className={styles.imageUploadButton}>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden />
                            <span>📷</span>
                            <span>{images.length}/10</span>
                        </label>
                        {images.map((img, idx) => (
                            <div key={idx} className={styles.imagePreview} style={{ backgroundImage: `url(${img})` }}></div>
                        ))}
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="글 제목"
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup} onClick={() => setShowCategoryModal(true)} style={{ cursor: 'pointer' }}>
                        <input
                            type="text"
                            placeholder="카테고리 선택"
                            className={styles.input}
                            value={category}
                            readOnly
                            style={{ pointerEvents: 'none' }}
                        />
                        <span className={styles.arrow}>&gt;</span>
                    </div>

                    {showCategoryModal && (
                        <div className={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                <h3 className={styles.modalTitle}>카테고리 선택</h3>
                                <div className={styles.categoryList}>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            className={styles.categoryItem}
                                            onClick={() => {
                                                setCategory(cat);
                                                setShowCategoryModal(false);
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="거래 희망 장소 (예: 강남구 역삼동)"
                            className={styles.input}
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="number"
                            placeholder="가격 (선택사항)"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" /> 가격 제안 받기
                        </label>
                    </div>

                    <div className={styles.textareaGroup}>
                        <textarea
                            placeholder="게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
                            className={styles.textarea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
