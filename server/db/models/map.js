'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	codedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	viewable: { type: Boolean, default: true, required: true },
    forked: { type: Number, default: 0 },
    forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
    created: { type: Date, required: true, default: Date.now() },
	title: { type: String, required: true },
	description: { type: String },
    type: { 
    	type: String, 
    	enum: [ "Walls and Pickables"
//    	        ,"Walls",
//    	        "Baren",
//    	        "FauBot", 
//    	        "AvoidBot", 
//    	        "WallBot", 
//    	        "RCBot", 
//    	        "Pickables", 
//    	        "Select A Foe" 
	        ], 
    	required: true, 
    	default: "Walls and Pickables" 
		},
	levelData: { type: String },
	pickablesData: { type: String }	
});

mongoose.model('Map', schema);