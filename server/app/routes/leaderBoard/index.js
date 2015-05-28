'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Bot = require('mongoose').model("Bot");
var User = require('mongoose').model("User");
module.exports = router;



//GET userRank
router.get('/getUserRank', function (req, res, next) {

  User.find({}).sort( 'points' ).limit(20).exec(function(err, users) {
    if (err) return next(err);
    res.send(users);
  });
});

//GET botRank
router.get('/getBotRank', function (req, res, next) {
   
  Bot.find({}).sort( 'points' ).limit(20).exec(function(err, bots) {
    if (err) return next(err);
    res.send(bots);
  });
});


