var express = require('express');
var router = express.Router();
const AnswerModel = require('../models/answer');

/**
 * Create answer given its text or image, and is correct for associated question.
 */

router.post('/create', function(req, res, next) {
  const params = req.body;

  // TODO: Handle case where params not given
  AnswerModel.create(params, function(err, instance) {
    if (err) return res.status(400).send(err);

    res.send(instance);
  });
});

module.exports = router;
