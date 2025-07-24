import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Tailwind CSS
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
        {/* <CartProvider> */}
          <App />
        {/* </CartProvider>
      </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
