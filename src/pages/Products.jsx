import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaTrash } from 'react-icons/fa';

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Sample Packs', 'Starter Kit', 'Bottles', 'Capsule'];
  const [tempQuantities, setTempQuantities] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (id, delta) => {
    setTempQuantities(prev => {
      const current = prev[id] || 1;
      const newQuantity = Math.max(current + delta, 1);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    const tempQty = tempQuantities[product.id] || 1;
    setCartQuantities(prev => {
      const existingQty = prev[product.id] || 0;
      return {
        ...prev,
        [product.id]: existingQty + tempQty,
      };
    });
    setTempQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCartQuantities(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
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
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-100'
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
                        <button type="button" onClick={() => handleQuantityChange(product.id, -1)} className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 transition-all">−</button>
                        <span className="text-sm font-medium text-gray-800 w-6 text-center font-montserrat">{tempQuantities[product.id] || 1}</span>
                        <button type="button" onClick={() => handleQuantityChange(product.id, 1)} className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 transition-all">+</button>
                      </div>
                    </div>

                    <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-80 transition-colors font-montserrat">
                      Add to cart
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 text-lg font-medium font-montserrat">No products found.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 h-fit border lg:sticky top-5 bg-white rounded-3xl shadow-lg order-1 lg:order-2 backdrop-blur-sm">
            <div className="md:p-8 p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                <h2 className="text-lg font-semibold text-black font-montserrat">DTP Request Summary</h2>
              </div>

              {Object.entries(cartQuantities).length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium font-montserrat">No products selected</p>
                  <p className="text-gray-400 text-sm mt-1 font-montserrat">Add items to see your summary</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 font-montserrat border-b border-gray-100 pb-2">
                    <span>Product</span>
                    <span>Quantity</span>
                  </div>

                  <ul className="space-y-4 font-montserrat max-h-72 overflow-y-auto pr-2">
                    {Object.entries(cartQuantities).map(([id, quantity]) => {
                      const product = sampleProducts.find(p => p.id === parseInt(id));
                      return (
                        <li key={id} className="group">
                          <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200">
                            <img src={product?.image} alt={product?.name} className="w-12 h-12 object-contain rounded-lg border" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{product?.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                  {product?.category}
                                </span>
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex flex-col items-center gap-2">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-bold rounded-full text-sm">
                                {quantity}
                              </span>
                              <button
                                onClick={() => handleRemoveFromCart(product.id)}
                                className="text-red-500 text-sm hover:text-red-700 transition"
                                title="Remove"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm font-montserrat">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-bold text-lg text-primary">
                        {Object.values(cartQuantities).reduce((sum, qty) => sum + qty, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0">
              <NavLink to="/information">
                <button 
                  type="submit" 
                  disabled={Object.entries(cartQuantities).length === 0}
                  className="group w-full bg-gradient-to-r from-primary to-primary/90 text-white md:py-4 md:px-6 py-3 px-1 rounded-2xl font-bold md:text-lg text-sm
                             hover:from-primary/90 hover:to-primary hover:shadow-lg 
                             disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed  disabled:hover:shadow-none
                             transition-all duration-200 font-montserrat relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
