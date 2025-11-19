'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    loginWithGoogle: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Check for existing session (mock)
    useEffect(() => {
        const storedUser = localStorage.getItem('daangn_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string) => {
        const newUser = {
            name: '당근이',
            email: email,
            avatar: 'https://picsum.photos/seed/avatar1/100/100',
        };
        setUser(newUser);
        localStorage.setItem('daangn_user', JSON.stringify(newUser));
        router.push('/');
    };

    const loginWithGoogle = () => {
        const newUser = {
            name: 'Google User',
            email: 'google@example.com',
            avatar: 'https://picsum.photos/seed/google/100/100',
        };
        setUser(newUser);
        localStorage.setItem('daangn_user', JSON.stringify(newUser));
        router.push('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('daangn_user');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
