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
// mailgun API
var api_key = 'key-7710c00df84e028e10e70a19a3b8f614';
var domain = 'sandbox13bae3c486b44c6dadae74eff2a6c9e1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var Bike = require('../models/bike');


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
  var name = req.body.custName;
  var dates = req.body.resDate;
  var price = req.body.totalPrice;
  var bikeID = req.body.bikeID;
  var email = req.body.custEmail;
  var bikeInfo = '';


// mailgun email message
Bike.findById(bikeID, function (err, result) {
  if (err){
    console.log("Error Getting Info From The DB", err);
    res.sendStatus(500);
    return;
  }
  console.log("Bike GET request:",result);
  bikeInfo = result;
  // var bikeResDetails = bikeInfo.bikeMake;
  console.log("resBikeInfo:", bikeInfo.bikeMake);

}).then(function(){
  console.log("Then Fired:", bikeInfo.bikeMake);
  var emailTemplate = "<p style='font-family:sans-serif'>Dear <em>" + name +
  "</em>, <br><br>Thank you for booking your upcoming adventure with us! When you come to pick up the bike we'll work with you to setup such things like fit, suspension settings and adjustments, tire pressure, and run you through the controls to make sure you're comfortable before you get shredding!" +
  "<br><br>Feel free to reach out to us beforehand if you have any questions or concerns.  We understand things happen, Mother Nature doesn't cooperate, and there might be scheduling conflicts so please let us know if we need to re-schedule your appointment as soon as you can!  Rental Appointments are non-refundable, but completely transferable to another future date." +
  "<br><br>We have some AMAZING trails in the area for you to get AWESOME!  Please make sure you check up on trail conditions before you ride (all seasons).  If you're in the immediate Minneapolis/St. Paul, the Minnesota Off-Road Cyclists will have all the information you need.  If you're headed north check out the Cyclists of the Gitchee Gumee Shores in the Duluth area, Cuyuna Lakes MTB for trails in the Brainard area, and our friends over at the Chequamegon Area Mountain Bike Associated for their incredible trail system over in northern Wisconsin." +
  "<br><br>And remember, if you happen to purchase a bike from us within 30 days of the rental, we'll deduct the cost of the rental off of your total." +
  "<br><br>Thank you again for booking with us.  We're looking forward to getting you out on the trails!" +
  "<br><br>Ride on," +
  "<br><br>ACF<p>"

  var data = {
    from: 'Angry Catfish <tjherman32@gmail.com>',
    to: email,
    subject: 'Angry Catfish Reservation Confirmation',
    // text: 'Hi ' + name + ',\n Thank you for your reservation. We have ' + bikeInfo + ' reserved for you on ' + dates + '. The cost of your rental is ' + price + ' If you have any questions or would like to change your reservation, please call us at 555-5555.'
    html: emailTemplate
    };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log('Email error:', error)
    } else {
      console.log('Mailgun e-mail sent:', body);
    }
  });
})
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
