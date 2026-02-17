//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/controllers/routes/auth.routes');
const foodRoutes = require('./src/controllers/routes/food.routes');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.get('/', (req, res) => {
    res.send("heelo world");
});

module.exports = app;