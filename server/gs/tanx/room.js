var EventEmitter = require('events').EventEmitter;
var Loop = require('./loop');
var World = require('./world');
var Block = require('./block');
var Tank = require('./tank');
var Bullet = require('./bullet');
var Flame = require('./flame');
var uuid = require('node-uuid');
var userScript="original";


function Room() {

    EventEmitter.call(this);

    this.id = uuid.v4();
    this.clients = [ ];

    this.world = new World({
        width: 48,  // map width
        height: 48, //map height	
        clusterSize: 4, //clusterSize ? is it number of teams ? not tanks ?
        indexes: [ 'tank', 'bullet', 'pickable', 'block', 'flame' ]
    });

    this.score = 0;
    this.scoreLast = 0;
    this.teams = [ ];


    /*Makes each team, gives them individaul Ids, 
    and starts them with no points or tanks */
    for(var i = 0; i < 4; i++) {
        this.teams.push({
            id: i,
            score: 0,
            tanks: 0
        });
    }

    this.level = [
        /*This creates the phisycal, albiet invisible walls of the
        world. There are two pairs of numbers, the first determine
        the location of a wall being built and the second pair
        determine its dimensions.  The first number of each pair 
        uses the top left to bottom right axis. In the second pair 
        of numbers the numbers are dimensions, one being width the 
        other being the length of the wall, both expanding from the 
        first pair of number's location.*/


        [ 13.5, 2, 1, 4 ],
        [ 13.5, 12, 1, 2 ],
        [ 12.5, 13.5, 3, 1 ],
        [ 2, 13.5, 4, 1 ],
        [ 11.5, 15, 1, 2 ],
        [ 11.5, 23.5, 1, 5 ],

        [ 10, 26.5, 4, 1 ],
        [ 6, 26.5, 4, 1 ],

        [ 2, 34.5, 4, 1 ],
        [ 12.5, 34.5, 3, 1 ],
        [ 13.5, 36, 1, 2 ],
        [ 15, 36.5, 2, 1 ],
        [ 13.5, 46, 1, 4 ],

        [ 23.5, 36.5, 5, 1 ],
        [ 26.5, 38, 1, 4 ],
        [ 26.5, 42, 1, 4 ],

        [ 34.5, 46, 1, 4 ],
        [ 34.5, 36, 1, 2 ],
        [ 35.5, 34.5, 3, 1 ],
        [ 36.5, 33, 1, 2 ],
        [ 46, 34.5, 4, 1 ],

        [ 36.5, 24.5, 1, 5 ],
        [ 38, 21.5, 4, 1 ],
        [ 42, 21.5, 4, 1 ],

        [ 46, 13.5, 4, 1 ],
        [ 35.5, 13.5, 3, 1 ],
        [ 34.5, 12, 1, 2 ],
        [ 33, 11.5, 2, 1 ],
        [ 34.5, 2, 1, 4 ],

        [ 24.5, 11.5, 5, 1 ],
        [ 21.5, 10, 1, 4 ],
        [ 21.5, 6, 1, 4 ],

        // center
        [ 18.5, 22, 1, 6 ],
        [ 19, 18.5, 2, 1 ],
        [ 26, 18.5, 6, 1 ],
        [ 29.5, 19, 1, 2 ],
        [ 29.5, 26, 1, 6 ],
        [ 29, 29.5, 2, 1 ],
        [ 22, 29.5, 6, 1 ],
        [ 18.5, 29, 1, 2 ]
    ];

    // x, y, type, delay, lastSpawn
    this.pickables = [
        {
            x: 23.5,
            y: 9.5,
            type: 'repair',
            item: null,
            delay: 5000,
            picked: 0
        }, {
            x: 38.5,
            y: 23.5,
            type: 'repair',
            item: null,
            delay: 5000,
            picked: 0
        }, {
            x: 24.5,
            y: 38.5,
            type: 'repair',
            item: null,
            delay: 5000,
            picked: 0
        }, {
            x: 9.5,
            y: 24.5,
            type: 'repair',
            item: null,
            delay: 5000,
            picked: 0
        }, {
            x: 13.5,
            y: 15.5,
            type: 'damage',
            item: null,
            delay: 10000,
            picked: 0
        }, {
            x: 32.5,
            y: 13.5,
            type: 'damage',
            item: null,
            delay: 10000,
            picked: 0
        }, {
            x: 34.5,
            y: 32.5,
            type: 'damage',
            item: null,
            delay: 10000,
            picked: 0
        }, {
            x: 15.5,
            y: 34.5,
            type: 'damage',
            item: null,
            delay: 10000,
            picked: 0
        }, {
            x: 24,
            y: 24,
            type: 'shield',
            item: null,
            delay: 50000,
            picked: 0
        }, {
            x: Math.random()*12,
            y: Math.random()*12,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 22+Math.random()*5,
            y: Math.random()*10,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 35+Math.random()*12,
            y: Math.random()*12,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 37+Math.random()*10,
            y: 22+Math.random()*5,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 19+Math.random()*10,
            y: 19+Math.random()*10,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: Math.random()*10,
            y: 21+Math.random()*5,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: Math.random()*12,
            y: 35+Math.random()*12,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 21+Math.random()*5,
            y: 37+Math.random()*10,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }, {
            x: 35+Math.random()*12,
            y: 35+Math.random()*12,
            type: 'coin',
            item: null,
            delay: 30000,
            picked: 0
        }
    ];

    this.createBlocks(this.level);

    this.loop = new Loop({
    	//ups is update? 20 milliseconds? this === tick
        ups: 20
    });

    var self = this;
    this.loop.on('tick', function() {
        self.emit('update');
    });
}
Room.prototype = Object.create(EventEmitter.prototype);


