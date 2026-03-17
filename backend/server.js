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

app.listen(5000, () => console.log("Server running on port 5000"));