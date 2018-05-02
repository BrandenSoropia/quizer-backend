const express = require('express');
const router = express.Router();
const UserQuizModel = require('../models/user_quiz');

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

// Given time range, find number of complete
router.post('/generate-report', function(req, res, next) {
  const params = req.body;
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;
  const lookForCompleted = req.body.look_for_completed;

  UserQuizModel.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate
    },
    completion_date: { $exists: lookForCompleted }
  })
  .count(function(err, count) {
    if (err) return res.status(500).send({message: err.message});

    res.send({ count });
  })
})

module.exports = router;
