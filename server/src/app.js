const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
