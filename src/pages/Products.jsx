import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaTimes } from 'react-icons/fa';

import Bottles1 from '../image/Bottles-1.png';
import Bottles2 from '../image/Bottles-2.png';  
import Capsule1 from '../image/Capsule-1.png';
import Capsule2 from '../image/Capsule-2.png';
import Capsule3 from '../image/Capsule-3.png';
import Capsule4 from '../image/Capsule-4.png';
import Capsule5 from '../image/Capsule-5.png';  
import Capsule6 from '../image/Capsule-6.png';
import SamplePacks1 from '../image/Sample-Packs-1.png';
import SamplePacks2 from '../image/Sample-Packs-2.png';
import SamplePacks3 from '../image/Sample-Packs-3.png';
import SamplePacks4 from '../image/Sample-Packs-4.png';
import SamplePacks5 from '../image/Sample-Packs-5.png';
import StarterKit1 from '../image/Starter-kit-1.png';
import StarterKit2 from '../image/Starter-kit-2.png';   
import StarterKit3 from '../image/Starter-kit-3.png';


const sampleProducts = [
  { id: 1, name: 'COBENFY', image: SamplePacks1, category: 'Sample Packs' },
  { id: 2, name: 'COBENFY', image: SamplePacks2, category: 'Sample Packs' },
  { id: 3, name: 'COBENFY', image: SamplePacks3, category: 'Sample Packs' },
  { id: 4, name: 'COBENFY', image: SamplePacks4, category: 'Sample Packs' },
  { id: 5, name: 'COBENFY', image: SamplePacks5, category: 'Sample Packs' },
  { id: 6, name: 'COBENFY', image: StarterKit1, category: 'Starter Kit' },
  { id: 7, name: 'COBENFY', image: StarterKit2, category: 'Starter Kit' },
  { id: 8, name: 'COBENFY', image: StarterKit3, category: 'Starter Kit' },
  { id: 9, name: 'COBENFY', image: Bottles1, category: 'Bottles' },
  { id: 10, name: 'COBENFY', image: Bottles2, category: 'Bottles' },
  { id: 11, name: 'COBENFY', image: Capsule1, category: 'Capsule' },
  { id: 12, name: 'COBENFY', image: Capsule2, category: 'Capsule' },
  { id: 13, name: 'COBENFY', image: Capsule3, category: 'Capsule' },
  { id: 14, name: 'COBENFY', image: Capsule4, category: 'Capsule' },
  { id: 15, name: 'COBENFY', image: Capsule5, category: 'Capsule' },
  { id: 16, name: 'COBENFY', image: Capsule6, category: 'Capsule' },
];

function Products() {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Sample Packs', 'Starter Kit', 'Bottles', 'Capsule'];

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const newQuantity = Math.max(current + delta, 1);
      return { ...prev, [id]: newQuantity };
    });
  };

  return (
    <section className="min-h-screen bg-white py-12 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <NavLink to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-all font-montserrat">
            <FaArrowLeft className="mr-2" /> Back
          </NavLink>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight font-montserrat">Cobenfy Products</h1>
          <p className="mt-3 text-lg text-gray-500 font-montserrat">Welcome to Cobenfy Product Vending Machine</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="relative mb-6">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />
              <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search products..." 
                className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-300 shadow-sm text-gray-800 placeholder-primary focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all font-montserrat"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-montserrat ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-00 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-white border rounded-2xl p-6 transition-all">
                    <div className="rounded-xl overflow-hidden mb-4">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300" />
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mb-2 font-montserrat">{product.name}</h3>

                    <div className="flex items-center justify-between mt-4">
                      <label className="text-sm font-medium text-gray-600 font-montserrat">Quantity</label>

                      <div className="flex items-center space-x-1 bg-gray-50 rounded-lg">
                        <button  type="button"  onClick={() => handleQuantityChange(product.id, -1)}  className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 transition-all">
                          −
                        </button>

                        <span className="text-sm font-medium text-gray-800 w-6 text-center font-montserrat">{quantities[product.id] || 1}</span>
                        
                        <button  type="button"  onClick={() => handleQuantityChange(product.id, 1)}  className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 transition-all" >
                          +
                        </button>
                      </div>
                    </div>

                    <button  onClick={() => handleAddToCart(product)}  className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-80 transition-colors font-montserrat">
                      Add to cart
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 text-lg font-medium font-montserrat">No products found.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 h-fit lg:sticky top-5 bg-white rounded-2xl shadow-sm border border-gray-100 order-1 lg:order-2">
              <NavLink to={"/information"}>
                <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-opacity-80 transition-colors font-montserrat">
                  Proceed to Checkout
                </button>
              </NavLink>
      
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
