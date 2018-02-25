const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login_key: { // TODO: Generate login key whenever user is created
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', userSchema);