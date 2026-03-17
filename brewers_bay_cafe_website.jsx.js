// ========================= PROJECT STRUCTURE =========================

/*
brewers-bay-website/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│
├── backend/
│   ├── server.js
│   ├── package.json
*/

// ========================= FRONTEND =========================

// frontend/package.json
{
  "name": "brewers-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}

// frontend/index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Brewers Bay</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </body>
</html>

// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// frontend/src/App.jsx
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [cart, setCart] = useState([]);

  const menu = [
    { id: 1, name: "Cappuccino", price: 120 },
    { id: 2, name: "Pizza", price: 250 },
    { id: 3, name: "Pasta", price: 220 }
  ];

  const addToCart = (item) => setCart([...cart, item]);
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/create-order", { amount: total });

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: data.amount,
      currency: "INR",
      name: "Brewers Bay",
      order_id: data.id,
      handler: async function () {
        await axios.post("http://localhost:5000/order", { items: cart, total });
        alert("Order Placed!");
        setCart([]);
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Brewers Bay</h1>

      <h2>Menu</h2>
      {menu.map((item) => (
        <div key={item.id}>
          {item.name} - ₹{item.price}
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>{item.name} - ₹{item.price}</div>
      ))}

      <h3>Total: ₹{total}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

// ========================= BACKEND =========================

// backend/package.json
{
  "name": "brewers-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "razorpay": "^2.9.1"
  }
}

// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB
mongoose.connect("YOUR_MONGO_URI");

const Order = mongoose.model("Order", {
  items: Array,
  total: Number,
  status: { type: String, default: "Pending" }
});

// Razorpay
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY",
  key_secret: "YOUR_RAZORPAY_SECRET"
});

// Create payment order
app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR"
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

// Save order
app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// Get all orders (Admin)
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(5000, () => console.log("Server running"));

// ========================= DONE =========================

/*
NEXT STEP:
1. Replace:
   - YOUR_MONGO_URI
   - YOUR_RAZORPAY_KEY
   - YOUR_RAZORPAY_SECRET

2. Upload to GitHub
3. Tell me → I’ll deploy it LIVE for you
*/