const express = require('express');
const path = require('path')
const colors = require('colors');
const dotenv = require('dotenv').config();
const { rateLimit } = require('express-rate-limit')
const { connectDB } = require('./config/db'); 
const { errorHandler } = require('./middleware/error');

const port = process.env.PORT || 5000;

connectDB();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// app.use(limiter)
app.use("/backend/uploads",express.static(path.join(__dirname + "/uploads")));


app.use(errorHandler)
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.listen(port, () => console.log(`Server is running on port ${port}`));