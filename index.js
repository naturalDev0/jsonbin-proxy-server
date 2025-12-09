const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Configuration
const JSON_BIN_BASE_URL = 'https://api.jsonbin.io/v3';
const JSON_BIN_ID = process.env.JSON_BIN_ID;
const X_MASTER_KEY = process.env.JSON_BIN_X_MASTER_KEY || 'YOUR_MASTER_KEY_HERE';

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// GET /b/:binId/latest - Explicit route for loading books
app.get('/b/:binId/latest', async (req, res) => {
  try {
    const binId = req.params.binId;
    const targetUrl = `${JSON_BIN_BASE_URL}/b/${binId}/latest`;
    
    console.log(`Proxying GET to: ${targetUrl}`);
    
    const response = await axios.get(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': X_MASTER_KEY,
      }
    });
    
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('GET Error:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ 
        error: 'Proxy server error',
        message: error.message 
      });
    }
  }
});

// PUT /b/:binId - Explicit route for saving books
app.put('/b/:binId', async (req, res) => {
  try {
    const binId = req.params.binId;
    const targetUrl = `${JSON_BIN_BASE_URL}/b/${binId}`;
    
    console.log(`Proxying PUT to: ${targetUrl}`);
    console.log('Data:', req.body);
    
    const response = await axios.put(targetUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': X_MASTER_KEY,
      }
    });
    
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('PUT Error:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ 
        error: 'Proxy server error',
        message: error.message 
      });
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'jsonbin-explicit-proxy',
    binId: JSON_BIN_ID
  });
});

// Catch-all for unmatched routes
// app.all('*', (req, res) => {
//   res.status(404).json({
//     error: 'Route not found',
//     message: 'This proxy only handles GET /b/:id/latest and PUT /b/:id'
//   });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Explicit JSON Bin Proxy running on http://localhost:${PORT}`);
  console.log(`Configured routes:`);
  console.log(`  GET  /b/:id/latest → ${JSON_BIN_BASE_URL}/b/:id/latest`);
  console.log(`  PUT  /b/:id        → ${JSON_BIN_BASE_URL}/b/:id`);
  console.log(`\nFor your frontend:`);
  console.log(`  Load: GET  http://localhost:${PORT}/b/${JSON_BIN_ID}/latest`);
  console.log(`  Save: PUT  http://localhost:${PORT}/b/${JSON_BIN_ID}`);
});