const express = require('express');
const router = express.Router();
const UserQuizModel = require('../models/user_quiz');

router.get('/create', function(req, res, next) {
  const params = req.body;
  
  UserQuizModel.createWithGivenQuizAndUserIds(params)
  .then(function(userQuizInstance) {
      res.send(userQuizInstance);
  })
  .catch(function(err) {
    res.status(500).send({message: err.message})
  })
});

module.exports = router;
