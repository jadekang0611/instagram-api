const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

require('dotenv/config');

// Import Routes

// My Middlewares

// MongoDB connection for production
mongoose.connect(
  process.env.DB_CONNECTIONS,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB connected')
);

app.use((req, res, next) => {
  res.send('Hello World');
});

// Add a method to listen to my server
const PORT = process.env.PORT || 8000;
module.exports = app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
