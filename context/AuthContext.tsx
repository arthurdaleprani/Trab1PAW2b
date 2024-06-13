"use client";

import { createContext, useState, useEffect } from "react";
import { request } from '../services/request';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/navigation";

export type SignIdData = {
    username: string;
    password: string;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    authError: string | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const { 'auth.token': token } = parseCookies();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    async function login({ username, password }: SignIdData) {
        try {
            let { 'x-access-token': token } = await request<{ 'x-access-token': string }>('http://localhost:5000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

            if (!token) {
                setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
            } else {
                setCookie(null, 'auth.token', token, {
                    maxAge: 60 * 60 * 1,
                });
                setIsAuthenticated(true);
                router.push('/products');
            }
        } catch (error) {
            setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
        }
    }

    return (
        <AuthContext.Provider value={{ login, authError, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
