import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './context/CartContext';
import SearchProvider from './context/SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    // <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX}}>

        <SearchProvider>        
            <CartProvider>
                <App />
            </CartProvider>
        </SearchProvider>

);

