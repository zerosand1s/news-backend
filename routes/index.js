var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var baseUrl = 'https://newsapi.org/v2/';
var defaultCountry = 'us';

/* GET home page. */
router.get('/headlines', function(req, res, next) {
  var country;
  var category;
  var params = {};
  params.country = req.query.country;
  if(req.query.category) {
    category = req.query.category;
    params.category = category;
  }

  let options = {
    uri: baseUrl+'top-headlines',
    qs: params,
    headers: {
      Authorization: process.env.ACCESS_KEY
    },
    json: true
  };

  rp(options)
    .then((headlines) => {
      res.status(200).json({
        status: 'success', 
        data: headlines.articles
      });
    });
});

module.exports = router;
