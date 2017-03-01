/**
 * Provides routing for bike related DB requests
 *
 * @module routes/bike
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Bike = require('../models/bike');
/**
 * GET /
 *
 * Send client the top-level index.html page.
 * @return index.html
 */
router.get('/all', function (req, res) {
  Bike.find({}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    console.log("Bike /all GET request:",result);
    res.send(result)
  });
});

module.exports = router;
