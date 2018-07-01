var express = require('express');
var router = express.Router();
var _ = require('lodash');
const QuestionModel = require('../models/question');

/**
 * Create question given its text, images, explanation and answers.
 */

router.post('/create', function(req, res, err) {
  const params = req.body;
  const answersData = params.answers;

  // Respond with error if at least one correct answer is not given TODO: Replace with schema validation
  const hasAtLeastOneCorrectAnswer = answersData.find(function(answerData) { return answerData.is_correct });
  if (!hasAtLeastOneCorrectAnswer) return res.send({message: 'Requires at least one correct answer.'})

  QuestionModel.createWithGivenAnswers(params)
    .then(function(questionInstance) {
      res.send(questionInstance);
    })
    .catch(function(err) {
      res.status(500).send({message: err.message})
    })
});

/**
 * Return all questions.
 */

router.get('/get-all', function(req, res, err) {
  QuestionModel.find({})
    .populate('answers') // Populate answers with actual information
    .exec(function(err, questions) {
      if (err) return res.send(err);

      res.send(questions);
    })
});

module.exports = router;
