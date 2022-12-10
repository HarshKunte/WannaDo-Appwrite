require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/db');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const app = express();

//Middleware
app.use(express.json())
app.use('/api/', userRoutes)
app.use(cors())

connectToDb()

module.exports = app