'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	codedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	viewable: { type: Boolean, default: true },
    forked: { type: Number, default: 0  },
    forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Bot' },
    created: { type: Date, required: true, default: Date.now() },
	botname: { type: String, required: true },
    botCode: { type: String, default: '' },
    points: { type: Number, default: 0 },
    shots: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    friendlyKills:  { type: Number, default: 0 },
    pickables: {
    	coins: { type: Number, default: 0 },
    	damages: { type: Number, default: 0 },
    	repairs: { type: Number, default: 0 },
    	shields: { type: Number, default: 0 },
    },
    //mines?!?
    battles: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    fubarbundy: { type: Number, default: 0 },
});

mongoose.model('Bot', schema);