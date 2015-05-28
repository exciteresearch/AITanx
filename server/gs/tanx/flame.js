'use strict';

var Vec2 = require('./vec2');

var flameIds = 0;
var tmpVec = Vec2.new();


function Flame(owner) {
    this.deleted = false;

    this.owner = owner;
    this.id = ++flameIds;
    this.damage = 1.0;

    this.speed = 3;
    this.radius = 1.75;
    this.pos = Vec2.new(parseFloat(this.owner.pos[0].toFixed(3), 10), parseFloat(this.owner.pos[1].toFixed(3), 10));
    this.target = Vec2.new().setR((-this.owner.angle + 90) * (Math.PI / 180.0)).mulS((this.owner.range)/2/**ian edit: range**/).add(this.pos);

    this.target[0] = parseFloat(this.target[0].toFixed(3), 10);
    this.target[1] = parseFloat(this.target[1].toFixed(3), 10);
}


Flame.prototype.delete = function() {
    if (this.deleted)
        return;

    this.deleted = true;
    this.owner = null;
    this.ownerID=null;
    this.pos.delete();
    this.target.delete();
};


Flame.prototype.update = function() {
    if (this.deleted) return;

    tmpVec.setV(this.target).sub(this.pos).norm().mulS(this.speed/2).add(this.pos);
    if (! isNaN(tmpVec[0]))
        this.pos.setV(tmpVec);
};


Object.defineProperty(
    Flame.prototype,
    'data', {
        get: function() {
            var obj = {
                id: this.id,
                tank: this.owner.id,
                x: parseFloat(this.pos[0].toFixed(2), 10),
                y: parseFloat(this.pos[1].toFixed(2), 10),
                tx: parseFloat(this.target[0].toFixed(2), 10),
                ty: parseFloat(this.target[1].toFixed(2), 10),
                sp: parseFloat(this.speed.toFixed(1), 10)
            };

            return obj;
        },
        set: function() { }
    }
);


module.exports = Flame;
