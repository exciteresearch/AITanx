'use strict';

var Vec2 = require('./vec2');

var mineIds = 0;
var tmpVec = Vec2.new();


function Mine(owner) {
    this.deleted = false;

    this.owner = owner;
    this.id = ++mineIds;
    this.damage = 6.0;

    this.speed = 0;
    this.radius = 1;
    this.pos = this.owner.pos

    //Vec2.new(parseFloat(this.owner.pos[0].toFixed(3), 10), parseFloat(this.owner.pos[1].toFixed(3), 10));
    // this.target = Vec2.new().setR((-this.owner.angle + 90) * (Math.PI / 180.0)).mulS(this.owner.range).add(this.pos);

    // this.target[0] = parseFloat(this.target[0].toFixed(3), 10);
    // this.target[1] = parseFloat(this.target[1].toFixed(3), 10);
}


Mine.prototype.delete = function() {
    if (this.deleted)
        return;

    this.deleted = true;
    this.owner = null;
    this.pos.delete();
    this.target.delete();
};


Mine.prototype.update = function() {
    if (this.deleted) return;

    // tmpVec.setV(this.target).sub(this.pos).norm().mulS(this.speed).add(this.pos);
    // if (! isNaN(tmpVec[0]))
    //     this.pos.setV(tmpVec);
};


Object.defineProperty(
    Mine.prototype,
    'data', {
        get: function() {
            var obj = {
                id: this.id,
                tank: this.owner.id,
                x: this.pos[0],//parseFloat(this.pos[0].toFixed(2), 10),
                y: this.pos[1] //parseFloat(this.pos[1].toFixed(2), 10),
                // tx: parseFloat(this.target[0].toFixed(2), 10),
                // ty: parseFloat(this.target[1].toFixed(2), 10),
                // sp: parseFloat(this.speed.toFixed(4), 10)
            };

            // if (this.special)
            //     obj.s = true;

            return obj;
        },
        set: function() { }
    }
);


module.exports = Mine;
