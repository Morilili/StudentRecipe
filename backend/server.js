const express = require('express');
const path = require('path')
const colors = require('colors');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db'); 
const { errorHandler } = require('./middleware/error');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use("/backend/uploads",express.static(path.join(__dirname + "/uploads")));

app.use(errorHandler)
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.listen(port, () => console.log(`Server is running on port ${port}`));