var express = require('express');
var router = express.Router();
var settings = require("../settings");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', 
  						channelName: "#boldbigflank",
  						pubnub_subscribe_key: settings.pubnub.subscribe_key,
  						pubnub_publish_key: settings.pubnub.publish_key
  						});
});

router.get("/:channel", function(req, res){
	res.render('index', { 	title: 'GTP', 
						 	channelName: req.params.channel,
							pubnub_subscribe_key: settings.pubnub.subscribe_key,
							pubnub_publish_key: settings.pubnub.publish_key
							});
});

module.exports = router;
