import React from "react";
import ProductSection from "../sections/Home/ProductSection";
import AppNavbar from "../common/AppNavbar";
import TestimonialSection from "../sections/Home/TestimonialSection";
import AboutUsSection from "../sections/Home/AboutUsSection";
import Footer from "../common/Footer";

const Home = () => {
  return (
    <div className="bg-[#FFF5F7] min-h-screen">
      

      {/* Hero Section */}
      <div className="relative isolate px-3 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#D81B60] sm:text-7xl">
            Radiance Redefined with Aura Lexi
          </h1>
          <p className="mt-8 text-lg text-gray-700 sm:text-xl">
            Discover timeless elegance crafted for every moment. Experience the unparalleled luxury of our exclusive
            jewelry pieces that define sophistication and charm.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-[#B2184E] hover:to-[#FF9CC7]"
            >
              Shop Now
            </a>
            <a href="#" className="text-sm font-semibold text-[#D81B60] hover:text-[#B2184E]">
              View Collection →
            </a>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <ProductSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      
    </div>
  );
};

export default Home;
