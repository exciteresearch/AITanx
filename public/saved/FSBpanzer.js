pc.script.create('FSBpanzer', function (app) {
    // Creates a new FSBpanzer instance
    var FSBpanzer = function (entity) {
        this.entity = entity;
    };

    FSBpanzer.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.bullets = 200;
        },

        takeAction: function(){
            
            // based on app.root.state for example it should decide de next step
            console.log("Action Takken!!");
            this.entity.script.client.shoot(true);
        }
    };

    return FSBpanzer;
});