const express = require('express');
const router = express.Router();
const QuizModel = require('../models/quiz');

/**
 * Create quiz given name, creator id, available to list of users
 * and questions and their respective answers. Returns quiz.
 */
router.post('/create', function(req, res, next) {
  const params = req.body;

  QuizModel.createWithGivenQuestions(params)
    .then(function(quizInstance) {
      res.send(quizInstance);
    })
    .catch(function(err) {
      res.status(500).send({message: err.message});
    })
});

// Get quiz between a time frame
router.post('/current-quiz', function(req, res, err) {
  const current_date = req.body.current_date;
  QuizModel.findOne({ start_date: { $lte: current_date }, end_date: { $gte: current_date } })
    .populate({ // Populate questions and answers with their information
      path: 'questions',
      populate: {
        path: 'answers',
        model: 'Answer'
      }
    })
    .exec(function(err, quiz) {
      if (err) return res.status(500).send({message: err.message});

      res.send(quiz);
    })
})

/**
 * Return a list of all quizzes.
 */
router.get('/get-all', function(req, res, next) {
  QuizModel.find({})
    .then(function(quizInstances) {
      res.send(quizInstances);
    })
    .catch(function(err) {
      res.status(500).send({message: err.message});
    })
});

/**
 * Return a quiz with populated questions and answers.
 */
router.post('/find-by-id', function(req, res, next) {
  const id = req.body.id;
  // TODO: Handle invalid object id
  QuizModel.find({ '_id': id })
    .populate({ // Populate questions and answers with their information
      path: 'questions',
      populate: {
        path: 'answers',
        model: 'Answer'
      }
    })
    .exec(function(err, quiz) {
      if (err) return res.status(500).send({message: err.message});

      res.send(quiz);
    })
});


module.exports = router;
