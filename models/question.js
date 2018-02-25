const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnswerModel = require('./answer');

const questionSchema = mongoose.Schema({
  text: String, // For text questions
  images: [String], // For accompanying question images. TODO: Figure out how to store img's
  answers: { // Can have multiple correct answers. TODO: Enforce at least 1 answer must be correct
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }],
    required: true
  },
  explanation: String
});

/**
 * Create a promise to return a question when answers data included.
 */
questionSchema.statics.createWithGivenAnswers = function(data) {
  const answersData = data.answers;
  const _this = this;

  return new Promise(function(resolve, reject) {
    AnswerModel.create(answersData)
      .then(function(answerInstances) {
        // Replace list of answer data with list of answer instance id's
        data.answers = answerInstances.map(function(answer) {
          return answer._id;
        });

        _this.create(data) // Create and return question instance
          .then(function(questionInstance) {
            resolve(questionInstance);
          })
          .catch(function(err) { // Return question creation error
            reject(err);
          })
      })
      .catch(function(err) { // Return answer creation error
        reject(err);
      })
  })
};

module.exports = mongoose.model('Question', questionSchema);