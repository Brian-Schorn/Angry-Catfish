/**
 * User schema for Mongoose.
 * Reservation Schema, stores info on each individual reservation, inlcluding Bike ID and Date
 * @module models/reservation
 */
var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
  seq: Number
});

module.exports = mongoose.model('Counter', counterSchema);
