/**
* Provides routing for bike related DB requests
*
* @module routes/bike
*/
var express = require('express');
var router = express.Router();
var path = require('path');
var Bike = require('../models/bike');

//Retrieve all bikes GET REQUEST
router.get('/', function (req, res) {
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

//ADD A NEW BIKE POST REQUEST
router.post('/', function (req, res) {
  console.log("POST request, adding new bike:",req.body);
  var newBike = new Bike(req.body);
  newBike.save(function (err){
    if(err){
      console.log('Error Saving New Bike to DB', err);
      res.sendStatus(500);
      return;
    }
    console.log("POST request, added new bike:", newBike);
    res.sendStatus(201);
  });
});

//Delete Bike by ID DELETE REQUEST
router.delete('/:id', function(req, res){
  Bike.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("Error Deleting Bike: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("DELETE Request, deleted bike:", req.params.id);
    res.send(200);
  });
});

router.put('/:id', function(req, res){
  Bike.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      console.log("Error Updating Bike: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("PUT request, updated bike: ", req.params.id);
    res.send(204)
  });
});

  module.exports = router;
