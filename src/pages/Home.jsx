import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "../components/Header";
import Product from "../image/Sample-no-bg.png"
import StarterKit from "../image/Starter-kit-2-no-bg.png";
import Bottles from "../image/Bottles-1-no-bg.png"

function Home() {
  return (
    <section className="h-screen w-full font-Montserrat lg:overflow-hidden overflow-y-auto bg-primary text-white relative">

      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-white/15 to-blue-300/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-white/8 to-transparent rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-white/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-[calc(100vh-80px)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Hero Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
            
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-10 text-center lg:text-left">

              {/* Enhanced hero title */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-black leading-[0.85] tracking-tight">
                  <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">COBENFY</span>
                </h1>
                <div className="w-20 h-1 bg-Pink mx-auto lg:mx-0 rounded-full"></div>
              </div>

              {/* Enhanced description */}
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl font-light leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0">
                  Experience the breakthrough in pharmaceutical excellence with our advanced formulations engineered for superior therapeutic outcomes.
                </p>
              </div>

              {/* Enhanced action section */}
              <div className="flex flex-col md:items-left  gap-6 pt-4">
                <NavLink to={'/products'}>
                  <button className="group inline-flex items-center gap-4 font-semibold text-lg px-8 py-4 bg-white text-primary rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300">
                    <span>See Products</span>
                    <FaArrowRightLong className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Right Product Section - 5 columns */}
            <div className="lg:col-span-5 relative h-full flex items-center justify-center">
              
              {/* Enhanced floating product container */}
              <div className="relative group">
                
                {/* Enhanced glassmorphism container */}
                <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/30 transform group-hover:scale-[1.03] transition-all duration-700 hover:shadow-3xl">
                  
                  {/* Enhanced premium badge */}
                  <div className="absolute -top-4 left-8 bg-gradient-to-r from-primary via-blue-600 to-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20">
                    <span className="relative z-10">PREMIUM COLLECTION</span>
                  </div>
                  
                  {/* Enhanced product showcase */}
                  <div className="relative space-y-2">
                    <img 
                      src={Product} 
                      alt="COBENFY Product" 
                      className="w-full max-w-sm mx-auto drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-700 transform group-hover:-translate-y-2 group-hover:scale-105" 
                    />
                    
                    {/* Enhanced dual product layout */}
                    <div className="flex items-end justify-center gap-4 -mt-4">
                      <img 
                        src={StarterKit} 
                        alt="Starter Kit" 
                        className="w-2/5 max-w-xs drop-shadow-xl transition-all duration-700 transform group-hover:-translate-y-2 group-hover:scale-110 hover:z-10" 
                      />
                      <img 
                        src={Bottles} 
                        alt="Bottles" 
                        className="w-2/5 max-w-xs drop-shadow-xl transition-all duration-700 transform group-hover:-translate-y-2 group-hover:scale-110 hover:z-10" 
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced product info */}
                  <div className="text-center mt-6 text-primary space-y-2">
                    <h3 className="font-bold text-base tracking-wide">COMPLETE THERAPEUTIC KIT</h3>
                    <p className="text-sm text-primary/70 font-medium">Professional Grade • FDA Approved</p>
                  </div>
                </div>

                {/* Enhanced floating decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full shadow-xl animate-bounce delay-300"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm animate-pulse delay-700"></div>
                <div className="absolute top-1/3 -right-8 w-4 h-4 bg-white/60 rounded-full animate-ping delay-1000"></div>
                <div className="absolute bottom-1/3 -left-8 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  );
}

export default Home;