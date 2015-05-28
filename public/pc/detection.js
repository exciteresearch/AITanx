
pc.script.create("trigger", function (app) {

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
            if (this.entity._parent._parent._parent.Owner!==null){
                var user= currentPlayer

            }else{
                var user= opponentBot

            }
            // Reset back to roughly the position the entity started in.
            if(this.entity.name=="gun-sight"){

                if(entity.name.includes("tank")){
                user.shootNow= true;
                user.flameNow=true;
                }
            }
            if (this.entity.name=="right-detection"&&entity.name.includes("tank")){
                user.shootNow="right"
            }
            if (this.entity.name=="left-detection"&&entity.name.includes("tank")){
                user.shootNow="left"
            }
        },
         onTriggerLeave: function (entity) {
            if (this.entity._parent.Owner!==null){
                var user= currentPlayer
            }else{
                var user= opponentBot
            }
            if (this.entity.name=="gun-sight"){
                if(entity.name.includes("tank")){
                    user.shootNow= false;
                    user.flameNow=false;
                }
            }
        }
    };

    return Trigger;
})