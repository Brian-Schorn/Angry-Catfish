/**
 * Provides routing for reservation related DB requests
 *
 * @module routes/reservation
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Reservation = require('../models/reservation');

//Retrieve all reservations GET REQUEST
router.get('/', function (req, res) {
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

//Retrieve all reservations for a Date

//Retrieve all reservations for a Bike ID

//Retrieve all reservations for a TransactionID

//Retrieve all reservations for an Email




//Add a new Reservation POST REQUEST
router.post('/', function (req, res) {
  console.log("POST request, add new reservation:",req.body);
  var newRes = new Reservation(req.body);
  newRes.save(function (err){
    if(err){
      console.log('Error Saving New Reservation to DB', err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  })
})

//Delete Reservation by ID DELETE REQUEST
router.delete('/:id', function(req, res){
  Reservation.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("Error Deleting Reservation: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("DELETE Request, deleted Reservation:", req.params.id);
    res.send(200);
  });
});

router.put('/:id', function(req, res){
  Reservation.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      console.log("Error Updating Reservation: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("PUT request, updated Reservation: ", id);
    res.send(204)
  });
});

module.exports = router;
