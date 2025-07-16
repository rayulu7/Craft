import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className = "sticky top-0 z-50">
      <div className="text-sm text-white w-full">
        <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p>Exclusive Price Drop! Hurry, <span className="underline underline-offset-2">Offer Ends Soon!</span></p>
        </div>
        <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow-sm">
          <Link to="/">
            <img width="70" height="30" viewBox="0 0 157 40" fill="none" src = "/logo2.png"
              
            />
          </Link>
          <ul className="hidden md:flex items-center space-x-8 md:pl-28">
            <li><Link to="/" className="hover:text-violet-500 text-xl transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-violet-500 text-xl transition-colors">Products</Link></li>
            <li><Link to="/cart" className="hover:text-violet-500 text-xl transition-colors">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-violet-500 text-xl transition-colors">Contact</Link></li>
          </ul>
          
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <div className="flex items-center gap-2">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-9 h-9",
                      userButtonPopoverCard: "shadow-lg rounded-lg",
                    }
                  }}
                />
                {user && (
                  <span className="text-sm font-medium text-gray-700">
                    {user.firstName || user.username}
                  </span>
                )}
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white hover:bg-gray-50 border border-gray-300 px-6 py-2 rounded-full active:scale-95 transition-all hover:text-violet-500 text-sm">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          <button 
            aria-label="menu-btn" 
            type="button" 
            className="menu-btn inline-block md:hidden active:scale-90 transition"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
              <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
            </svg>
          </button>

          <div className={`mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <ul className="flex flex-col space-y-4 text-lg">
              <li><Link to="/" className="text-sm hover:text-violet-500">Home</Link></li>
              <li><Link to="/services" className="text-sm hover:text-violet-500">Services</Link></li>
              <li><Link to="/portfolio" className="text-sm hover:text-violet-500">Portfolio</Link></li>
              <li><Link to="/pricing" className="text-sm hover:text-violet-500">Pricing</Link></li>
            </ul>

            <div className="mt-6 flex flex-col gap-4">
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                      }
                    }}
                  />
                  {user && (
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName || user.username}
                    </span>
                  )}
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-white text-gray-600 border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition-all w-full h-11 rounded-full hover:text-violet-500">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;