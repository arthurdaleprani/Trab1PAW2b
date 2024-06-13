
"use client"; 

import { useContext, useState } from 'react';
import { AuthContext, SignIdData } from '../../context/AuthContext'; 
import { useRouter } from 'next/navigation'; 

const Login: React.FC = () => {
    const { login, authError } = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login({ username, password });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col p-4 border rounded">
                <label htmlFor="username" className="mb-2">Usuário:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 mb-2 border rounded"
                    required
                />
                <label htmlFor="password" className="mb-2">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 mb-2 border rounded"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Acessar</button>
            </form>
            {authError && <p className="mt-4 text-red-500">{authError}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default Login;
