import React from 'react';
import ProductSection from '../sections/Home/ProductSection';
import AppNavbar from '../common/AppNavbar';
import TestimonialSection from '../sections/Home/TestimonialSection';
import AboutUsSection from '../sections/Home/AboutusSection';
import Footer from '../common/Footer';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <AppNavbar />

      {/* Hero Section */}
      <div className="relative isolate px-3  lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d4af37] to-[#f4e2d8] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-800 bg-gradient-to-r from-[#d4af37] to-[#f4e2d8] ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Exclusive Launch of the Aura Lexi Collection{' '}
              <a href="#" className="font-semibold text-gray-900">
                <span aria-hidden="true" className="absolute inset-0" />
                Explore Now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Radiance Redefined with Aura Lexi
            </h1>
            <p className="mt-8 text-lg text-gray-600 sm:text-xl">
              Discover timeless elegance crafted for every moment. Experience the unparalleled luxury of our exclusive
              jewelry pieces that define sophistication and charm.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-gradient-to-r from-[#d4af37] to-[#f4e2d8] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-[#c29d2e] hover:to-[#e2c4a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              >
                Shop Now
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                View Collection <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d4af37] to-[#f4e2d8] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* product sections  */}
      <ProductSection/>


      {/* AboutUsSection */}

      <AboutUsSection/>



      {/* testimonial section */}

      <TestimonialSection/>







      {/* footer */}

<Footer/>

    </div>
  );
};

export default Home;
