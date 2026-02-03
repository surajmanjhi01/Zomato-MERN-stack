//create server
const express = require('express');
const cookierParser = require('cookie-parser');
const authRoutes = require('./src/controllers/routs/auth.routes');
const foodRoutes = require('./src/controllers/routs/food.routes');
const app = express();
app.use(cookierParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.get('/', (req, res) => {
    res.send("heelo world");
});

module.exports = app;