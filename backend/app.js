//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/controllers/routes/auth.routes');
const foodRoutes = require('./src/controllers/routes/food.routes');
const foodPartnerRoutes = require('./src/controllers/routes/food-partner.routes');
const cors=require('cors');
const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests and same-origin requests with no Origin header.
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);
app.get('/', (req, res) => {
     res.send("hello world");
});

module.exports = app;