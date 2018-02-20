var express = require('express');
var router = express.Router();
var _ = require('lodash');
const QuestionModel = require('../models/question');
const AnswerModel = require('../models/answer');


/**
 * Create question given its text, images, explanation and answers.
 */
router.post('/create', function(req, res, next) {
  const params = req.body;
  const answers = params.answers;

  // TODO: Handle case where params not given
  // First create and save answers
  const answerPromises = answers.map(function(answerData) {
    return new Promise(function(resolve, reject) {
      AnswerModel.create(answerData, function(err, instance) {
        if (err) return reject(err); // Error happened when creating this answer

        console.log('Successfully created answer');
        resolve(instance);
      });
    })
  });

  Promise.all(answerPromises) // Create question after done creating and saving answers
    .then(function(answerInstances) {
      // Extract all answer id's
      const answerIds = answerInstances.map(function(answerInstance) {
        return answerInstance._id;
      });

      const questionData = {
        text: params.text,
        images: _.get(params, 'images', []), // Default empty array if no images given
        answers: answerIds,
        explanation: params.explanation
      };
      QuestionModel.create(questionData, function (err, instance) {
        if (err) return res.status(400).send(err);

        console.log('Successfully created question');
        res.send(instance);
      });
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
});

/**
 * Return all questions.
 */
router.get('/get_all', function(req, res, err) {
  QuestionModel.find({})
    .populate('answers') // Populate answers with actual information
    .exec(function(err, questions) {
      if (err) return res.send(err);

      res.send(questions);
    })

});

module.exports = router;
