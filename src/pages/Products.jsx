import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
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
import Checkout from '../Modal/Checkout';

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
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [formData, setFormData] = useState({
    npi: '',
    name: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'email' && !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true); 
      // Optional: clear form or cart here
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = ['All', 'Sample Packs', 'Starter Kit', 'Bottles', 'Capsule'];

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateCartQuantity = (productId, delta) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const CartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4 relative">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 font-montserrat">Shopping Cart</h2>
            <button 
              onClick={() => setShowCartModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-12 font-montserrat">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-6 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800 font-montserrat">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-montserrat">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleUpdateCartQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800 font-montserrat">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateCartQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-gray-800 font-montserrat">Total Items:</span>
                  <span className="text-lg font-semibold text-gray-800 font-montserrat">{totalCartItems}</span>
                </div>
                <button 
                  onClick={() => {
                    setShowCartModal(false);
                    setShowModal(true);
                  }}
                  className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-colors font-montserrat"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-white py-12 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <NavLink to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-all font-montserrat">
            <FaArrowLeft className="mr-2" /> Back
          </NavLink>

          <button 
            onClick={() => setShowCartModal(true)}
            className="relative cursor-pointer"
          >
            <TiShoppingCart className="text-3xl text-gray-800" />
            <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-montserrat">
              {totalCartItems}
            </span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight font-montserrat">Conbenfy Products</h1>
          <p className="mt-3 text-lg text-gray-500 font-montserrat">Welcome to Conbenfy Product Vending Machine</p>
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

          <div className="lg:col-span-4 h-fit lg:sticky top-0 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 order-1 lg:order-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 font-montserrat">Information</h2>
            
            <form onSubmit={handleCheckout} className="space-y-5">
              <div className="w-full">
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.npi} 
                    onChange={(e) => handleInputChange('npi', e.target.value)} 
                    placeholder="NPI Number" 
                    className={`w-full pl-10 pr-3 py-3 rounded-xl border-2 ${
                      errors.npi ? 'border-red-500' : 'border-gray-200'
                    } outline-none focus:border-gray-300 transition-all font-montserrat`} 
                  />
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.npi && <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.npi}</p>}
              </div>

              <div>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  placeholder="Name" 
                  className={`w-full px-3 py-3 rounded-xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } outline-none focus:border-gray-300 transition-all font-montserrat`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.name}</p>}
              </div>

              <div>
                <textarea 
                  value={formData.address} 
                  onChange={(e) => handleInputChange('address', e.target.value)} 
                  placeholder="Address" 
                  className={`w-full px-3 py-3 rounded-xl border-2 ${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  } outline-none focus:border-gray-300 transition-all font-montserrat`} 
                />
                {errors.address && <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.address}</p>}
              </div>

              <div>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  placeholder="Email (Optional)" 
                  className={`w-full px-3 py-3 rounded-xl border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } outline-none focus:border-gray-300 transition-all font-montserrat`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.email}</p>}
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-opacity-80 transition-colors font-montserrat"
              >
                Proceed to Checkout
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl m-10 relative">
            <Checkout formData={formData} cart={cart} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {showCartModal && <CartModal />}
    </section>
  );
}

export default Products;
