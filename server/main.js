'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
    require('./io')(server); // Attach socket.io, AFTER server.on('request',app);
};

var startServer = function () {

    var PORT = process.env.PORT || 1337; //1337

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error('Initialization error:', chalk.red(err.message));
    console.error('Process terminating . . .');
    process.kill(1);
});

// DJ and Migeul, fully integrate the fsb and gs "fsi-gameserverIntegration-#49"
// Sloppy integration of GameServer (successful) [does not account for use of games other than tanx]
// refactoring and mergin gs GamesServer into FSB socket/lobby code below
// npm install socket-server --save (successful) need test
// npm install sockjs --save (successful) need test
// npm install node-uuid --save (successful) need test
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    console.log('uncaughtException',err.stack);
});

//http
var http = require('http');
var gameServer = http.createServer();
var port = parseInt(process.env.TANX_PORT || '30043', 10) || 30043;
var host = process.env.TANX_HOST || '0.0.0.0';
gameServer.listen(port, host, function () {
    var host = gameServer.address();
    console.log('Tanx GameServer Listening on %s:%s', host.address, host.port);
});


// socket
//var WebSocketServer = require('./modules/socket-server');
var WebSocketServer = require('./gs/tanx/socket-server');
var ws = new WebSocketServer({
    http: gameServer,
    prefix: '/socket'
});


// lobby
//var Lobby = require('./modules/lobby');
var Lobby = require('./gs/tanx/lobby');
var lobby = new Lobby();


// socket connection
ws.on('connection', function(client) {
	
	console.log("client.id",client.id);
    client.send('init', {
        id: client.id,
    });
    
    client.on('eventID', function(data) {    	
        if (!! data ) {
        	client.eventID = data;
        	client.send('eventID',data);
        	lobby.join(client);
        }
    });

    client.on('userID', function(data) {       
        if (!! data ) {
            client.userID = data;
            console.log('userID attached to the client socket: ',data);
        }
    });    
    
//    lobby.join(client);
});