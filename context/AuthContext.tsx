

"use client"; 

import { createContext, useState, useEffect } from 'react';
import { request } from '../services/request'; 
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { 'auth.token': token } = parseCookies();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async ({ username, password }: SignIdData) => {
        try {
            const response = await request<{ token: string }>('/services/login', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const { token } = response;

            if (!token) {
                setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
            } else {
                setCookie(null, 'auth.token', token, {
                    maxAge: 60 * 60 * 24,
                    path: '/',
                });
                setIsAuthenticated(true);
                router.push('/products');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setAuthError('Erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <AuthContext.Provider value={{ login, authError, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
