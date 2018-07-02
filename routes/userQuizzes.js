const express = require('express');
const router = express.Router();
const UserQuizModel = require('../models/user_quiz');
const userModel = require('../models/user');
const Json2csvParser = require('json2csv').Parser;

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
router.get('/generate-report', function(req, res, next) {
  UserQuizModel.generateReport()
  .then(function(completedQuizzes) {

    // TODO: Generate login report as well. Send both reports back
    userModel.getLoginTimesReport()
      .then(function(loginReport) {
        res.send({
          completedQuizzes,
          loginReport
        });
      })
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).send({message: err.message});
  })
})

router.get('/generate-quiz-report', function(req, res, next) {
  UserQuizModel.generateReport()
  .then(function(completedQuizzes) {
    const fields = [{value: 'title', label: 'Quiz Title'}, {value: 'duration', label: "Duration"}, {value: 'userStats.loginKey', label: 'Login Key'}, {value: 'userStats.loginTimes', label: 'Times Logged In'}];
    const json2csvParser = new Json2csvParser({ fields, unwind: ['userStats', 'userStats.login'] });
    const csv = json2csvParser.parse(completedQuizzes);

    res.header("Content-Disposition","attachment;filename=quiz-completion-report.csv"); 
    res.type("text/csv");
    res.send(200, csv);
  })
})

router.get('/generate-login-report', function(req, res, next) {
  userModel.getLoginTimesReport()
      .then(function(loginReport) {
    const fields = [{value: 'loginKey', label: 'Login Key'}, {value: 'loginTimes', label: 'Login Dates'}];
    const json2csvParser = new Json2csvParser({ fields, unwind: 'loginTimes' });
    const csv = json2csvParser.parse(loginReport);

    res.header("Content-Disposition","attachment;filename=user-login-report.csv"); 
    res.type("text/csv");
    res.send(200, csv);
  })
})

module.exports = router;
