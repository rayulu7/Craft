import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css'
import { StrictMode } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <App />
    </ClerkProvider>
  </StrictMode>
);