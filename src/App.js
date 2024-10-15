import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => setProducts(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product.id}>
                    <span>{product.name} - ${product.price}</span>
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

const Cart = () => {
    const [cart, setCart] = useState([]);

    // Fetch cart data from the backend
    useEffect(() => {
        axios.get('http://localhost:3000/cart')
            .then(response => setCart(response.data))
            .catch(err => console.error(err));
    }, []);

    const updateQuantity = (productId, quantity) => {
        axios.put('http://localhost:3000/cart/update', { productId, quantity })
            .then(response => setCart(response.data))
            .catch(err => console.error(err));
    };

    const removeItem = (productId) => {
        axios.delete(`http://localhost:3000/cart/remove/${productId}`)
            .then(response => setCart(response.data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map(item => (
                    <div key={item.productId}>
                        <span>Product ID: {item.productId}</span>
                        <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))} 
                        />
                        <button onClick={() => removeItem(item.productId)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

const ShoppingCartApp = () => {
    const addToCart = (productId) => {
        axios.post('http://localhost:3000/cart/add', { productId, quantity: 1 })
            .then(response => console.log(response.data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <ProductList addToCart={addToCart} />
            <Cart />
        </div>
    );
};

export default ShoppingCartApp;
