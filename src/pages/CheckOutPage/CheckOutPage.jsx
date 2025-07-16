import { useState } from 'react';
import { useCart } from '../../components/CartContext/CartContext';
import { UserButton, useUser } from '@clerk/clerk-react';

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    // For demo purposes, we'll just show the success message
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 text-center">
        <div className="bg-white shadow-sm rounded-lg p-8 max-w-2xl mx-auto">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-2xl font-bold mt-4 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium mb-2">Order Summary</h2>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
              <div className="mt-4 flex items-center">
                <UserButton />
                <div className="ml-4">
                  <p className="font-medium">{user?.fullName || 'Guest'}</p>
                  <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress || 'guest@example.com'}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
              <form className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Japan</option>
                      <option>South Korea</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="save-address"
                    name="save-address"
                    type="checkbox"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                  />
                  <label htmlFor="save-address" className="ml-2 block text-sm text-gray-900">
                    Save this information for next time
                  </label>
                </div>
              </form>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                  />
                  <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit card
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="apple-pay"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                    checked={paymentMethod === 'apple-pay'}
                    onChange={() => setPaymentMethod('apple-pay')}
                  />
                  <label htmlFor="apple-pay" className="ml-3 block text-sm font-medium text-gray-700">
                    Apple Pay
                  </label>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                          Expiration date
                        </label>
                        <input
                          type="text"
                          id="expiration-date"
                          name="expiration-date"
                          placeholder="MM/YY"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Billing Information</h2>
              <div className="mt-4 flex items-center">
                <input
                  id="same-as-shipping"
                  name="same-as-shipping"
                  type="checkbox"
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="same-as-shipping" className="ml-2 block text-sm text-gray-900">
                  Same as shipping information
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;