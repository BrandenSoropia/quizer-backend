const mongoose = require('mongoose');
const faker = require('faker');

const userSchema = mongoose.Schema({
  login_key: { // TODO: Generate login key whenever user is created
    type: String,
    required: true
  }
});

userSchema.statics.createWithLoginKey = function() {
  const _this = this;

  return new Promise(function(resolve, reject) {
    _this.create({ login_key: faker.random.words() })
      .then(function(user) {
        resolve(user);
      })
      .catch(function(err) {
        reject(err);
      })
  })
};

module.exports = mongoose.model('User', userSchema);