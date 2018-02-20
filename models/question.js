const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({
  text: String, // For text questions
  images: [String], // For accompanying question images. TODO: Figure out how to store img's
  answers: { // Can have multiple correct answers. TODO: Enforce at least 1 answer must be correct
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    required: true
  },
  explanation: String
});

module.exports = mongoose.model('Question', questionSchema);