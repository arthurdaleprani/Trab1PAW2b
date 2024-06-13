"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";

const Login = () => {
    const { register, handleSubmit } = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = async (data: SignIdData) => {
        await login(data);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col p-4 border rounded" onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="username">Usuário: </label>
                <input
                    {...register('username')}
                    type="text"
                    name='username'
                    id='username'
                    placeholder="username"
                    className="mb-2 p-2 border rounded"
                />
                <label htmlFor="password">Senha: </label>
                <input
                    {...register('password')}
                    type="password"
                    name='password'
                    id='password'
                    placeholder="password"
                    className="mb-2 p-2 border rounded"
                />
                <input type="submit" value="Acessar" className="p-2 bg-blue-500 text-white rounded" />
            </form>
            {authError && <p className="mt-4 text-red-500">{authError}</p>}
        </div>
    );
}

export default Login;
