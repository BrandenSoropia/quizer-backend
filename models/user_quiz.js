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
      required: true
  }
});

/**
 * Create a promise to return a quiz with given questions (and their respective answers)
 */
userQuizSchema.statics.createWithGivenQuizAndUserIds = function({ quiz_id, user_id }) {
  const _this = this;
  return this.find({ quiz_id, user_id })
  .then(function(results) {
        if (results.length === 0) {
            _this.create({ quiz_id, user_id }, function(err, instance) {
                if (err) return err;

                return instance;
            })
        } else { // TODO: Report back that this user has already completed this quiz
            
        }
    })
    .catch(function(err) {
      console.log(err);
    })
};

module.exports = mongoose.model('UserQuiz', userQuizSchema);