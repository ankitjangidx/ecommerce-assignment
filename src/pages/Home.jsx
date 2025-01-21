import React from "react";
import { dummyProducts } from "../constants/dummyProducts";
import ProductCard from "../components/core/Home/ProductCard";



export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-600">
            Check out our latest collection of premium products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};