Room.prototype.createBlocks = function(data) {

    for(var i = 0; i < data.length; i++) {
        this.world.add('block', new Block({
            x: data[i][0],
            y: data[i][1],
            width: data[i][2],
            height: data[i][3]
        }));
    }
};


Room.prototype.pickWeakestTeam = function() {

	// DJ may need to update to make selectable teams also at present only weakest by number of tanks
    var list = this.teams.filter(function(item) {
        return item.tanks < 4;
    });

    // sort asc by number of tanks and then score - DJ this is where we can "remember" team for schools or selected team battles
    list.sort(function(a, b) {
        var t = a.tanks - b.tanks;
        if (t === 0) {
            return a.score - b.score;
        } else {
            return t;
        }
    });

    // get list of same candidates
    list = list.filter(function(item) {
        return item.tanks === list[0].tanks && item.score === list[0].score;
    });

    // pick random
    return list[Math.floor(list.length * Math.random())];
};


Room.prototype.join = function(client) {

	// DJ and Miguel this is where we can add a new tank if we want more than one tank per client
    if (this.clients.indexOf(client) !== -1)
        return;

    var room = this;

    this.clients.push(client);
    var self = this;
    client.on('disconnect', function() {
        self.leave(client);
    });

    var tank = new Tank(client);


    this.world.add('tank', tank);

    tank.team = this.pickWeakestTeam(); //DJ first time random then by weaskest team
    tank.team.tanks++;


    // movement
    client.on('move', function(data) {
        if (data &&
            data instanceof Array &&
            data.length == 2 &&
            typeof(data[0]) == 'number' &&
            typeof(data[1]) == 'number') {

            tank.movementDirection.setV(data);
        }
    });

    // targeting
    client.on('target', function(angle) {
        if (angle && typeof(angle) == 'number')
            tank.angle = angle;
    });
    

    // shooting
    client.on('shoot', function(state) {
        tank.shooting = state;
    });

    //flaming
    client.on('flameOn', function(state) {
        tank.flaming = state;
    });
        // laying mines
    client.on('layMine', function(state) {
        tank.layingMine = state;
    });


    client.on('user.name', function(text) {
        client.userScript=userScript;
        client.userScript=text;
        if (/^([a-z0-9\-_]){4,8}$/i.test(text)) {
            client.name = text;


            room.publish('user.name', {
                id: client.id,
                name: text
            });
        }
    });

    // user.add
    // DJ and Miguel look into this it might be helpful for creating an event/battle
    this.publish('user.add', {
        id: client.id,
        name: 'Your Tank'
    });

    // user.sync
    // DJ and Miguel look into this it might be helpful for creating an event/battle
    var users = [ ];
    for(var i = 0; i < this.clients.length; i++) {
        users.push({
            id: this.clients[i].id,
            name: this.clients[i].name || 'Your Tank'

        });
    }
    client.send('user.sync', users);

    // send other tanks
    this.world.forEach('tank', function(tank) {
        if (tank.owner === client)
            return;
    });



    //ian edit: attempt to make tank opponent with 1 client:
    var opponentTank= new Tank(client.opponent);
    this.world.add('tank', opponentTank);
    opponentTank.team = this.pickWeakestTeam();
    opponentTank.team.tanks++;
    client.on('opponent.move', function(data) {
        if (data &&
            data instanceof Array &&
            data.length == 2 &&
            typeof(data[0]) == 'number' &&
            typeof(data[1]) == 'number') {

            opponentTank.movementDirection.setV(data);
        }
    });
    client.on('opponent.target', function(angle) {
        if (angle && typeof(angle) == 'number')
            opponentTank.angle = angle;
    });
    client.on('opponent.shoot', function(state) {
        opponentTank.shooting = state;
    });
    client.on('opponent.flameOn', function(state) {
        opponentTank.flaming = state;
    });
    client.on('opponent.layMine', function(state) {
        opponentTank.layingMine = state;
    });
    client.on('opponent.user.name', function(text) {
        client.opponent.userScript=userScript;
        client.opponent.userScript=text;
        if (/^([a-z0-9\-_]){4,8}$/i.test(text)) {
            client.opponent.name = text;


            room.publish('opponent.user.name', {
                id: client.opponent.id,
                name: text
            });
        }
    });

    // user.add
    this.publish('opponent.user.add', {
        id: client.opponent.id,
        name: 'opponentTank'
    });


/////////////////////////////////////////////////////////

    // teams
    // DJ and Miguel look into this it might be helpful for creating an event/battle
    var teams = [ ];
    for(var i = 0; i < 4; i++)
        teams[i] = this.teams[i].score;

    // pickables
    var pickables = [ ];
    this.world.forEach('pickable', function(pickable) {
        pickables.push(pickable.data);
    });

    // send data
    // DJ and Miguel look into this it might be helpful for creating an event/battle
    client.send('update', {
        teams: teams,
        pickable: pickables
    });

    // publish new tank
    // DJ and Miguel look into this it might be helpful for creating an event/battle

    this.publish('tank.new', tank.data);
    
    // publish new opponentTank
    this.publish('opponentTank.new', opponentTank.data);

    // event
    // DJ Miguel Ian what does this do?
    this.emit('join');
};


Room.prototype.leave = function(client) {
    var ind = this.clients.indexOf(client);

    if (ind === -1)
        return;

    this.clients.splice(ind, 1);

    client.tank.team.tanks--;
    client.opponent.tank.team.tanks--;

    this.publish('tank.delete', {
        id: client.tank.id
    });

    this.world.remove('tank', client.tank);
    this.world.remove('tank', client.opponent.tank);
    client.tank.delete();
    client.opponent.tank.delete();
    // event
    this.emit('leave');

    // user remove
    this.publish('user.remove', {
        id: client.id
    });
};


Room.prototype.forEach = function(fn) {
    this.clients.forEach(fn);
};


Room.prototype.publish = function(name, data) {
    var raw = null;
    for (var i = 0; i < this.clients.length; i++) {
        if (! raw) {
            raw = this.clients[i].send(name, data);
        } else {
            this.clients[i].sendRaw(raw);
        }
    }
};


module.exports = Room;
