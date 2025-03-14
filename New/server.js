const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user database
const users = [
  {
    id: 1,
    username: 'user1',
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // Hashed 'password'
    apiKey: 'YOUR_BINANCE_API_KEY',
    secretKey: 'YOUR_BINANCE_SECRET_KEY',
  },
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedPassword !== user.password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.json({ userId: user.id, username: user.username });
});

// Place order endpoint
app.post('/place-order', async (req, res) => {
  const { userId, symbol, side, quantity, price } = req.body;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const timestamp = Date.now();
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&quantity=${quantity}&price=${price}&timeInForce=GTC&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', user.secretKey).update(params).digest('hex');

  try {
    const response = await axios.post(`https://fapi.binance.com/fapi/v1/order?${params}&signature=${signature}`, null, {
      headers: {
        'X-MBX-APIKEY': user.apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.response ? error.response.data : error.message });
  }
});

// Fetch open orders endpoint
app.get('/open-orders', async (req, res) => {
  const { userId, symbol } = req.query;
  const user = users.find(u => u.id === parseInt(userId));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const timestamp = Date.now();
  const params = `symbol=${symbol}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', user.secretKey).update(params).digest('hex');

  try {
    const response = await axios.get(`https://fapi.binance.com/fapi/v1/openOrders?${params}&signature=${signature}`, {
      headers: {
        'X-MBX-APIKEY': user.apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch open orders', error: error.response ? error.response.data : error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});