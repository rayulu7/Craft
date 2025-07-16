import { Link } from 'react-router-dom';

import {products} from '../../data/Products'
import ProductCard from '../../components/ProductCard/ProductCard';
import Contact from '../Contact/Contact';
import Clients from '../../components/Footer/Clients';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);

  return (
    <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-500 to-[#9938CA] rounded-3xl p-8 md:p-12 text-white mb-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Collection 2025</h1>
          <p className="text-lg mb-6">Discover our new arrivals with exclusive discounts up to 50% off</p>
          <Link
            to="/products"
            className="inline-block bg-white text-violet-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-violet-600 hover:text-violet-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gray-100 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-gray-600 mb-4">Get 30% off on all accessories this week only. Use code: ACCESSORY30</p>
          <Link
            to="/products"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Shop Accessories
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="/glasstoy1.jpg"
            alt="Accessories"
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Trending Products */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link to="/products" className="text-violet-600 hover:text-violet-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Contact />
      <Clients />
      {/* Testimonials */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The quality of products is amazing! Fast shipping too.",
              author: "Sarah Johnson",
              rating: 5,
            },
            {
              quote: "Great customer service and easy returns process.",
              author: "Michael Chen",
              rating: 4,
            },
            {
              quote: "Love the variety of products available. Will shop again!",
              author: "Emily Rodriguez",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <p className="font-medium">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;