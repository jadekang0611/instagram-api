const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /register
// ADD the custom middleware to make it a more logical and simpler protected route
router.get('/', (req, res, next) => {
  User.findById(req.session.userId).exec((err, user) => {
    if (user === null) {
      res.status(401).send({ loggedin: false });
    } else {
      console.log(user);
      res.status(200).send({ user: user, loggedin: true });
    }
  });
});

router.get('/');

module.exports = router;
