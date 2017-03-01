/**
 * User schema for Mongoose.
 *  Bike Schema for all information about each specific rental bike
 *
 * @module models/bike
 */
var mongoose = require('mongoose');

var bikeSchema = mongoose.Schema({
  bikeID: Number,
  bikeType: String,
  bikeMake: String,
  bikeModel: String,
  bikeSize: String,
  searchTags: [String],
  imageUrls: [String],
  buyPrice: String,
  rentalPrice: Number,
  bulletPoints: [String],
  bikeDesc: String
});

module.exports = mongoose.model('Bike', bikeSchema);
