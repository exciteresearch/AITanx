





//ian edit: my, currently global, function library:

var randomDirection= function(unstickTime){
        movement=[Math.round(Math.random()*2-1),Math.round(Math.random()*2-1)]
        return movement;
    };  //creates a random direction for the tank to go towards

var logging=false;
var unstickTime=100;
var currentPlayer={
    currentPriority:0,
    shieldPriority:4,
    specialPriority:3,
    repairPriority:1,
    thisPriority:0,
    enemyPriority:6,
    coinPriority:5,
    movement:[0,0],
    hurt:-8,
    notHurt:-12,
    pathStep:0,
    turretAngle: 0
};
var opponentBot={
    currentPriority:0,
    shieldPriority:4,   //priority given to shield powerups
    specialPriority:3,  //priority given to damage powerups
    repairPriority:-12,  
    thisPriority:0,   
    enemyPriority:6, //priority given to enemy tanks
    coinPriority:5, //priority given to coin powerups
    movement:[0,0],
    shootNow: "left",
    lastCheckPoint:0,   
    hurt: 1,    //priority given to repair powerups  hurt
    notHurt:-12, //priority given to repair powerups when not hurt
    pathStep: 0,
    turretAngle: 0
};
//ian edit: end my library

pc.script.create("trigger", function (app) {

    var itemLoc=[];

    var zeroVec = pc.Vec3.ZERO;

    var Trigger = function (entity) {
        this.entity = entity;
    };
    
    Trigger.prototype = {
        
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this),
            this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
        },

        onTriggerEnter: function (entity) {
            var proximity=0;
            if(this.entity.name.includes("detection")){
                var arr=this.entity.name.split("")
                proximity=Number(arr[arr.length-1])
            }
            if (this.entity._parent.Owner!==null){
                var user= currentPlayer
            }else{
                var user= opponentBot
            }
            itemLoc = entity.getPosition();
            if (entity.name==="pickable-shield"){
                this.entity._parent.closest.shield=itemLoc;
                user.thisPriority=user.shieldPriority+proximity;
            }else if(entity.name==="pickable-repair"){
                this.entity._parent.closest.repair=itemLoc;
                user.thisPriority=user.repairPriority+proximity;
            }else if(entity.name==="pickable-damage"){
                this.entity._parent.closest.special=itemLoc;
                user.thisPriority=user.specialPriority+proximity;
            }
            else if(entity.name==="pickable-coin"){
                this.entity._parent.closest.coin=itemLoc;
                user.thisPriority=user.coinPriority+proximity;
            }
            else if(entity.name.includes("tank")){
                this.entity._parent.closest.tank=itemLoc;
                user.thisPriority=user.enemyPriority+proximity;
            }
            
            if (user.currentPriority < user.thisPriority){
                if (this.entity._parent.Owner!==null){
                }
                user.destinationX=Math.round(itemLoc.data[0]);
                user.destinationY=Math.round(itemLoc.data[2]);
                if(logging===true){console.log(this.entity._parent.name+" seeking "+entity.name+" at ["+Math.round(itemLoc.data[0])+","+Math.round(itemLoc.data[2])+"]")} //
                user.destinationX=Math.round(itemLoc.data[0]);
                user.destinationY=Math.round(itemLoc.data[2]);
                user.newPath=true;
                // user.destination=true;
                // this.entity.destination=true;
                user.currentPriority = user.thisPriority+proximity;
            }
        },
         onTriggerLeave: function (entity) {
            var proximity=0;
            if (this.entity._parent.Owner!==null){
                var user= currentPlayer
            }else{
                var user= opponentBot
            }
            itemLoc = entity.getPosition();
            if (entity.name==="pickable-shield"){

                this.entity._parent.closest.shield=itemLoc;
                user.thisPriority=user.shieldPriority+proximity;
            }else if(entity.name==="pickable-repair"){
                this.entity._parent.closest.repair=itemLoc;
                user.thisPriority=user.repairPriority+proximity;
            }else if(entity.name==="pickable-damage"){
                this.entity._parent.closest.special=itemLoc;
                user.thisPriority=user.specialPriority+proximity;
            }
            else if(entity.name==="pickable-coin"){
                this.entity._parent.closest.coin=itemLoc;
                user.thisPriority=user.coinPriority+proximity;
            }
            else if(entity.name.includes("tank")){
                this.entity._parent.closest.tank=itemLoc;
                user.thisPriority=user.enemyPriority+proximity;
            }
            if (user.currentPriority < user.thisPriority){
                if (this.entity._parent.Owner!==null){
                }
                if(logging===true){console.log(this.entity._parent.name+" seeking "+entity.name+" at ["+Math.round(itemLoc.data[0])+","+Math.round(itemLoc.data[2])+"]")} //
                user.destinationX=Math.round(itemLoc.data[0]);
                user.destinationY=Math.round(itemLoc.data[2]);
                user.newPath=true;
                // user.destination=true;
                // this.entity.destination=true;
                user.currentPriority = user.thisPriority;
            }
        }
    };

    return Trigger;
})