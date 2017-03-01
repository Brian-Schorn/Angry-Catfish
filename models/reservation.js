/**
 * User schema for Mongoose.
 * Reservation Schema, stores info on each individual reservation, inlcluding Bike ID and Date
 * @module models/reservation
 */
var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
  bikeID: [String],
  transactionID: Number,
  resDate: [Date],
  custName: String,
  custEmail: String,
  custPhone: String,
  custAddress: String,
  pedalType: String,
  needHelmet: Boolean,
  waiverSigned: Boolean
});

module.exports = mongoose.model('Reservation', reservationSchema);
