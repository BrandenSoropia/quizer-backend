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
      if (aggregateError) reject(aggregateError);

      QuizModel.populate(report, { path: '_id', select: ['name', 'start_date'] }, function(quizPopulateError, populatedQuizzes) {
        if (quizPopulateError) reject(populateError);

        userModel.populate(report, [{ path: 'users.user_id', select: 'login_key'}], function(userPopulateError, populatedUsers) {
          if (userPopulateError) reject(userPopulateError);

          resolve(report);
        })
      })
    })
  }) 
}

module.exports = mongoose.model('UserQuiz', userQuizSchema);