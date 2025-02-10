import logo from '../../assets/image.png';

const navigation = {
  products: [
    { name: 'Bracelets', href: '#' },
    { name: 'Earrings', href: '#' },
    { name: 'Necklaces', href: '#' },
    { name: 'Rings', href: '#' },
    { name: 'Custom Jewelry', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Care Guide', href: '#' },
    { name: 'Shipping & Returns', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 2C6.484 2 2 6.484 2 12s4.484 10 10 10 10-4.484 10-10S17.516 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4-8a4 4 0 11-8 0 4 4 0 118 0zm-2-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 2C6.477 2 2 6.484 2 12c0 4.084 2.455 7.602 5.973 9.06-.008-.74-.015-1.885.008-2.703.028-.963.185-2.23.463-3.343.314-1.212.735-2.462 1.221-3.29-.724-1.38-.29-3.18.836-3.76.755-.376 1.593-.012 2.021.503.375.454.636 1.122.57 1.783-.095.893-.378 1.548-.629 2.238-.506 1.392-.136 3.01.843 3.012 1.448.001 2.566-1.818 2.566-3.974 0-2.296-1.753-4.126-4.366-4.126-2.973 0-4.813 2.112-4.813 4.293 0 .823.277 1.732.716 2.312.093.124.105.18.073.315-.081.315-.265 1.008-.303 1.155-.056.221-.18.269-.42.162-1.087-.455-1.761-1.867-1.761-3.396 0-2.565 2.118-5.61 6.302-5.61 3.284 0 5.72 2.338 5.72 5.472 0 3.164-2.014 5.719-4.791 5.719-.923 0-1.785-.398-2.079-.899 0 0-.471 1.778-.59 2.145-.217.658-.648 1.473-.999 2.048.733.227 1.513.352 2.317.352 5.523 0 10-4.484 10-10S17.523 2 12 2z" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#FFF5F7] border-t border-gray-300">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img src={logo} alt="Aura Luxe Collections" className="h-9" />
            <p className="text-sm text-gray-700">
              Discover timeless elegance and unparalleled craftsmanship with Aura Luxe Collections.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-700 hover:text-[#D81B60] transition-all">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {Object.entries(navigation).slice(0, 4).map(([section, links]) => (
              <div key={section} className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-[#D81B60]">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                  <ul className="mt-6 space-y-4">
                    {links.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm text-gray-800 hover:text-[#D81B60] transition-all">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-300 pt-8 sm:mt-20 lg:mt-24 text-center">
          <p className="text-sm text-gray-700">
            &copy; {new Date().getFullYear()} Aura Luxe Collections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
