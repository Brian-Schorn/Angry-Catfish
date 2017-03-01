/**
 * Provides routing for reservation related DB requests
 *
 * @module routes/reservation
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Reservation = require('../models/reservation');
/**
 * GET /
 *
 * Send client the top-level index.html page.
 * @return index.html
 */
router.get('/all', function (req, res) {
  Reservation.find({}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    console.log("Reservation /all GET request:",result);
    res.send(result)
  });
});

module.exports = router;
