pc.script.create('flames', function (context) {
    var vecTmp = new pc.Vec3();
    var matSpecial = null;
    var matDefault = null;
    
    var Flames = function (entity) {
        this.entity = entity;
    };

    Flames.prototype = {
        initialize: function () {
            this.tanks = context.root.findByName('tanks');
            this.flame = context.root.findByName('flame');
            this.flame.enabled = false;
            
            this.flames = context.root.findByName('flames');
            matDefault = this.flame.model.material;
            this.active = [ ];
            this.pool = [ ];
            this.index = { };
            this.length = 0;
        },

        new: function(data) {
            var self = this;
            
            if (this.pool.length === 0) {
                var before = this.length;
                // extend pool
                this.length += 16;
                
                for(var i = 0; i < this.length - before; i++) {
                    var flame = this.flame.clone();
                    
                    // destroy when flame has finished its life
                    flame.on('finish', function() {
                        self.delete({ id: this.id });
                    });
                    
                    this.flames.addChild(flame);
                    
                    // add to pool
                    this.pool.push(flame);
                }
            }
            
            var tank = this.tanks.findByName('tank_' + data.tank);
            if (! tank) return;
            
            // get flame from pool
            var flame = this.pool.pop();
            this.active.push(flame);
            flame.script.flame.finished = false;
            
            // attach ID
            flame.id = data.id;
            
            // index
            this.index[data.id] = flame;
            
            // clear minimap data
            flame.lastX = undefined;
            flame.lastZ = undefined;

            // offset
            vecTmp.set(0, 0, 1);
            tank.script.tank.head.getRotation().transformVector(vecTmp, vecTmp);
            vecTmp.normalize().scale(0.5);
            
            flame.setPosition(tank.getPosition().x + vecTmp.x, 0.9, tank.getPosition().z + vecTmp.z);
            flame.targetPosition = new pc.Vec3(data.tx, 0.9, data.ty);
            flame.speed = data.sp * 50 * 0.5;
            
            // material and scale if special
            
                flame.model.material = matDefault;
                flame.setLocalScale(.9, .9, .9);
            
            flame.enabled = true;
            flame.audiosource.pitch = Math.random() * .5 + .9;
            flame.audiosource.play('shoot');
        },
        
        finish: function(data) {
            var flame = this.index[data.id];
            if (! flame) return;
            flame.script.flame.finish();
        },
        
        delete: function(args) {
            var flame = this.index[args.id];
            if (! flame) return;
            
            // fire particles
            var i = Math.floor(Math.random() * 2 + 1);
            while(i--) {
                context.root.getChildren()[0].script.fires.new({
                    x: args.x + (Math.random() - 0.5) * 2,
                    z: args.y + (Math.random() - 0.5) * 2,
                    size: Math.random() * 1 + 1,
                    life: Math.floor(Math.random() * 50 + 200)
                });
            }
            
            // remove from index
            delete this.index[args.id];

            // disable
            flame.audiosource.stop();
            flame.enabled = false;
            
            // push to pool back
            this.pool.push(flame);
            
            var ind = this.active.indexOf(flame);
            if (ind !== -1)
                this.active.splice(ind, 1);
        }
    };

    return Flames;
});