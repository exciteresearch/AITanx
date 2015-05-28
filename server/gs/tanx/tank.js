var Vec2 = require('./vec2');
var color = require('./color');
var Bullet = require('./bullet');
var Flame = require('./flame');
var Mine = require('./mine');

var tankIds = 0;


function Tank(client) {
    /* This allows us to change the dimensions and other
    stats of the tank, no visual change */
    this.deleted = false;

    this.id = ++tankIds;
    this.owner = client;
    client.tank = this;
    // this.hue = Math.floor(Math.random() * 360);

    this.radius = .75;
    this.movementOne=Math.round(Math.random()*2-1);
    this.movementTwo=Math.round(Math.random()*2-1);

    this.scoreLast = 0;
    this.score = 0;

    this.pos = Vec2.new(0, 0);
    this.movementDirection = Vec2.new();

    this.speed = 0.3;
    this.range = 16.0;

    this.tHit = 0;
    this.tRecover = 0;

    this.hp = 10.0;
    this.shield = 0;
    this.bullets = 0;
    this.flames = 0;
    this.mines=3;

    this.shooting = false;
    this.flaming = false;
    this.layingMine=false;
    this.lastShot = 0;
    this.lastFlame = 0;
    this.reloading = false;
    this.reloadingFlame = false;
    this.reloadingMines= false;
    this.lastMine=0;

    this.killer = null;
    this.died = Date.now();
    this.dead = true;
    this.respawned = Date.now();

    this.angle = Math.random() * 360;
}


Tank.prototype.delete = function() {
    this.deleted = true;

    this.pos.delete();
    this.movementDirection.delete();
    this.owner = null;
};


// ian edit: 
 // Tank Enhancements: 

 // 1): Recoil: 
var recoil=function(initial){

    if(initial.angle>45 && initial.angle < 135){
        initial.pos[0]=initial.pos[0]-1
    }
    if(initial.angle<-45 && initial.angle > -135){
        initial.pos[0]=initial.pos[0]+1
    }
    if(initial.angle<45 && initial.angle > -45){
        initial.pos[1]=initial.pos[1]-1
    }
    if(initial.angle > 135 || initial.angle < -135){
        initial.pos[1]=initial.pos[1]+1
    }
    return initial;
}

var enhancements=[];
Tank.prototype.shoot = function() {

    //
    // { '0': -1.1102230246251565e-16, '1': 1.4142135381698608 } downleft
    // { '0': 1.1102230246251565e-16, '1': -1.4142135381698608 } upright
    // { '0': -1.4142135381698608, '1': -1.1102230246251565e-16 } upleft
    // { '0': 0.7071067690849304, '1': 0.7071067690849304 } down
    // { '0': -0.7071067690849304, '1': -0.7071067690849304 } up
    // { '0': -0.7071067690849304, '1': 0.7071067690849304 } left
    // { '0': 0.7071067690849304, '1': -0.7071067690849304 } right


    for(var i=0; i<enhancements.length; i++){
        var here=enhancements[i]
        here(this);
    }

        // recoil(this)

    if (this.deleted || this.dead) return;

    var now = Date.now();
    this.tHit = now;
    this.reloading = true;
    this.lastShot = now;
    var bullet = new Bullet(this);
    if (this.bullets > 0) {
        this.bullets--;
        bullet.special = true;
        bullet.damage += 2;
        bullet.speed += .2;
    }
    return bullet;
};
Tank.prototype.flameOn = function() {

    if (this.deleted || this.dead) return;

    var now = Date.now();
    this.tHit = now;
    this.reloadingFlame = true;
    this.lastFlame = now;
    var flame = new Flame(this);
    return flame;
};

// Tank.prototype.layMine = function() {

//     if (this.deleted || this.dead) return;

//     var now = Date.now();
//     this.tHit = now;
//     this.reloadingMines = true;
//     this.lastMine = now;
// };

Tank.prototype.respawn = function() {
    if (this.deleted || this.dead) return;

    this.dead = true;
    this.died = Date.now();
};


Tank.prototype.update = function() {
    if (this.deleted) return;

    var now = Date.now();

    if (! this.dead) {
        // movement
        if (this.movementDirection.len())
                
            this.pos.add(Vec2.alpha.setV(this.movementDirection).norm().mulS(this.speed));

        // reloading
        if (this.reloading && now - this.lastShot > 100){
            this.reloading = false;
        }
        if (this.reloadingFlame && now - this.lastFlame > 50){
            this.reloadingFlame = false;
        }
        if (this.reloadingMines && now - this.lastMine > 5000){
            this.reloadingMines = false;
        }

        // auto recover
        if (this.hp < 10 && now - this.tHit > 10000 && now - this.tRecover > 2000) {
            this.hp = Math.min(this.hp + 1, 10);
            this.tRecover = now;
        }
    } else {
        // dead
        if (now - this.died > 500) { //ian edit: op mines
            this.dead = false;
            this.hp = 10;
            this.shield = 0;
            this.mines = 3;
            this.bullets = 0;
            this.respawned = now;
            this.pos.setXY(2.5 + ((this.team.id % 2) * 35) + Math.floor(Math.random() * 9), 2.5 + (Math.floor(this.team.id / 2) * 35) + Math.floor(Math.random() * 9));
        }
    }
};


Object.defineProperty(
    Tank.prototype,
    'data', {
        get: function() {
            return {
                id: this.id,
                team: this.team.id,
                owner: this.owner.id,
                pos: [ parseFloat(this.pos[0].toFixed(3), 10), parseFloat(this.pos[1].toFixed(3), 10) ],
                angle: Math.floor(this.angle),
                hp: this.hp,
                shield: this.shield,
                dead: this.dead,
                score: this.score
            };
        },
        set: function() { }
    }
);

module.exports = Tank;
