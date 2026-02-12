
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;  

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Canteen Backend Running');
});

// Order route
app.post('/order', (req, res) => {
    const orderData = req.body;

    let orders = [];
    if (fs.existsSync('orders.json')) {
        const data = fs.readFileSync('orders.json');
        orders = JSON.parse(data);
    }

    orders.push({
        ...orderData,
        time: new Date().toLocaleString()
    });

    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

    res.json({
        message: 'Order placed successfully!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}'); 
});