import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../components/CartContext/CartContext';
import {products} from '../../data/Products'

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4 h-96">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-violet-500' : 'border-transparent'}`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-violet-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-lg line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 text-sm font-medium ml-2 px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            {product.inStock ? (
              <div className="text-green-600 text-sm mt-1">In Stock</div>
            ) : (
              <div className="text-red-600 text-sm mt-1">Out of Stock</div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-2 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${product.inStock ? 'bg-violet-600 hover:bg-violet-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Add to Cart
            </button>
            <button
              disabled={!product.inStock}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${product.inStock ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <div className="text-4xl font-bold">{product.rating}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-full">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mb-1">
                  <span className="text-sm font-medium w-8">{star} star</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{
                        width: `${(product.reviewsDistribution[star] / product.reviews) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {product.reviewsDistribution[star] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {product.reviewsList.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="font-medium">{review.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  By {review.author} on {review.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;