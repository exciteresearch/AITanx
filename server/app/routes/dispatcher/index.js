'use strict';
var fs = require('fs');
var path = require('path');
// remove the next two lines and you will get an error 'Router.use() requires middleware function but got a Obj'
var router = require('express').Router();
var _ = require("lodash");
var bodyParser = require("body-parser");
var User = require('mongoose').model('User');
var Bot = require('mongoose').model('Bot');

module.exports = router;


router.post('/createBlankBot/:userid', function(req, res, next) {
	var obj = {
		codedBy: req.params.userid,
		botCode: "//BlankBot " + new Date(),
		botname:"BlankBot"
	};
	
	Bot.create(obj, function(err,bot) {
		if (err) return next(err);
		console.log('createBlankBot bot',bot);
		res.send(bot);    
	});
});

router.post('/createForkedBot/:id', function(req, res, next) {
	
	var obj = {
		codedBy: req.params.id
	};

	 Bot.findById(req.body.botID, function(err,robotForked) {
		if (err) return next(err);
		obj.botCode = robotForked.botCode;
		obj.botname = robotForked.botname+"_FORK";
		Bot.create(obj, function(err,robot) {
			if (err) return next(err);
			res.send(robot);    
		});    
	});
});

router.post('/editBot', function(req, res, next) {
	//TODO if req.body.userId same as session.userId then allow for editBot
	console.log('editBot userId',req.body.userId,'botId',req.body.botId);
	Bot.findById(req.body.botId, function(err,editBot) {
		if (err) return next(err);
		res.send(editBot);    
	});
});



// TODO user login/register, 
//	assign session id, 
//	authenticate user for 
//	repository of botCode(s) which have an edit icon, 
//	edit loads botCode into codeEditor <= router.get('/readFile'
	
router.get('/readFile', function (req, res, next) {
//	console.log('/readFile req.query',req.query);
	var botID = req.query.botOneID;
//	console.log('/readFile botID',botID);
	Bot.findById(botID, function(err, found){
        if (err) return next(err);
//        console.log('/readFile found',found);
		res.send(found);
		next();
	});
});

//TODO save botCode from codeEditor to MongoDB <= router.get('/saveFile'
//send back confirmation of successful save
//if not save then cannot modal to alert changes not saved before any action

router.post('/saveFile', function(req, res, next) {
	Bot.findById(req.body.bot._id, function(err,found) {
		if (err) return next(err);
		found.botCode = req.body.bot.botCode;
		found.botname = req.body.bot.botname;
		found.save(function (err,saved) {
		    if (err) return next(err);
		    res.send(saved);
		    next();
		});
	});
});

//TODO launch simulation

router.get('/practice', function (req, res) {
	body = req.body;
	Bot.save({ _id: botID }, function(err, found){
      if (err) return next(err);		
		res.send(found);
	});
});

//TODO launch compete

router.get('/compete', function (req, res) {

});

//Experimental SSE code below

var openConnections = [];

router.get('/', function (req, res) {
//	console.log("sse openned ip:"+ req.socket.remoteAddress + ":" + req.socket.remotePort );
    req.socket.setTimeout(Infinity);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
 
    openConnections.push(res);

    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] === res) {
                toRemove =j;
                break;
            }
        }
    	console.log("sse disconnected " + j + " ip:"+ req.socket.remoteAddress + ":" + req.socket.remotePort );
        openConnections.splice(j,1);
        console.log("sse openConnections ",openConnections.length);
    });
    
});
    
	var createMsg = function (type,connection) {
	    return { 
	    	type: type,
	    	dt: new Date(), 
	    	connection: connection || false
	    };
	};
	
	setInterval(function() {
	    openConnections.forEach(function(response,index) {
	        var msg = createMsg('heartbeat',index) ; 
	        response.write('data: ' + JSON.stringify(msg) + '\n\n'); // Note the extra newline
	        console.log("sse connection",index,"msg",msg);
	    });
	}, 15000);



//an open connection can have multiple subscriptions
//every subscription is a registered emmitter
//a registered emmitter can be emmitted during an event
//emmit to allow appropriate subscribers to refresh an iframe

//create an sse server on a specific port, require sse library is very old.

//var SSE = require("sse")
//, express = require('express')
////, sseApp = express.createServer(); // express.createServer() depricated
//, sseApp = express();
//
////sseApp.use(express.static(__dirname + '/public'));
//sseApp.use(express.static(__dirname + '/app/routes/dispatcher'));
//
//var sse = new SSE(sseApp);
//sse.on('connection', function(client) {
//	var id = setInterval(function() {
//		client.send(JSON.stringify(process.memoryUsage()));
//	}, 100);
//	console.log('started client interval');
//	client.on('close', function() {
//		console.log('stopping client interval');
//		clearInterval(id);
//	})
//});
//
//sseApp.listen(1337);