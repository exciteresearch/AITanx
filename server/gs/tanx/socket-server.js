var EventEmitter = require('events').EventEmitter;
var sockjs = require('sockjs');


// var ws = require('ws');


var Client = require('./socket-client');


function Server(args) {
    EventEmitter.call(this);
    args = args || { };
    
    //console.log("Server args",args);
    /*Server args { http: 
   { domain: null,
     _events: 
      { connection: [Function: connectionListener],
        clientError: [Function],
        listening: [Object] },
     _maxListeners: 10,
     _connections: 0,
     connections: [Getter/Setter],
     _handle: null,
     _usingSlaves: false,
     _slaves: [],
     allowHalfOpen: true,
     httpAllowHalfOpen: false,
     timeout: 120000 },
  prefix: '/socket' } */

    // args.verifyClient = function() {
    //     TODO DJ could hold state here
    //     add session stuff
    //     so it can be restored and reused
    // };

    this.socket = sockjs.createServer({
        log: function(level, msg) {
            if (level !== 'error')
                return;

            console.log("this.socket msg",msg);
        }
    });
    this.socket.installHandlers(args.http, {
        prefix: args.prefix || ''
    });

    this.socket.on('connection', this._onconnection.bind(this));
}
Server.prototype = Object.create(EventEmitter.prototype);


Server.prototype._onconnection = function(socket) {
	//console.log("Server _onconnection",socket);
    this.emit('connection', new Client(socket));
};


/*
 * Server _onconnection { _session: 
{ session_id: undefined,
 heartbeat_delay: 25000,
 disconnect_delay: 5000,
 prefix: '/socket',
 send_buffer: [],
 is_closing: false,
 readyState: 1,
 timeout_cb: [Function],
 to_tref: 
  { _idleTimeout: 25000,
    _idlePrev: [Object],
    _idleNext: [Object],
    _idleStart: 1431880644987,
    _onTimeout: [Function],
    _repeat: false },
 connection: [Circular],
 emit_open: null,
 recv: 
  { ws: [Object],
    connection: [Object],
    thingy: [Object],
    thingy_end_cb: [Function],
    session: [Circular] } },
id: '20563b89-71ff-4990-882a-c3464669c508',
headers: 
{ host: '192.168.1.216:30043',
 'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
 'accept-language': 'en-US,en;q=0.8' },
prefix: '/socket',
remoteAddress: '192.168.1.63',
remotePort: 49929,
address: { address: '192.168.1.216', family: 'IPv4', port: 30043 },
url: '/socket/211/xfhpye_o/websocket',
pathname: '/socket/211/xfhpye_o/websocket',
protocol: 'websocket' }
 */


module.exports = Server;
