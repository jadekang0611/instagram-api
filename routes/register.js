const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

// POST /register
router.post('/', async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.password) {
    // HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // CREATE A NEW USER
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    try {
      const saveduser = await user.save();
      req.session.userId = user._id;
      req.session.lastuserId = user._id;
      res.status(200).send({ saveduser: saveduser, loggedin: true });
    } catch (e) {
      console.log(e);
      res.status(500).send({ loggedin: false });
    }
  } else {
    const err = new Error('All fields are required');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
