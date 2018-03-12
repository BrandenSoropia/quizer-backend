const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  userModel.createWithLoginKey()
  .then(function(userInstance) {
    res.send(userInstance);
  })
  .catch(function(err) {
    res.status(500).send({message: err.message})
  })
});

module.exports = router;
