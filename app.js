const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

require('dotenv/config');

// Import Routes
const registerRoute = require('./routes/register');
const signinRoute = require('./routes/signin');
const profileRoute = require('./routes/profile');
const logoutRoute = require('./routes/logout');

// My Middlewares

// MongoDB connection for production
mongoose.connect(
  process.env.DB_CONNECTIONS,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB connected')
);

const db = mongoose.connection;

app.use(
  session({
    secret: 'Instagram Loves You',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/register', registerRoute);
app.use('/signin', signinRoute);
app.use('/profile', profileRoute);
app.use('/logout', logoutRoute);

// app.use((req, res, next) => {
//   res.send('Hello World');
// });

// Add a method to listen to my server
const PORT = process.env.PORT || 8000;
module.exports = app.listen(PORT, () => {
  console.log(`My app is running on port ${PORT}.`);
});
