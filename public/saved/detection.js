var shootNow= false;

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
            var detedtedEntity=entity.name.split()
            // Reset back to roughly the position the entity started in.
            if(this.entity.name=="gun-sight"){
                if(entity.name.includes("tank")){

                shootNow= true;
                }
            }
            if (this.entity.name=="right-detection"&&entity.name.includes("tank")){
                shootNow="right"
            }
            if (this.entity.name=="left-detection"&&entity.name.includes("tank")){
                shootNow="left"
            }

        },
         onTriggerLeave: function (entity) {
            if (this.entity.name=="gun-sight"){
                shootNow= false;
            }
            
        }
    };

    return Trigger;
})





