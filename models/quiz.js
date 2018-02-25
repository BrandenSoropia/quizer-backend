const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionModel = require('./question');

const quizSchema = mongoose.Schema({
  name: String, // For text questions
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questions: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }],
    required: true
  },
  available_to: [{ // Limit access to these users.
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

/**
 * Create a promise to return a quiz with given questions (and their respective answers)
 */
quizSchema.statics.createWithGivenQuestions = function(data) {
  const questionsData = data.questions;
  const _this = this;

  // Create all questions and their respective answers first
  const promises = questionsData.map(function(questionData) {
    return new Promise(function(resolve, reject) {
      QuestionModel.createWithGivenAnswers(questionData)
        .then(function(instance) {
          resolve(instance);
        })
        .catch(function(err) {
          reject(err)
        })
    })
  });

  return new Promise(function(resolve, reject) {
    Promise.all(promises) // Wait for question creation to complete, then create quiz if no errors
      .then(function(questionInstances) {
        const questionIds = questionInstances.map(function(questionInstance) {
          return questionInstance._id;
        });
        // Replace list of question data with list of question instance ids
        data.questions = questionIds;

        _this.create(data)
          .then(function(quizInstance) {
            resolve(quizInstance)
          })
          .catch(function(err) { // Return quiz creation error
            reject(err);
          })
      })
      .catch(function(err) { // Return question creation error
        reject(err);
      })
  });
};

module.exports = mongoose.model('Quiz', quizSchema);