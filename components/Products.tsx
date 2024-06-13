"use client";

import React, { useEffect, useState, useContext } from 'react';
import { request } from '@/services/request';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
};

const ProductsPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            const fetchProducts = async () => {
                try {
                    const data = await request<Product[]>('http://localhost:3000/products', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        referrerPolicy: 'no-referrer',
                        cache: 'no-store',
                    });
                    setProducts(data);
                    const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
                    setCategories(uniqueCategories);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };

            fetchProducts();
        }
    }, [isAuthenticated, router]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Produtos</h2>
            <div className="mb-4">
                <label htmlFor="category" className="mr-2">Filtrar por Categoria:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Todas</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <ul className="space-y-4">
                {products.filter(product => !selectedCategory || product.category === selectedCategory).map((product, index) => (
                    <li key={index} className="border p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="text-green-600 font-bold">R${product.price.toFixed(2)}</p>
                        <p className="text-gray-500">Categoria: {product.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
