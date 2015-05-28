
var tankPosition=[0,0,0];
var z=0;
var p=0;
var opponentTankPosition=[0,0,0];
pc.script.create('tanks', function (context) {
        
    var Tanks = function (entity) {
        this.entity = entity;
        this.ind = 0;
    };

    Tanks.prototype = {
        initialize: function () {
            this.tank = context.root.findByName('tank');
            this.tank.enabled = false;
            // this.tank.findByName('light').enabled = false;
            
            this.tanks = context.root.findByName('tanks');
            this.client = context.root.getChildren()[0].script.client;
            this.camera = context.root.findByName('camera');
            this.minimap = context.root.getChildren()[0].script.minimap;
            this.teams = context.root.getChildren()[0].script.teams;
            // this.hpBar = context.root.getChildren()[0].script.hp;

            
            // this.own = null;
            // this.opp = null;
        },
        
        new: function(args) {
            var newTank = this.tank.clone();
            newTank.setName('tank_' + args.id);
            newTank.owner=args.owner;
            newTank.Owner=args.owner;
            newTank.closest={};
            newTank.currentPriority={};
            newTank.enabled = true;
            newTank.setPosition(args.pos[0], 0, args.pos[1], 0);
            newTank.rotate(0, Math.random() * 360, 0);
            
            if(newTank.owner=null){
                newTank.opponentIsTrue=true;
            }
            this.teams.tankAdd(newTank.script.tank, args.team);
            console.log("args.owner",args.owner)
            if (args.owner == this.client.id) {
                this.camera.script.link.link = newTank;
                // if(p===0){
                //     this.opp = newTank;
                //     p++
                // }else{
                    this.own= newTank;
                // }
            }else{
                console.log("newTank",newTank)
                this.opp=newTank;
            }
            
            this.tanks.addChild(newTank);
        },
        
        delete: function(args) {
            var tank = this.tanks.findByName('tank_' + args.id);
            if (! tank) return;
            
            tank.fire('destroy');
            tank.destroy();
        },
        
        updateData: function(data) {
            for(var i = 0; i < data.length; i++) {
                if(data[i].opponentTank===false){
                    var tankData = data[i];
                    
                    var tank = this.tanks.findByName('tank_' + tankData.id);
                    if (! tank) continue;
                    tank = tank.script.tank;

                    // movement
                    if (tankData.hasOwnProperty('x'))
                        tank.moveTo([ tankData.x, tankData.y ]);
                    
                    // targeting
                    if (! tank.own && tankData.hasOwnProperty('a'))
                        tank.targeting(tankData.a);
                    //ian edit: gravitate to repairs    
                    if(tank.name.innerText="Your Tank"){
                       tankPosition=tank.entity.position.data 
                    }else {
                       opponentTankPosition=tank.entity.position.data 
                    }

                    // hp
                    if (tankData.hasOwnProperty('hp'))
                        tank.setHP(tankData.hp);
                    
                    // shield
                    tank.setSP(tankData.sp || 0);

                    // killer
                    if (tank.own && tankData.hasOwnProperty('killer')||tank.own && tankData.hasOwnProperty('killer')) {
                        // find killer
                        tank.killer = this.tanks.findByName('tank_' + tankData.killer);
                    }

                    
                    // dead/alive
                    tank.setDead(tankData.dead || false);
                    
                    // score
                    // if (tank.own && tankData.hasOwnProperty('s'))
                        // this.hpBar.setScore(tankData.s);
                }else{
                    var tankData = data[i];
                    
                    var tank = this.tanks.findByName('tank_' + tankData.id);
                    if (! tank) continue;
                    tank = tank.script.tank;

                    // movement
                    if (tankData.hasOwnProperty('x'))
                        tank.moveTo([ tankData.x, tankData.y ]);
                    
                    // targeting
                    if (! tank.own && tankData.hasOwnProperty('a'))
                        tank.targeting(tankData.a);
                    //ian edit: gravitate to pickables    
                       opponentTankPosition=tank.entity.position.data 
                    // hp
                    if (tankData.hasOwnProperty('hp'))
                        tank.setHP(tankData.hp);
                    
                    // shield
                    tank.setSP(tankData.sp || 0);

                    // killer
                    if (tank.own && tankData.hasOwnProperty('killer')||tank.own && tankData.hasOwnProperty('killer')) {
                        // find killer
                        tank.killer = this.tanks.findByName('tank_' + tankData.killer);
                    }
                    // dead/alive
                    tank.setDead(tankData.dead || false);
                }       
            }
            
            this.minimap.draw();
        }
    };

    return Tanks;
});