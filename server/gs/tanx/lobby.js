var Vec2 = require('./vec2');
var Room = require('./room');
var Pickable = require('./pickable');
var winningScore=30;
function Lobby() {
//    this.rooms = [ ];
	this.rooms = { };
}

Lobby.prototype.join = function(client) {
	
//    client.on('eventID', function(data) {
//        if (!! data ) {
//        	client.send('eventID',data);
//        }
//    });
	/*{ _uuid: '6c839c7d-ca76-452b-a27e-c461e8f5ea80',
  socket: 
   { _session: 
      { session_id: undefined,
        heartbeat_delay: 25000,
        disconnect_delay: 5000,
        prefix: '/socket',
        send_buffer: [],
        is_closing: false,
        readyState: 1,
        timeout_cb: [Function],
        to_tref: [Object],
        connection: [Circular],
        emit_open: null,
        recv: [Object] },
     id: '02ee63e9-208d-49ba-aea0-0a0b5fbec0ab',
     headers: 
      { host: '192.168.1.216:30043',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
        'accept-language': 'en-US,en;q=0.8' },
     prefix: '/socket',
     remoteAddress: '192.168.1.63',
     remotePort: 50171,
     address: { address: '192.168.1.216', family: 'IPv4', port: 30043 },
     url: '/socket/329/8v9dxjov/websocket',
     pathname: '/socket/329/8v9dxjov/websocket',
     protocol: 'websocket',
     _events: { close: [Function], error: [Function], data: [Function] } } } */
	
    var room = null;

    
    // assign to room with matching client.eventID or create a room with that eventID
    if(this.rooms[client.eventID]){
    	this.rooms[client.eventID].join(client);
    }
    else { 
        var room = new Room();
        room.on('update', Lobby.prototype.update);
        room.loop.start();

        // destroy
        var self = this;
        
        room.on('leave', function() {
            if (this.clients.length > 0)
                return;

            room.loop.stop();
            delete this.rooms[client.eventID];
        });
        
        this.rooms[client.eventID] = room;

        room.join(client);
    	
    }
    
    // old code which adds to the first room which is not full
//    for(var i = 0; i < this.rooms.length; i++) {
//    	// roomsize of 12 max
//        if (this.rooms[i].clients.length < 2) {
//            room = this.rooms[i];
//            break;
//        }
//    }
    
    // rooms none so create a new room
//    if (! room) {
//        room = new Room();
//        this.rooms.push(room);
//        room.on('update', Lobby.prototype.update);
//        room.loop.start();
//
//        // destroy
//        var self = this;
//        room.on('leave', function() {
//            if (this.clients.length > 0)
//                return;
//
//            room.loop.stop();
//            var ind = self.rooms.indexOf(room);
//            self.rooms.splice(ind, 1);
//        });
//    }

//    room.join(client);
};



