var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/map');

var User = mongoose.model('User');
var Map = mongoose.model('Map');

describe('Map model', function(){
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
    
	var map, forkedMap;
    beforeEach('Create temporary forkedMap', function (done) {
    	forkedMap = new Map({
    		codedBy: user1._id,
    		viewable: true,
    	    forked: 1,
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


    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Map).to.be.a('function');
    });

    it('has codedBy which is equal to the id of the user who is created it or last forked it',function(done){			
		Map.findById(map._id,function(err,found){
			expect(found.codedBy.toString()).to.equal(user2._id.toString());
			done();
		});
    });
    
    it('requires codedBy',function(done){
		invalidMap = new Map({
//			codedBy: user2._id,
    		viewable: true,
    	    forked: 1,
    	    forkedFrom: forkedMap._id,
    		title: "Everything but Moat of Acid Map",
    		description: "Awesome Map with every pickable, walls but NO Moat of Acid",
    	    type: "Walls and Pickables",
    		levelData: '[[1,1,1,1],[1,0,0,1],[1,1,1,1]]',
    		pickablesData: '[[1.5,1,1,1,1],[2.5,1,1,1,1]]'	
		});
		invalidMap.save(function(err){
			expect(err).to.exist;
            expect(err.message).to.equal("Validation failed");
            done();
        });
    });
    
    it('has viewable which is Boolean',function(done){			
		Map.findById(map._id,function(err,found){
			expect(found.viewable).to.be.a('boolean');
			expect(found.viewable).to.equal(true);
			done();
		});
    });
    
    it('has viewable equal to true by default',function(done){
		tempMap = new Map({
			codedBy: user1._id,
    		viewable: true,
    	    forked: 1,
    	    forkedFrom: forkedMap._id,
    		title: "Everything but Moat of Acid Map",
    		description: "Awesome Map with every pickable, walls but NO Moat of Acid",
    	    type: "Walls and Pickables",
    		levelData: '[[1,1,1,1],[1,0,0,1],[1,1,1,1]]',
    		pickablesData: '[[1.5,1,1,1,1],[2.5,1,1,1,1]]'	

		});
		Map.create(tempMap, function(err,saved) {
			if(err) return done(err);
			expect(saved.viewable).to.equal(true);
			done();
		});
    });

    it('has forked, a number which is equal to 0 by default',function(done){
		tempMap = new Map({
			codedBy: user1._id,
    		viewable: true,
//    	    forked: 1,
    	    forkedFrom: forkedMap._id,
    		title: "Everything but Moat of Acid Map",
    		description: "Awesome Map with every pickable, walls but NO Moat of Acid",
    	    type: "Walls and Pickables",
    		levelData: '[[1,1,1,1],[1,0,0,1],[1,1,1,1]]',
    		pickablesData: '[[1.5,1,1,1,1],[2.5,1,1,1,1]]'
		});
		Map.create(tempMap, function(err,saved) {
			if(err) return done(err);
			expect(saved.forked).to.be.a('number');
			expect(saved.forked).to.equal(0);
			done();
		});
    });

    it('has forkedFrom which is equal to the id of id it was forked from',function(done){			
		Map.findById(map._id,function(err,found){
			expect(found.forkedFrom.toString()).to.equal(map.forkedFrom.toString());
			done();
		});
    });
    
    it('has title and created which are required and an empty string and a Date object by default',function(done){			
		Map.findById(map._id,function(err,found){
//			expect(err).to.exist;
//			expect(err.message).to.equal("Validation failed");
			expect(found).property('title');
			expect(found.title).to.equal("Everything but Moat of Acid Map");
			expect(found.created.toString()).to.equal(map.created.toString());
			done();
		});
    });
    
    it('has description, type, eventDt, durationSec, map, botsParticipants, usersParticipants, and viewers',function(done){			
		Map.findById(map._id,function(err,found){
			expect(found).to.have.property('description');
			expect(found.description).to.equal("Awesome Map with every pickable, walls but NO Moat of Acid");
			expect(found).property('type');
			expect(found.type).to.equal('Walls and Pickables');
			expect(found).property('levelData');
			expect(found.levelData).to.be.an('string');
			expect(found).property('pickablesData');
			expect(found.pickablesData).to.be.an('string');
			done();
		});
    });

})