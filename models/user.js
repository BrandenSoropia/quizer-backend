const mongoose = require('mongoose');
const faker = require('faker');

const userSchema = mongoose.Schema({
  login_key: { // TODO: Generate login key whenever user is created
    type: String,
    required: true
  },
  login_times: [{ // List of login times for user. Ex: ["Sun Jul 01 2018", ...]
    type: String
  }]
});

userSchema.statics.getLoginTimesReport = function() {
  const _this = this;

  return new Promise(function(resolve, reject) {
    _this.find({}, function(err, users) {
      if (err) reject(err);

      const formattedReport = users.map(function(user) {
        return {
          loginKey: user.login_key,
          loginTimes: user.login_times
        }
      });
  
      resolve(formattedReport);
    })
  })
}

userSchema.statics.createWithLoginKey = function(data) {
  const loginData = data.login_key;
  const _this = this;

  return new Promise(function(resolve, reject) {
    _this.create({ login_key: faker.random.word() + faker.random.number() })
      .then(function(user) {
        resolve(user);
      })
      .catch(function(err) {
        reject(err);
      })
  })
};

module.exports = mongoose.model('User', userSchema);