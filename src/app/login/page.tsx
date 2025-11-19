'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email);
        } else {
            alert('이메일과 비밀번호를 입력해주세요.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">
                    <svg width="100" height="40" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="24" fill="#FF6F0F" fontSize="32" fontWeight="bold" fontFamily="sans-serif">당근</text>
                    </svg>
                </Link>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="이메일"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.loginButton}>
                    로그인
                </button>
            </form>

            <div className={styles.divider}>또는</div>

            <button type="button" className={styles.googleButton} onClick={loginWithGoogle}>
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" fillRule="evenodd" />
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" fillRule="evenodd" />
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" fillRule="evenodd" />
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" fillRule="evenodd" />
                </svg>
                Google로 계속하기
            </button>

            <div className={styles.signupLink}>
                아직 계정이 없으신가요? <Link href="#">회원가입</Link>
            </div>
        </div>
    );
}
