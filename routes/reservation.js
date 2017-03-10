/**
 * Provides routing for reservation related DB requests
 *
 * @module routes/reservation
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Reservation = require('../models/reservation');
var Counter = require('../models/counter');
var api_key = 'key-7710c00df84e028e10e70a19a3b8f614';
var domain = 'sandbox13bae3c486b44c6dadae74eff2a6c9e1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

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


// mailgun email message
  var data = {
    from: 'Angry Catfish <tjherman32@gmail.com>',
    to: req.body.custEmail,
    subject: 'Angry Catfish Reservation Confirmation',
    text: 'Hi ' + req.body.custName + ',\n Thank you for your reservation. We have ' + req.body.bikeId + ' reserved for you on ' + req.body.resDate + '. If you have any questions or would like to change your reservation, please call us at 555-5555.'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log('mailgun!!!!!', body);
  });
  //////////////////

  Counter.find({}, function (err, result){
    if (err){
      console.log("Error Getting Counter Info From The DB", err);
      return;
    }
    console.log("Counter Check request:", result[0].seq);
    var currentCounter = result[0].seq;
    currentCounter++;
    req.body.transactionID = currentCounter;
    console.log("TransactionID", req.body.transactionID);
    Counter.findOneAndUpdate({name: "userid"}, { $inc: { seq: 1}}, function(err){
      if (err) {
        console.log("Error Updating Counter: ", err);
        return;
      }
      return;
    });
  }).then(function(){
  // req.body.transactionID = ret.seq;
  // console.log("transactionID ", req.body.transactionID);
  // console.log("req.body", req.body);
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
