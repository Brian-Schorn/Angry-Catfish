/**
 * User schema for Mongoose.
 * Reservation Schema, stores info on each individual reservation, inlcluding Bike ID and Date
 * @module models/reservation
 */
var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
  transactionID: Number,
  bikeID: [String],
  resDate: [Date],
  custName: String,
  custEmail: String,
  custPhone: String,
  custAddress: String,
  pedalType: String,
  needHelmet: Boolean,
  waiverSigned: Boolean,
  totalPrice: Number,
  custLicenseNum: String,
  custPhoneNum: String,
  custParentOrGuardianName: String,
  custEmergencyContactName: String,
  custEmergencyContactPhoneNum: String,
  custEmergencyContactRelationshipInfo: String,
  custBikeDescription: String,
  custWaiverAcceptDate: Date,
  custParentGuardianWaiverAcceptDate: Date,
  custSignature: String,
  custParentGuardianSignature: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
