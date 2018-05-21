const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  const params = req.body;
  userModel.createWithLoginKey(params)
  .then(function(userInstance) {
    res.send(userInstance);
  })
  .catch(function(err) {
    res.status(500).send({message: err.message})
  })
});
/**
 * Return a list of all users.
 */
router.get('/get-all', function(req, res, next) {
  userModel.find({})
    .then(function(userInstances) {
      res.send(userInstances);
    })
    .catch(function(err) {
      res.status(500).send({message: err.message});
    })
});

router.post('/login', function(req, res, next) {
  const key = req.body.login_key;
  userModel.find({ login_key: key })
      .then(function(userInstances) {
        res.send(userInstances);
      })
      .catch(function(err) {
        res.status(500).send({message: err.message});
      })
  });
module.exports = router;
