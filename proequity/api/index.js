require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

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

// Vercel invokes this exported Express app as a serverless function. Do not call
// app.listen() here: Vercel owns the HTTP listener and invoking one causes the
// function to fail at runtime.
module.exports = app;