// room update
Lobby.prototype.update = function() {
    var room = this;
    var now = Date.now();
    var self = this;
    var world = this.world;
    var winner = null;

    // game state to send
    var state = { };

    var o=0
        // respawn pickables
    for(o; o < this.pickables.length; o++) {
        var pickable = this.pickables[o];
        // if(pickable.owner===undefined&&pickable.item.deleted===true){console.log("test: ", (now - pickable.picked),  pickable.delay)}
        if (! pickable.item && (now - pickable.picked) > pickable.delay) {
            pickable.item = new Pickable({
                type: pickable.type,
                x: pickable.x,
                y: pickable.y,
                delay: 10000
            });
            pickable.item.ind = o;
            world.add('pickable', pickable.item);

            state.pickable = state.pickable || [ ];
            state.pickable.push(pickable.item.data);
        }
    }




    // for each tank
    world.forEach('tank', function(tank) {
        tank.update();

        if (! tank.dead) {
            // tank-tank collision
            world.forEachAround('tank', tank, function(tankOther) {
                if (tank === tankOther || tankOther.dead)
                    return;

                // check for collision
                var dist = tank.pos.dist(tankOther.pos);


                if (dist < tank.radius + tankOther.radius) {
                    // collided
                    Vec2.alpha
                    .setV(tank.pos)
                    .sub(tankOther.pos)
                    .norm()
                    .mulS(dist - (tank.radius + tankOther.radius));
                    // move apart
                    tank.pos.sub(Vec2.alpha);
                    tankOther.pos.add(Vec2.alpha);
                }
            });

            // tank-block collision
            world.forEachAround('block', tank, function(block) {

                var point = block.collideCircle(tank);
                if (point)
                    tank.pos.add(point);
            });

            // tank-pickable collision
            world.forEachAround('pickable', tank, function(pickable) {
                if (! pickable.collideCircle(tank))
                    return;

                switch(pickable.type) {
                    case 'repair':
                        // don't need repair
                        if (tank.hp == 10)
                            return;

                        // recover a bit
                        tank.hp = Math.min(10, tank.hp + 3);
                        break;
                    case 'damage':
                        // give 3 bullets
                        tank.bullets += 3;
                        break;
                    case 'shield':
                        // don't pickup if shield already full
                        if (tank.shield == 10)
                            return;
                        // set full shield
                        tank.shield = 10;
                        break;
                        //ian edit: scoring via coins and added mines
                    case 'coin':

                        tank.score++;
                        tank.team.score++;
                        // winner?
                        if (tank.team.score >= winningScore)
                            winner = tank.owner.team;
                        // total score
                        room.score++;
                        break;
                    case 'mine':
                        // damage tank
                        if(pickable.owner===tank.owner.id){
                            tank.mines++
                        }else{
                            var damage = 20; //ian edit: op mines

                            tank.tHit = now;

                            // if has shield
                            if (tank.shield) {
                                if (tank.shield > damage) {
                                    // enough to sustain whole damage
                                    tank.shield -= damage;
                                    damage = 0;
                                } else {
                                    // shielded only some damage
                                    damage -= tank.sheild;
                                    tank.shield = 0;
                                }
                            }

                            if (damage>0) {
                                tank.hp -= damage;
                                // killed, give point
                                if (tank.hp <= 0) {
                                    // add score
                                    // pickable.owner.score+=3;
                                    pickable.ownerTank.team.score+=3;
                                    // winner?
                                    if (pickable.ownerTank.team.score >= winningScore)
                                        winner = pickable.ownerTank.team;
                                    // total score
                                    room.score+=3;
                                    // bullet.owner.owner.send('point', 1);
                                    // remember killer
                                    tank.killer = pickable.owner;
                                    // respawn
                                    tank.respawn();
                                }
                            }
                            
                            break;
                        }
                    }
                        

                world.remove('pickable', pickable);

                state.pickableDelete = state.pickableDelete || [ ];
                state.pickableDelete.push({
                    id: pickable.id
                });
                
                self.pickables[pickable.ind].picked = Date.now();
                self.pickables[pickable.ind].item = null;
                console.log(self.pickables[pickable.ind])
                pickable.delete();
            });
        }

        // update in world
        tank.node.root.updateItem(tank);
        // ian edit: lay mine
        if (! tank.dead && tank.layingMine && ! tank.reloadingMines && tank.mines>0) {
            // new mine
            var now = Date.now();
            tank.tHit = now;
            tank.reloadingMines = true;
            tank.lastMine = now;
            // tank.mines--;
            var pickable = new Pickable({
                ownerTank: tank,
                owner: tank.owner.id,
                type: 'mine',
                x: tank.pos[0]-tank.movementDirection[0]*2,
                y: tank.pos[1]-tank.movementDirection[1]*2,
                picked:0
            });

            pickable.ind=o;

            world.add('pickable', pickable);
            state.pickable = state.pickable || [ ];
            state.pickable.push(pickable.data);
            self.pickables.push(pickable);
            o++;     

        }

        if (! tank.dead && tank.flaming && ! tank.reloadingFlame) {
            // new flame
            var flame = tank.flameOn();
            world.add('flame', flame);

            // publish
            state.flames = state.flames || [ ];
            state.flames.push(flame.data);
        }
        // shoot
        if (! tank.dead && tank.shooting && ! tank.reloading) {
            // new bullet
            var bullet = tank.shoot();
            world.add('bullet', bullet);

            // publish
            state.bullets = state.bullets || [ ];
            state.bullets.push(bullet.data);
        }

    });


   




    // for each bullet
    world.forEach('bullet', function(bullet) {
        // bullet update
        bullet.update();

        var deleting = false;
        if (bullet.pos.dist(bullet.target) < 1) {
            deleting = true;
        } else if (bullet.pos[0] <= 0 ||
                   bullet.pos[1] <= 0 ||
                   bullet.pos[0] >= world.width ||
                   bullet.pos[1] >= world.height) {
            deleting = true;
        } else {
            // for each tank around
            world.forEachAround('tank', bullet, function(tank) {
                
                // refuse tank if any of conditions not met
                if (deleting ||  // bullet already hit the target
                    tank.dead ||  // tank is dead
                    tank === bullet.owner ||  // own bullet
                    tank.team === bullet.owner.team || // friendly tank
                    now - tank.respawned <= 2000 ||  // tank just respawned
                    tank.pos.dist(bullet.pos) > (tank.radius + bullet.radius)) {  // no collision
                    return;
                }
                // hit
                bullet.hit = true;
                bullet.pos.setV(tank.pos);

                if (! bullet.owner.deleted) {
                    // damage tank
                    var damage = bullet.damage;

                    tank.tHit = now;

                    // if has shield
                    if (tank.shield) {
                        if (tank.shield > damage) {
                            // enough to sustain whole damage
                            tank.shield -= damage;
                            damage = 0;
                        } else {
                            // shielded only some damage
                            damage -= tank.shield;
                            tank.shield = 0;
                        }
                    }

                    if (damage) {
                        tank.hp -= damage;

                        // killed, give point
                        if (tank.hp <= 0) {
                            // add score
                            bullet.owner.score+=3;
                            bullet.owner.team.score+=3;
                            // winner?
                            if (bullet.owner.team.score >= winningScore)
                                winner = bullet.owner.team;
                            // total score
                            room.score++;
                            // bullet.owner.owner.send('point', 1);
                            // remember killer
                            tank.killer = bullet.owner.id;
                            // respawn
                            tank.respawn();
                        }
                    }
                }

                // bullet delete
                deleting = true;
                bullet.publish = true;
            }
            );

            if (! deleting) {
                // for each block around
                world.forEachAround('block', bullet, function(block) {
                    if (deleting)
                        return;

                    // collision with level block
                    var point = block.collideCircle(bullet);
                    if (point) {
                        bullet.pos.add(point);
                        bullet.publish = true;
                        deleting = true;
                    }
                });
            }
        }

        if (! deleting) {
            // update in world
            bullet.node.root.updateItem(bullet);

        } else {
            // delete bullet

            // publish
            if (bullet.publish) {
                state.bulletsDelete = state.bulletsDelete || [ ];

                state.bulletsDelete.push({
                    id: bullet.id,
                    x: parseFloat(bullet.pos[0].toFixed(2), 10),
                    y: parseFloat(bullet.pos[1].toFixed(2), 10)
                });
            }

            // remove from world
            world.remove('bullet', bullet);
            bullet.delete();
        }
    });
    // for each flame
    world.forEach('flame', function(flame) {
        
        // flame update
        flame.update();

        var deleting = false;
        if (flame.pos.dist(flame.target) < 1) {
            deleting = true;
        } else if (flame.pos[0] <= 0 ||
                   flame.pos[1] <= 0 ||
                   flame.pos[0] >= world.width ||
                   flame.pos[1] >= world.height) {
            deleting = true;
        } else {
            // for each tank around
            world.forEachAround('tank', flame, function(tank) {
                // refuse tank if any of conditions not met
                if (deleting ||  // flame already hit the target
                    tank.dead ||  // tank is dead
                    tank === flame.owner ||  // own flame
                    tank.team === flame.owner.team || // friendly tank
                    now - tank.respawned <= 2000 ||  // tank just respawned
                    tank.pos.dist(flame.pos) > (tank.radius + flame.radius)) {  // no collision
                    return;
                }
                // hit
                flame.hit = true;
                flame.pos.setV(tank.pos);

                if (! flame.owner.deleted) {
                    // damage tank
                    var damage = flame.damage;

                    tank.tHit = now;

                    // Flames penetrate shields:
                    // if (tank.shield) {
                    //     if (tank.shield > damage) {
                    //         // enough to sustain whole damage
                    //         tank.shield -= damage;
                    //         damage = 0;
                    //     } else {
                    //         // shielded only some damage
                    //         damage -= tank.sheild;
                    //         tank.shield = 0;
                    //     }
                    // }

                    if (damage) {
                        tank.hp -= damage;

                        // killed, give point
                        if (tank.hp <= 0) {
                            // add score
                            flame.owner.score+=3;
                            flame.owner.team.score+=3;
                            // winner?
                            if (flame.owner.team.score >= winningScore)
                                winner = flame.owner.team;
                            // total score
                            room.score++;
                            // flame.owner.owner.send('point', 1);
                            // remember killer
                            tank.killer = flame.owner.id;
                            // respawn
                            tank.respawn();
                        }
                    }
                }

                // flame delete
                deleting = true;
                flame.publish = true;
            }
            );

            if (! deleting) {
                // for each block around
                world.forEachAround('block', flame, function(block) {
                    if (deleting)
                        return;

                    // collision with level block
                    var point = block.collideCircle(flame);
                    if (point) {
                        flame.pos.add(point);
                        flame.publish = true;
                        deleting = true;
                    }
                });
            }
        }

        if (! deleting) {
            // update in world
            flame.node.root.updateItem(flame);

        } else {
            // delete flame

            // publish
            if (flame.publish) {
                state.flamesDelete = state.flamesDelete || [ ];

                state.flamesDelete.push({
                    id: flame.id,
                    x: parseFloat(flame.pos[0].toFixed(2), 10),
                    y: parseFloat(flame.pos[1].toFixed(2), 10)
                });
            }

            // remove from world
            world.remove('flame', flame);
            flame.delete();
        }
    });

    // winner?
    if (winner) {
        state.winner = {
            team: winner.id,
            scores: [ ]
        };

        // team scores
        for(var i = 0; i < 4; i++) {
            state.winner.scores[i] = this.teams[i].score;
            this.teams[i].score = 0;
        }

        // tanks scores
        world.forEach('tank', function(tank) {
            tank.score = 0;
            tank.scoreLast = -1;
            tank.killer = null;
            tank.respawn();
        });

        // room score
        room.score = 0;
        room.scoreLast = -1;
    }

    // for each tank
    world.forEach('tank', function(tank) {
        // state data
        state.tanks = state.tanks || [ ];

        // tank data
        var obj = {
            id: tank.id,
            x: parseFloat(tank.pos[0].toFixed(2), 10),
            y: parseFloat(tank.pos[1].toFixed(2), 10),
            a: Math.floor(tank.angle)
        };
        if (tank.owner.id===null){

            obj.opponentTank=true;
        }else{
            obj.opponentTank=false;
        }
        if (tank.dead) { // dead
            obj.dead = true;
            // killer
            if (tank.killer !== undefined) {
                obj.killer = tank.killer;
                tank.killer = undefined;
            }
        } else { // alive
            // hp
            obj.hp = parseFloat(tank.hp.toFixed(2), 10);
            // shield
            if (tank.shield)
                obj.sp = tank.shield;
        }

        // score
        if (tank.scoreLast !== tank.score) {
            tank.scoreLast = tank.score;
            obj.s = tank.score;
        }

        // add to state
        state.tanks.push(obj);
    });

    // teams score
    if (room.score !== room.scoreLast) {
        room.scoreLast = room.score;

        state.teams = [ ];
        for(var i = 0; i < 4; i++)
            state.teams[i] = this.teams[i].score;
    }

    // publish data
    this.publish('update', state);
};


module.exports = Lobby;
