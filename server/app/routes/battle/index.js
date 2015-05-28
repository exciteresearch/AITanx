'use strict';
var fs = require('fs');
var path = require('path');
// remove the next two lines and you will get an error 'Router.use() requires middleware function but got a Obj'
var router = require('express').Router();
var _ = require("lodash");
var bodyParser = require("body-parser");
var User = require('mongoose').model('User');
var Bot = require('mongoose').model('Bot');
var Event = require('mongoose').model('Event');

module.exports = router;

//BATTLE is from JOIN on PENDING Events
router.get('/battle/:eventId/user/:userId/bot/:botId', function (req, res) {
	var eventId = req.params.eventId, userId = req.params.userId,	botId = req.params.botId;
	
	//update client with room = eventID
	//open connection with server using room = eventID
	//start timer
	//end room OR start battle	
	res.redirect("http://192.168.1.216:1337/");
});

//TODO Timeout without zero openslots