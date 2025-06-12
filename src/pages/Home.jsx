import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "../components/Header";
import Product from "../image/Sample.png"
import StarterKit from "../image/Starter-kit-2.png";

function Home() {
  return (
    <section className="relative min-h-screen w-full font-sans overflow-hidden bg-primary text-white flex flex-col lg:flex-row">
      {/* Left blue panel */}
      <div className="relative w-full lg:w-[55%] h-auto lg:h-screen bg-primary z-10 flex flex-col curved-left">
        {/* Navigation */}
        <Header />
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start px-5 sm:px-10 md:px-16 lg:px-20 gap-6 py-8 lg:py-0">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-Montserrat font-bold mb-3 text-center lg:text-left">COBENFY</h2>
          <p className="max-w-md mb-4 text-base sm:text-lg md:text-xl font-Montserrat text-center lg:text-left">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected.
          </p>
          <NavLink to={'/products'}>
            <button className="flex items-center gap-2 font-semibold font-Montserrat w-fit text-base transition-all duration-300 hover:gap-3 border p-2 px-4 rounded-full shadow-lg text-white mx-auto lg:mx-0">
              See Products <FaArrowRightLong className="text-lg" />
            </button>
          </NavLink>
        </div>
      </div>
      {/* Right white panel */}
      <div className="relative w-full lg:w-[45%] h-auto lg:h-screen flex flex-col items-center justify-center bg-white z-0 curved-right py-8 lg:py-0">
        <img src={Product} alt="" className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" />
        <img src={StarterKit} alt="" className="-m-6 sm:-m-10 w-2/3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" />
      </div>
    </section>
  );
}

export default Home;