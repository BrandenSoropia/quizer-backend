const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

/* GET users listing. */

// router.post('/create', function(req, res, next) {
//   const params = req.body;
//   userModel.createWithLoginKey(params)
//   .then(function(userInstance) {
//     res.send(userInstance);
//   })
//   .catch(function(err) {
//     res.status(500).send({message: err.message})
//   })
// });

/**
 * Return a list of all users.
 */
 /*
router.get('/get-all', function(req, res, next) {
  userModel.find({})
    .then(function(userInstances) {
      res.send(userInstances);
    })
    .catch(function(err) {
      res.status(500).send({message: err.message});
    })
});
*/

router.post('/login', function(req, res, next) {
  const key = req.body.login_key;
  userModel.find({ login_key: key })
      .then(function(userInstances) {
        const userInstance = userInstances[0];
        const currentLoginTime = new Date().toDateString();
        userInstance.login_times.push(currentLoginTime);
        
        const updatedProperties = {
          login_times: userInstance.login_times
        };

        userModel.update({ login_key: key }, updatedProperties, function(err, updatedUserInstance) {
          if (err) console.log(err);
          res.send(userInstances);
        });
      })
      .catch(function(err) {
        res.status(500).send({message: err.message});
      })
  });
module.exports = router;
