var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/upload');
var multer = require('multer');

var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var upload = multer({
 storage: multerS3({
   s3: s3,
   bucket: process.env.S3_BUCKET_NAME,//alternately, if you are not using a .env file you can just use a string for the name of your bucket here, 'your-bucket-name'
   acl: 'public-read',//default is private, set to public-read is so the public can view your pictures
   metadata: function (req, file, cb) {
     cb(null, {fieldName: file.fieldname});
   },
   key: function (req, file, cb) {
     cb(null, Date.now().toString())
   }
 })

});

//upload.single('file') is the line that uploads to AWS, the rest is MongoDB
router.post('/', upload.single('file'), function(req, res) {

 var newUpload = {
   created: Date.now(),
   file: req.file,
   comment: req.body.comment,
   //var2: req.body.var2
 };
 Upload.create(newUpload, function (err) {
   if (err) {
     console.log(err);
   } else {
     res.send(newUpload);
   }
 });
});

//gets all the uploads recorded in the database
router.get('/', function (req, res) {
 Upload.find({}, function (err, data) {
   if (err) {
     res.sendStatus(500);
     return;
   }
   res.send(data);
 });
});

router.delete('/', function (req, res) {
  Upload.remove({}, function (err, data) {
    if (err) {
      console.log("Error clearing uploads DB", err);
      res.sendStatus(500);
      return
    }
    res.sendStatus(200);
  })
})

//Delete Bike by ID DELETE REQUEST
router.delete('/:id', function(req, res){
  Upload.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("Error Deleting Pic: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("DELETE Request, deleted Picture:", req.params.id);
    res.send(200);
  });
});

module.exports = router;
