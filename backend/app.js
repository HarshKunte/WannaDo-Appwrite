require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const app = express();

//Middleware
app.use(express.json())
app.use('/api/', userRoutes)

connectToDb()

module.exports = app