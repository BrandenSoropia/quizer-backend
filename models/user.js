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
    const users = [];

    // for (let i=0; i < 3; i++) {
      // users.push({ login_key: 'testuser_' + i })
      // users.push({ login_key: 'testuser_' + faker.random.number()})
    // }
    _this.insertMany(users, function(err, docs) {
      if (err) {
        reject(err)
      } else {
        console.log("made " + docs.length + " accounts")
        resolve(docs)
      }
    })
      // .then(function(user) {
      //   resolve(user);
      // })
      // .catch(function(err) {
      //   reject(err);
      // })
  })
};

module.exports = mongoose.model('User', userSchema);