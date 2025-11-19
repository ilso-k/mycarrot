'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get('search') || '');

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/?search=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="물품이나 동네를 검색해보세요"
                className={styles.searchInput}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    );
}

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="24" fill="#FF6F0F" fontSize="24" fontWeight="bold" fontFamily="sans-serif">당근</text>
                    </svg>
                </Link>

                <Suspense fallback={<div className={styles.searchBar} />}>
                    <SearchBar />
                </Suspense>

                <nav className={styles.nav}>
                    {user && (
                        <Link href="/articles/new" className={styles.navButton}>
                            글쓰기
                        </Link>
                    )}
                    <Link href="#" className={`${styles.navButton} ${styles.downloadButton}`}>
                        앱 다운로드
                    </Link>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{user.name}님</span>
                            <button onClick={logout} className={styles.navButton}>
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className={styles.navButton}>
                            로그인
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
