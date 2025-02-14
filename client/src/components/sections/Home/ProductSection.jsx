const products = [
  {
    id: 1,
    title: "Handmade cats eye stone bracelet fashion",
    href: "#",
    description: "Crafted with precision, this bracelet sparkles with radiant diamonds, perfect for every occasion.",
    imageUrl: "https://madeheart.com/media/productphoto/462/36651932/028_IMG_4765.jpg",
    price: "$499",
  },
  {
    id: 2,
    title: "Fashion Flower Silver Filled Drop Earring",
    href: "#",
    description: "Timeless and elegant, these pearl earrings add a touch of sophistication to any outfit.",
    imageUrl: "https://d2ma7w4w9grdob.cloudfront.net/media/45150IND_1959.JPG",
    price: "$199",
  },
  {
    id: 3,
    title: "Handmade Silver Chain for Men & Women",
    href: "#",
    description: "A statement piece, this silver chain exudes luxury and class, designed to turn heads.",
    imageUrl: "https://aadyaa.com/cdn/shop/files/RGL4577.jpg?v=1736838374&width=1200",
    price: "$899",
  },
];

export default function ProductSection() {
  return (
    <div className="bg-[#FFF5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#D81B60] sm:text-5xl">
            Explore Our Collection
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Discover timeless elegance with our exclusive jewelry pieces, crafted for every moment.
          </p>
        </div>

        {/* Product Cards */}
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="relative isolate flex flex-col overflow-hidden rounded-2xl shadow-lg bg-white border border-pink-200"
            >
              <img
                alt={product.title}
                src={product.imageUrl}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm text-gray-600">{product.description}</p>
                <p className="mt-4 text-lg font-semibold text-[#D81B60]">{product.price}</p>
                <a
                  href={product.href}
                  className="mt-6 inline-block rounded-md bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] px-4 py-2 text-center text-sm font-medium text-white shadow-md hover:from-[#B2184E] hover:to-[#FF9CC7]"
                >
                  View Details
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
