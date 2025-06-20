const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const publicRoutes = require('./routes/publicRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', publicRoutes);
app.use('/api/restaurant', restaurantRoutes);

module.exports = app;
