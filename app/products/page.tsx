import Produtos from "@/components/Products";
import React from 'react';

const Product = async ({}) => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Seus Produtos
      </h1>

      <div className="grid place-items-center">
        
          <Produtos />
       
        
      </div>
    </main>
  );
};

export default Product;