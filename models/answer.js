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

/**
 * Return promise that passes newly created/updated document iff no err occurred.
 * Otherwise, promise passes error.
 */
answerSchema.statics.set = function (data) {
  const text = data.text;
  const img = data.img;


  return this.find({ text: text, img: img })
    .then(function(results) {
      // No duplicates, create new answer
      if (results.length === 0) {
        this.create(data, function(err, instance) {
          if (err) return err;

          return instance
        })
      } else { // TODO: Update existing answer

      }
    })
    .catch(function(err) {
      console.log(err);
    })
};

module.exports = mongoose.model('Answer', answerSchema);