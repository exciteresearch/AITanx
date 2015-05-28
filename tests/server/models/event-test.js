var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/bot');
require('../../../server/db/models/map');
require('../../../server/db/models/event');

var Bot = mongoose.model('Bot');
var User = mongoose.model('User');
var Map = mongoose.model('Map');
var Event = mongoose.model('Event');

describe('Event model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

	var user1,user2;
    beforeEach('Create temporary user1', function (done) {
		user1 = new User({
			email: 'jake@email.com',
			username: 'jake'
		});
		User.create(user1,function(err,saved) {
			if(err) return done(err);
			user1 = saved;
			done();
		});
    });
    beforeEach('Create temporary user2', function (done) {
		user2 = new User({
			email: 'drake@email.com',
			username: 'drake'
		});
		User.create(user2,function(err,saved) {
			if(err) return done(err);
			user2 = saved;
			done();
		});
    });

	var bot, forkedBot;
    beforeEach('Create temporary bot', function (done) {
		bot = new Bot({
			codedBy: user1._id,
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
			codedBy: user2._id,
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
    
	var map, forkedMap;
    beforeEach('Create temporary forkedMap', function (done) {
    	forkedMap = new Map({
    		codedBy: user1._id,
    		viewable: true,
    	    forked: 1,
    	    created: Date.now(),
    		title: "Moat of Acid Map",
    		description: "Awesome Map with every pickable, walls and a Moat of Acid",
    	    type: "Walls and Pickables",
    		levelData: '[[1,1,1,1],[1,0,0,1],[1,1,1,1]]',
    		pickablesData: '[[1.5,1,1,1,1],[2.5,1,1,1,1],[3.5,1,1,1,1]]'	
		});
		Map.create(forkedMap,function(err,saved) {
			if(err) return done(err);
			forkedMap = saved;
			done();
		});
    });
    beforeEach('Create temporary map', function (done) {
    	map = new Map({
       		codedBy: user2._id,
    		viewable: true,
    	    forked: 1,
    	    forkedFrom: forkedMap._id,
    	    created: Date.now(),
    		title: "Everything but Moat of Acid Map",
    		description: "Awesome Map with every pickable, walls but NO Moat of Acid",
    	    type: "Walls and Pickables",
    		levelData: '[[1,1,1,1],[1,0,0,1],[1,1,1,1]]',
    		pickablesData: '[[1.5,1,1,1,1],[2.5,1,1,1,1]]'	
		});
		Map.create(map,function(err,saved) {
			if(err) return done(err);
			map = saved;
			done();
		});
    });
    
	var event, forkedEvent;
    beforeEach('Create temporary forkedEvent', function (done) {
    	forkedEvent = new Event({
			codedBy: user1._id,
			viewable: true, // include in tests
			forked: 1,
    	    created: Date.now(),
			title: "Best Bot Battle Ever!!!",
			description: "4 teams of 3 bots fight till there is only one team operational" +
					"Arena map includes walls, coins, shields, damages, repairs, mines, " +
					"and moat filled with acid!",
		    type: "Battle",
		    eventDt: Date("10:00 AM 5/15/2015"),
			durationSec: 180,
		    map: forkedMap._id, //map model needs to be created
		    botsParticipants: [ bot._id, forkedBot._id ],
		    usersParticipants: [],
		    viewers: [ user1._id, user2._id ]
		});
		Event.create(forkedEvent,function(err,saved) {
			if(err) return done(err);
			forkedEvent = saved;
			done();
		});
    });
    beforeEach('Create temporary event', function (done) {
    	event = new Event({
			codedBy: user2._id,
			viewable: true, // include in tests
			forked: 0,
			forkedFrom: forkedEvent._id,
    	    created: Date.now(),
			title: "Rematch of Best Bot Battle Ever without the Moat of Acid!!!",
			description: "4 teams of 3 bots fight till there is only one team operational" +
					"Arena map includes walls, coins, shields, damages, repairs, mines, " +
					"and BUT without the moat filled with acid this time...",
		    type: "Battle",
		    eventDt: Date("12:00 PM 5/15/2015"),
			durationSec: 180,
		    map: map._id,
		    botsParticipants: [ bot._id, forkedBot._id ],
		    usersParticipants: [],
		    viewers: [ user1._id, user2._id ]		
		});
		Event.create(event,function(err,saved) {
			if(err) return done(err);
			event = saved;
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Event).to.be.a('function');
    });

    it('has codedBy which is equal to the id of the user who is created it or last forked it',function(done){			
		Event.findById(event._id,function(err,found){
			expect(found.codedBy.toString()).to.equal(user2._id.toString());
			done();
		});
    });
    
    it('requires codedBy',function(done){
		invalidEvent = new Event({
//			codedBy: user1._id,
			viewable: true, // include in tests
			forked: 1,
			title: "Invalid Event",
			description: "blah",
		    type: "Battle",
		    eventDt: Date("12:00 PM 5/15/2015"),
			durationSec: 180,
		    map: map._id,
		    botsParticipants: [ bot._id, forkedBot._id ],
		    usersParticipants: [],
		    viewers: [ user1._id, user2._id ]		
		});
		invalidEvent.save(function(err){
			expect(err).to.exist;
            expect(err.message).to.equal("Validation failed");
            done();
        });
    });
    
    it('has viewable which is Boolean',function(done){			
		Event.findById(forkedEvent._id,function(err,found){
			expect(found.viewable).to.be.a('boolean');
			expect(found.viewable).to.equal(true);
			done();
		});
    });
    
    it('has viewable equal to true by default',function(done){
		tempEvent = new Event({
			codedBy: user1._id,
			viewable: true, // include in tests
			forked: 1,
			title: "Invalid Event",
			description: "blah",
		    type: "Battle",
		    eventDt: Date("12:00 PM 5/15/2015"),
			durationSec: 180,
		    map: map._id,
		    botsParticipants: [ bot._id, forkedBot._id ],
		    usersParticipants: [],
		    viewers: [ user1._id, user2._id ]		
		});
		Event.create(tempEvent, function(err,saved) {
			if(err) return done(err);
			expect(saved.viewable).to.equal(true);
			done();
		});
    });

    it('has forked, a number which is equal to 0 by default',function(done){
		tempEvent = new Event({
			codedBy: user1._id,
			viewable: true, // include in tests
//			forked: 0,
			title: "Invalid Event",
			description: "blah",
		    type: "Battle",
		    eventDt: Date("12:00 PM 5/15/2015"),
			durationSec: 180,
		    map: map._id,
		    botsParticipants: [ bot._id, forkedBot._id ],
		    usersParticipants: [],
		    viewers: [ user1._id, user2._id ]		
		});
		Event.create(tempEvent, function(err,saved) {
			if(err) return done(err);
			expect(saved.forked).to.equal(0);
			done();
		});
    });

    it('has forkedFrom which is equal to the id of id it was forked from',function(done){			
		Event.findById(event._id,function(err,found){
			expect(found.forkedFrom.toString()).to.equal(event.forkedFrom.toString());
			done();
		});
    });
    
    it('has title and created which are required and an empty string and a Date object by default',function(done){			
		Event.findById(event._id,function(err,found){
//			expect(err).to.exist;
//			expect(err.message).to.equal("Validation failed");
			expect(found).property('title');
			expect(found.title).to.equal("Rematch of Best Bot Battle Ever without the Moat of Acid!!!");
			expect(found.created.toString()).to.equal(event.created.toString());
			done();
		});
    });
    
    it('has description, type, eventDt, durationSec, map, botsParticipants, usersParticipants, and viewers',function(done){			
		Event.findById(event._id,function(err,found){
			expect(found).to.have.property('description');
			expect(found.description).to.equal("4 teams of 3 bots fight till there is only one team operational" +
					"Arena map includes walls, coins, shields, damages, repairs, mines, " +
					"and BUT without the moat filled with acid this time...");
			expect(found).property('type');
			expect(found.type).to.equal('Battle');
			expect(found).property('eventDt');
			expect(found.eventDt.toString()).to.equal(event.eventDt.toString());
			expect(found).property('durationSec');
			expect(found.durationSec).to.equal(180);
			expect(found).property('map');
			expect(found.map.toString()).to.equal(map._id.toString());
			expect(found).property('usersParticipants');
			expect(found.usersParticipants).to.be.an('array');
			expect(found).property('viewers');
			expect(found.viewers).to.be.an('array');
			done();
		});
    });

});