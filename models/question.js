const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({
  text: String, // For text questions,
  images: [String], // TODO: Figure out how to store img's
  answers: { // Can have multiple correct answers
    type: [{ type: Schema.Types.ObjectId, ref: 'Answers' }],
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);