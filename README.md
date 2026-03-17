# Brewers Bay Cafe Website

A full-stack web application for Brewers Bay Cafe with menu, cart, and Razorpay payment integration.

## Project Structure

```
brewers-bay-website/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

## Configuration

Before running, update the following in `backend/server.js`:
- Replace `YOUR_MONGO_URI` with your MongoDB connection string
- Replace `YOUR_RAZORPAY_KEY` with your Razorpay API Key
- Replace `YOUR_RAZORPAY_SECRET` with your Razorpay API Secret

Also update `YOUR_RAZORPAY_KEY` in `frontend/src/App.jsx`

## Features

- Browse cafe menu
- Add items to cart
- Razorpay payment integration
- Order management
- Admin panel to view all orders

## Technologies Used

**Frontend:**
- React 18.2.0
- Vite
- Axios
- Razorpay Checkout

**Backend:**
- Express.js
- MongoDB with Mongoose
- Razorpay Node SDK
- CORS

## Next Steps

1. Configure MongoDB URI
2. Set up Razorpay credentials
3. Deploy frontend and backend
4. Test payment flow
