const AboutUsSection = () => (
  <div className="bg-[#FFF5F7] py-16">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#D81B60] sm:text-4xl">
          About Aura Luxe Collections
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          At Aura Luxe Collections, we believe in crafting timeless pieces that embody elegance and sophistication.
          Our artisans use the finest materials to create jewelry that celebrates life’s precious moments.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 1.343 3 3m0 0a3 3 0 11-6 0m3 3v5m-4-4h8" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Exceptional Craftsmanship</h3>
          <p className="mt-2 text-gray-600">
            Our skilled artisans dedicate themselves to creating exquisite jewelry, blending traditional techniques with modern designs.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Unmatched Quality</h3>
          <p className="mt-2 text-gray-600">
            We source only the finest materials, ensuring every piece is of the highest quality and built to last.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h3m6 0h3m-9 4h3m6 0h3M4 6h16M4 18h16" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Custom Creations</h3>
          <p className="mt-2 text-gray-600">
            Whether you're celebrating a special occasion or creating a unique design, our custom jewelry service brings your vision to life.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-block rounded-md bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-[#B2184E] hover:to-[#FF9CC7]"
        >
          Learn More About Us
        </a>
      </div>
    </div>
  </div>
);

export default AboutUsSection;
