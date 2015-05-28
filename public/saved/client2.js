pc.script.create('client2', function (app) {
    // Creates a new Client2 instance
    var Client2 = function (entity) {
        this.entity = entity;
    };

    Client2.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Client2;
});