const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests from React

let cart = [];

// Dummy product data
const products = [
    { id: '1', name: 'Product 1', price: 10.99 },
    { id: '2', name: 'Product 2', price: 15.99 }
];

// Get all products (to display in frontend)
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Add item to the cart
app.post('/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    res.status(200).json(cart);
});

// Update item quantity in the cart
app.put('/cart/update', (req, res) => {
    const { productId, quantity } = req.body;
    const item = cart.find(item => item.productId === productId);

    if (item) {
        item.quantity = quantity;
        res.status(200).json(cart);
    } else {
        res.status(404).send('Item not found');
    }
});

// Remove item from the cart
app.delete('/cart/remove/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.status(200).json(cart);
});

// View cart details
app.get('/cart', (req, res) => {
    res.status(200).json(cart);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
