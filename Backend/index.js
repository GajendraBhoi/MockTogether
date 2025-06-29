require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. Global Middleware
app.use(express.json());            // parse JSON bodies
app.use(cookieParser());            // parse cookies

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));         // enable CORS (handles preflight too)

// 2. Database Connection
const dbConnect = require('./Config/database');
dbConnect();

// 3. Routes
const userRoute = require('./Routes/User');
app.use('/', userRoute);

app.get('/', (req, res) => {
    res.send('<h1>App is running</h1>');
});

// 4. Start Server (after all middleware/routes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
