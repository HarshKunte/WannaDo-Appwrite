require('dotenv').config();
const path = require('path')
const express = require('express');
const connectToDb = require('./config/db');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const app = express();

//Middleware
app.use(express.json())
app.use('/api/', userRoutes)
app.use(cors())

app.use(express.static(path.join(path.resolve(), '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(path.resolve(), '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
connectToDb()

module.exports = app