/**
 * User schema for Mongoose.
 *  Bike Schema for all information about each specific rental bike
 *
 * @module models/bike
 */
var mongoose = require('mongoose');

var bikeSchema = mongoose.Schema({
  bikeCategory: String,
  bikeMake: String,
  bikeModel: String,
  bikeSize: String,
  bikeFrame: String,
  bikeWheelSize: String,
  bikeTravelFront: Number,
  bikeTravelRear: Number,
  searchTags: [String],
  imageUrls: [String],
  manufacURL: String,
  buyPrice: String,
  rentalPrice: Number,
  bulletPoints: [String],
  bikeDesc: String,
  bikePricing: [Number]
});

module.exports = mongoose.model('Bike', bikeSchema);
