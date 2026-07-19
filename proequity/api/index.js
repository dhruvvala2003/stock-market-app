require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
const stocksRouter = require('./routes/stocks');
const marketRouter = require('./routes/market');
const newsRouter = require('./routes/news');

app.use('/api/stocks', stocksRouter);
app.use('/api/market', marketRouter);
app.use('/api/news', newsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel Serverless Functions
module.exports = app;
