const express = require('express');
const router = express.Router();

// A generic news key is not proof of redistribution rights or source provenance.
router.get('/headlines', (req, res) => res.status(503).json({ error: 'News unavailable. Configure an approved licensed feed or a primary-source announcement connector with documented public-display rights.', code: 'PROVIDER_NOT_CONFIGURED' }));
router.get('/sentiment', (req, res) => res.status(503).json({ error: 'Sentiment is unavailable. ProEquity does not publish an unsupported synthetic sentiment score.', code: 'DATA_UNAVAILABLE' }));
module.exports = router;
