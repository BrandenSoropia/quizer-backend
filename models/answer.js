const mongoose = require('mongoose');

/* Requires either text or an img */
const answerSchema = mongoose.Schema({
  text: {
    type: String,
    required: function() {
      return !this.img;
    }
  },
  img: { // TODO: Like "Question", figure out how to refer to img's,
    type: String,
    required: function() {
      return !this.text;
    }
  },
  is_correct: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Answer', answerSchema);