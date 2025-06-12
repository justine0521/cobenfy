import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaSearch, FaArrowLeft, FaTimes } from 'react-icons/fa';

// import Bottles1 from '../image/Bottles-1.png';
// import Bottles2 from '../image/Bottles-2.png';  
// import Capsule1 from '../image/Capsule-1.png';
// import Capsule2 from '../image/Capsule-2.png';
// import Capsule3 from '../image/Capsule-3.png';
// import Capsule4 from '../image/Capsule-4.png';
// import Capsule5 from '../image/Capsule-5.png';  
// import Capsule6 from '../image/Capsule-6.png';
// import SamplePacks1 from '../image/Sample-Packs-1.png';
// import SamplePacks2 from '../image/Sample-Packs-2.png';
// import SamplePacks3 from '../image/Sample-Packs-3.png';
// import SamplePacks4 from '../image/Sample-Packs-4.png';
// import SamplePacks5 from '../image/Sample-Packs-5.png';
// import StarterKit1 from '../image/Starter-Kit-1.png';
// import StarterKit2 from '../image/Starter-Kit-2.png';   
// import StarterKit3 from '../image/Starter-Kit-3.png';
import Checkout from '../Modal/Checkout';

const sampleProducts = [
  // { id: 1, name: 'COBENFY', image: SamplePacks1, category: 'Sample Packs' },
  // { id: 2, name: 'COBENFY', image: SamplePacks2, category: 'Sample Packs' },
  // { id: 3, name: 'COBENFY', image: SamplePacks3, category: 'Sample Packs' },
  // { id: 4, name: 'COBENFY', image: SamplePacks4, category: 'Sample Packs' },
  // { id: 5, name: 'COBENFY', image: SamplePacks5, category: 'Sample Packs' },
  // { id: 6, name: 'COBENFY', image: StarterKit1, category: 'Starter Kit' },
  // { id: 7, name: 'COBENFY', image: StarterKit2, category: 'Starter Kit' },
  // { id: 8, name: 'COBENFY', image: StarterKit3, category: 'Starter Kit' },
  // { id: 9, name: 'COBENFY', image: Bottles1, category: 'Bottles' },
  // { id: 10, name: 'COBENFY', image: Bottles2, category: 'Bottles' },
  // { id: 11, name: 'COBENFY', image: Capsule1, category: 'Capsule' },
  // { id: 12, name: 'COBENFY', image: Capsule2, category: 'Capsule' },
  // { id: 13, name: 'COBENFY', image: Capsule3, category: 'Capsule' },
  // { id: 14, name: 'COBENFY', image: Capsule4, category: 'Capsule' },
  // { id: 15, name: 'COBENFY', image: Capsule5, category: 'Capsule' },
  // { id: 16, name: 'COBENFY', image: Capsule6, category: 'Capsule' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl m-4 relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1F22A2]">Shopping Cart</h2>
            <button 
              onClick={() => setShowCartModal(false)}
              className="text-gray-500 hover:text-[#BE0075] transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#1F22A2]">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleUpdateCartQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-[#BE0075] hover:bg-[#BE0075]/10 rounded-full transition-all"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateCartQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-[#BE0075] hover:bg-[#BE0075]/10 rounded-full transition-all"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Items:</span>
                  <span className="text-lg font-bold text-[#1F22A2]">{totalCartItems}</span>
                </div>
                <button 
                  onClick={() => {
                    setShowCartModal(false);
                    setShowModal(true);
                  }}
                  className="w-full bg-[#BE0075] text-white py-3 rounded-xl font-semibold hover:bg-[#BE0075]/90 transition-colors"
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
    <section className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFE3F2] py-12 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <NavLink to="/" className="inline-flex items-center text-[#1F22A2] hover:text-[#BE0075] font-medium text-base transition-all">
            <FaArrowLeft className="mr-2" /> Back
          </NavLink>

          <button 
            onClick={() => setShowCartModal(true)}
            className="relative cursor-pointer"
          >
            <TiShoppingCart className="text-3xl text-[#BE0075]" />
            <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {totalCartItems}
            </span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1F22A2] tracking-tight">Conbenfy Products</h1>
          <p className="mt-2 text-lg text-neutral-600">Welcome to Conbenfy Product Vending Machine</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
          <div className="lg:col-span-3">
            <div className="relative mb-4">
              <FaSearch className="absolute top-3.5 left-4 text-[#BE0075]" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-12 pr-5 py-3 rounded-xl border border-[#D1D5DB] shadow-md text-[#1F22A2] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BE0075]/50 transition-all"/>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-[#BE0075] text-white' : 'border-[#BE0075] text-[#BE0075] hover:bg-[#BE0075]/10'}`} >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-white/70 backdrop-blur-lg border border-[#E0E0E0] rounded-3xl p-5">
                    <div className="rounded-xl overflow-hidden mb-4">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>

                    <div className="flex items-center justify-between mt-4">
                      <label className="text-sm font-medium text-[#BE0075]">Quantity</label>

                      <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg">
                        <button type="button" onClick={() => handleQuantityChange(product.id, -1)} className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-[#BE0075] hover:bg-[#BE0075]/10 transition-all">−</button>
                        <span className="text-sm font-semibold text-gray-800 w-6 text-center">{quantities[product.id] || 1}</span>
                        <button type="button" onClick={() => handleQuantityChange(product.id, 1)} className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-[#BE0075] hover:bg-[#BE0075]/10 transition-all">+</button>
                      </div>
                    </div>

                    <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-primary text-white py-2 rounded-full font-semibold transition-all hover:bg-primary/90">
                      Add to cart
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-[#BE0075] text-lg font-medium">No products found.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 h-fit bg-white/70 p-6 rounded-3xl shadow-md border-2 border-[#E0E0E0]">
            <h2 className="text-xl font-bold text-[#1F22A2] mb-4">Information</h2>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="w-full">
                <div className="relative">
                  <input type="text" value={formData.npi} onChange={(e) => handleInputChange('npi', e.target.value)} placeholder="NPI Number" className={`w-full pl-10 pr-3 py-2 rounded-xl border-2 ${errors.npi ? 'border-red-500' : 'border-[#E0E0E0]' } outline-none focus:border-primary`} />
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {errors.npi && <p className="text-red-500 text-sm mt-1">{errors.npi}</p>}
              </div>

              <div>
                <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Name" className={`w-full px-3 py-2 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-[#E0E0E0]'} outline-none focus:border-primary`}/>
                
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Address" className={`w-full px-3 py-2 rounded-xl border-2 ${errors.address ? 'border-red-500' : 'border-[#E0E0E0]'} outline-none focus:border-primary`} />
                
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Email (Optional)" className={`w-full px-3 py-2 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'} outline-none focus:border-primary`}/>
                
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button type="submit" className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90">
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl m-10 relative">
            <Checkout formData={formData} cart={cart} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {showCartModal && <CartModal />}
    </section>
  );
}

export default Products;
