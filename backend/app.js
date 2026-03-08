//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/controllers/routes/auth.routes');
const foodRoutes = require('./src/controllers/routes/food.routes');
const cors=require('cors');
const app = express();
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.get('/', (req, res) => {
     res.send("hello world");
});

module.exports = app;