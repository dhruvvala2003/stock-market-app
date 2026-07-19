const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';
const GDELT_BASE = 'https://api.gdeltproject.org/api/v2';

router.get('/headlines', async (req, res) => {
  try {
    const { query = 'Indian stock market' } = req.query;
    const response = await axios.get(`${NEWS_API_BASE}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news headlines' });
  }
});

router.get('/sentiment', async (req, res) => {
  try {
    const { query = 'India stock market' } = req.query;
    // Using the open doc API for GDELT as per original code
    const response = await axios.get(`${GDELT_BASE}/doc/doc?query=${encodeURIComponent(query)}&mode=ToneChart&format=json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sentiment data' });
  }
});

module.exports = router;
