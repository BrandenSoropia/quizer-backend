const express = require('express');
const router = express.Router();
const QuizModel = require('../models/quiz');
const UserQuizModel = require('../models/user_quiz');
/*
router.post('/create', function(req, res, next) {
  const params = req.body;
  const quizId = params.quiz_id;
  const userId = params.user_id;
  const completionDate = params.completion_date;

  UserQuizModel.createWithGivenQuizAndUserIds(quizId, userId, completionDate)
  .then(function(userQuizInstance) {
    res.send(userQuizInstance);
  })
  .catch(function(err) {
    res.status(500).send({message: err.message})
  })
});
*/

// Given time range, find number of complete
router.post('/generate-report', function(req, res, next) {
  
  UserQuizModel.generateReport()
  .then(function(report) {
    res.send(report);
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).send({message: err.message});
  })
})

module.exports = router;
