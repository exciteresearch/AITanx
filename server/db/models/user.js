'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	role: {
		type: String
	},
   email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    github: {
    	id: String
    },
    points: {
    	type: Number, default: 0
    },
	bots: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Bot'
	}],
	activated: {
		type: Date,
		default: Date.now
	},
	resetHash: {
		type: String, expires: 4320 // 3days*60secs*24hrs
	},
//	restExpires: {
//		type: Date,
//		default: Date(Date.now()+3) // 3 days for resetHas to expire
//	},
    rank: {
    	type: String,
    	enum: ["Expert","Advanced","Intermediate","Beginner"],
    	default: "Beginner"
    },
    school: {
    	type: String
    },
    insignia: {
    	type: String // URL to image
    }
		
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);