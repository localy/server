var elasticsearch = require('elasticsearch');
var express = require('express');
var router = express.Router();

var client = new elasticsearch.Client({
  	host: 'localhost:9200',
  	log: 'trace'
});

/*  url: search?q=sushi&parameters */
router.get('/', function(req, res) {
	client.search({
	  q: req.query.q
	}).then(function (body) {
	  var hits = body.hits.hits;
	  res.status(200).json(hits);
	}, function (error) {
	  res.status(500).json({ error: error.message })
	});
});

module.exports = router;