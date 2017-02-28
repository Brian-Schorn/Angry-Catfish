/**
 * Provides basic route for providing initial package
 * to client.
 *
 * @module routes/index
 */
var express = require('express');
var router = express.Router();
var path = require('path');
/**
 * GET /
 *
 * Send client the top-level index.html page.
 * @return index.html
 */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
