app.factory('UserProfileFactory', function ($http) {

    return {

        getBotList: function ( id ) {

            return $http.get('/api/members/getBotList/'+id).then(function (response) {
                return response.data;
            });
            
        },

        deleteBot: function ( bot ) {

            return $http.delete('/api/members/deleteBot/'+bot._id ).then(function (response) {
                return response.data;
            });

        }
    }
});
