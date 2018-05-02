const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const quiz = require('./quiz');

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

module.exports = mongoose.model('UserQuiz', userQuizSchema);