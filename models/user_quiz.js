const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = require('../models/user');
const QuizModel = require('../models/quiz');

const userQuizSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz_id: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    }],
    required: true
  },
  completion_date: {
      type: Date,
  },
}, {
  timestamps: true
});

/**
 * Create a promise to return a quiz with given questions (and their respective answers)
 */
userQuizSchema.statics.createWithGivenQuizAndUserIds = function(quizId, userId, completionDate) {
  const _this = this;
  return this.find({ quiz_id: quizId, user_id: userId })
  .then(function(results) {
        if (results.length === 0) {
            return _this.create({ quiz_id: quizId, user_id: userId, completion_date: completionDate });
        } else {
            throw new Error({
              message: "User already completed the quiz!"
            })
        }
    })
};

/**
 * Get all user quizzes, group by quiz id and sort by ascending start_date
 */
userQuizSchema.statics.generateReport = function() {
  const _this = this;

  return new Promise(function(resolve, reject) {
    _this.aggregate([
      { $sort: { start_date: 1 } },
      { $group: { _id: "$quiz_id", users: { $push: { user_id: "$user_id" } } } },
    ])
    .exec(function(aggregateError, report) {
      if (aggregateError) return reject(aggregateError);

      QuizModel.populate(report, { path: '_id', select: ['name', 'start_date', 'end_date'] }, function(quizPopulateError, populatedQuizzes) {
        if (quizPopulateError) return reject(populateError);

        userModel.populate(report, [{ path: 'users.user_id', select: ['login_key', 'login_times']}], function(userPopulateError, populatedUsers) {
          if (userPopulateError) return reject(userPopulateError);
          
          // Ugly clean up of messy format because mongoose is hard and no time
          const formattedReport = report.map(function(rawQuiz) {
            // Handle empty quiz
            if (Object.keys(rawQuiz).length === 0 && rawQuiz.constructor === Object) return {};

            const quiz = rawQuiz._id[0];
            const users = rawQuiz.users;
            
            const startDate = quiz.start_date;
            const endDate = quiz.end_date;
            const formattedStartDate = new Date(startDate).toDateString();
            const formattedEndDate = new Date(endDate).toDateString();
            console.log(startDate)
            console.log(new Date(startDate))

            // Count the number of times a user logged in within this quiz's start and end date
            const formattedUserStats = users.map(function(user) {
              const numberOfTimesLoggedInForQuiz = user.user_id.login_times.reduce(function(count, dateString) {
                const date = new Date(dateString);
                return (date <= endDate) && (date >= startDate)
                  ? count + 1
                  : count
              }, 0);

              return {
                loginKey: user.user_id.login_key,
                loginTimes: numberOfTimesLoggedInForQuiz
              }
            })

            return {
              title: quiz.name,
              duration: formattedStartDate + " - " + formattedEndDate,
              userStats: formattedUserStats
            }
          })

          resolve(formattedReport);
        })
      })
    })
  }) 
}

module.exports = mongoose.model('UserQuiz', userQuizSchema);