app.factory('EventsFactory', function ($http) {

    return {

        getPendingEvents: function () {

            return $http.get('/api/members/pending').then(function (response) {
                return response.data;
            });
            
        },

        getLiveEvents: function () {

            return $http.get('/api/members/live').then(function (response) {
                return response.data;
            });
            
        },

        createEvent: function ( event ) {
            return $http.post('/api/members/', event ).then(function (response) {
                return response.data;
            });

        },

        joinEvent: function ( event ) {

            return $http.put('/api/members/'+event._id, event ).then(function (response) {
                return response.data;
            });

        },

        deleteEvent: function ( event ) {

            return $http.delete('/api/members/'+event._id ).then(function (response) {
                return response.data;
            });

        }
    };
});