'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challenged: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfCreation: { type: Date, default: Date.now() },
    deadline: { type: Date, default: Date.now() + (7*24*60*60*1000) },
    accepted: { type: Boolean, default: true }
});

mongoose.model('Challenge', schema);