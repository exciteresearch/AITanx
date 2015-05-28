var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/bot');

var Bot = mongoose.model('Bot');
var User = mongoose.model('User');

describe('Bot model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

	var user;
    beforeEach('Create temporary user', function (done) {
		user = new User({
			email: 'fake@email.com',
			username: 'faker'
		});
		User.create(user,function(err,saved) {
			if(err) return done(err);
			user = saved;
			done();
		});
    });

	var bot, forkedBot;
    beforeEach('Create temporary bot', function (done) {
		bot = new Bot({
			codedBy: user._id,
			viewable: true, // include in tests
			forked: 1,
			botname: "bruiser",
			botCode: "// Empty BotFile",
			created: Date.now(),
			points: 0,
			shots: 30,
			kills: 0,
			friendlyKills: 0,
			pickables: { coins: 0, damages: 0, repairs: 0, shields: 0},
			battles: 0,
			wins: 0,
			losses: 1,
			fubarbundy: 1
		});
		Bot.create(bot,function(err,saved) {
			if(err) return done(err);
			forkedBot = saved;
			done();
		});
    });

    beforeEach('Create temporary bot', function (done) {
		bot = new Bot({
			codedBy: user._id,
			viewble: true, // include in tests
			forked: 0,
			forkedFrom: forkedBot._id,
			botname: "hasher",
			botCode: "// Empty BotFile",
			created: Date.now(),
			points: 300,
			shots: 3,
			kills: 3,
			friendlyKills: 0,
			pickables: { coins: 0, damages: 1, repairs: 2, shields: 3},
			battles: 1,
			wins: 1,
			losses: 0,
			fubarbundy: 0
		});
		Bot.create(bot,function(err,saved) {
			if(err) return done(err);
			bot = saved;
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Bot).to.be.a('function');
    });

    it('has codedBy which is equal to the id of the user who is created it or last forked it',function(done){			
		Bot.findById(bot._id,function(err,found){
			expect(found.codedBy.toString()).to.equal(user._id.toString());
			done();
		});
    });
    
    it('requires codedBy',function(done){
		invalidBot = new Bot({
			viewble: true, // include in tests
			forked: 0,
			forkedFrom: forkedBot._id,
			botname: "hasher",
			botCode: "// Empty BotFile",
			created: Date.now(),
			points: 300,
			shots: 3,
			kills: 3,
			friendlyKills: 0,
			pickables: { coins: 0, damages: 1, repairs: 2, shields: 3},
			battles: 1,
			wins: 1,
			losses: 0,
			fubarbundy: 0
		});
		invalidBot.save(function(err){
			expect(err).to.exist;
            expect(err.message).to.equal("Validation failed");
            done();
        });
    });
    
    it('has viewable which is Boolean',function(done){			
		Bot.findById(bot._id,function(err,found){
			expect(found.viewable).to.be.a('boolean');
			expect(found.viewable).to.equal(true);
			done();
		});
    });
    
    it('has viewable equal to true by default',function(done){
		tempBot = new Bot({
			codedBy: user._id,
//			viewble: true, // include in tests
			forked: 0,
			forkedFrom: forkedBot._id,
			botname: "hasher",
			botCode: "// Empty BotFile",
			created: Date.now(),
			points: 300,
			shots: 3,
			kills: 3,
			friendlyKills: 0,
			pickables: { coins: 0, damages: 1, repairs: 2, shields: 3},
			battles: 1,
			wins: 1,
			losses: 0,
			fubarbundy: 0
		});
		Bot.create(tempBot, function(err,saved) {
			if(err) return done(err);
			expect(saved.viewable).to.equal(true);
			done();
		});
    });

    it('has forked, a number which is equal to 0 by default',function(done){
		tempBot = new Bot({
			codedBy: user._id,
			viewble: true, // include in tests
//			forked: 0,
			forkedFrom: forkedBot._id,
			botname: "hasher",
			botCode: "// Empty BotFile",
			created: Date.now(),
			points: 300,
			shots: 3,
			kills: 3,
			friendlyKills: 0,
			pickables: { coins: 0, damages: 1, repairs: 2, shields: 3},
			battles: 1,
			wins: 1,
			losses: 0,
			fubarbundy: 0
		});
		Bot.create(tempBot, function(err,saved) {
			if(err) return done(err);
			expect(saved.forked).to.equal(0);
			done();
		});

    });

    it('has forkedFrom which is equal to the id of the bot it was forked from',function(done){			
		Bot.findById(bot._id,function(err,found){
			expect((found.forkedFrom).toString()).to.equal((bot.forkedFrom).toString());
			done();
		});
    });
    
    it('has botname and created which are required and an empty string and a Date object by default',function(done){			
		Bot.findById(bot._id,function(err,found){
//			expect(err).to.exist;
//			expect(err.message).to.equal("Validation failed");
			expect(found.botname).to.equal('hasher');
			expect(found.created.toString()).to.equal(bot.created.toString());
			done();
		});
    });
    
    it('has botCode, points, shots, kills, pickables, battles, wins, and fubarbundy',function(done){			
		Bot.findById(bot._id,function(err,found){
			expect(found).property('botCode');
			expect(found.botCode).to.equal("// Empty BotFile");
			expect(found).property('points');
			expect(found.points).to.equal(300);
			expect(found).property('shots');
			expect(found.shots).to.equal(3);
			expect(found).property('kills');
			expect(found.kills).to.equal(3);
			expect(found).property('friendlyKills');
			expect(found.friendlyKills).to.equal(0);
			expect(found).property('pickables');
			expect(found.pickables).to.have.deep.property('coins', 0);
			expect(found.pickables).to.have.deep.property('damages', 1);
			expect(found.pickables).to.have.deep.property('repairs', 2);
			expect(found.pickables).to.have.deep.property('shields', 3);
			expect(found).property('battles');
			expect(found.battles).to.equal(1);
			expect(found).property('wins');
			expect(found.wins).to.equal(1);
			expect(found).property('losses');
			expect(found.losses).to.equal(0);
			expect(found).property('fubarbundy');
			expect(found.fubarbundy).to.equal(0);
			done();
		});
    });

});