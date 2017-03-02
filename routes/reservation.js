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

//Retrieve all reservations for a Bike ID
router.get('/bikeID', function (req, res) {
  var bikeQueryID = req.query.bikeID;
  Reservation.find({bikeID: bikeQueryID}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    res.send(result)
  });
});

//Retrieve all reservations for a TransactionID
router.get('/transactionID', function (req, res) {
  transactionQueryID = req.query.transactionID;
  Reservation.find({transactionID: transactionQueryID}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    console.log("Reservation /transactionID GET request:",result);
    res.send(result)
  });
});
//Retrieve all reservations for an Email
router.get('/email', function (req, res) {
  email = req.query.email;
  Reservation.find({custEmail: email}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    console.log("Reservation /email GET request:",result);
    res.send(result)
  });
});

//Retrieve all reservations for a Date
router.get('/date', function (req, res) {
  date = new Date(req.params.date);
  dateEnd = new Date(date.setDate(date.getDate() + 1));
  console.log("Searching Reservations by Date:", date, dateEnd);
  Reservation.find({resDate : {
        '$gte': date,
        '$lte': dateEnd
    }}, function (err, result) {
    if (err){
      console.log("Error Getting Info From The DB", err);
      res.sendStatus(500);
      return;
    }
    console.log("Reservation /date GET request:",result);
    res.send(result)
  });
});





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

//Update Reservation by ID PUT REQUEST
router.put('/:id', function(req, res){
  Reservation.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      console.log("Error Updating Reservation: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("PUT request, updated Reservation: ", req.params.id);
    res.send(204)
  });
});

module.exports = router;
