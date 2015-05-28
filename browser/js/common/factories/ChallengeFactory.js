app.factory('ChallengeFactory', function ($http) {

    return {

        getUserChallenges: function ( id ) {

            return $http.get('/api/members/challenge/'+id).then(function (response) {
                return response.data;
            });
            
        },

        getChallenges: function () {

            return $http.get('/api/members/challenge').then(function (response) {
                return response.data;
            });
            
        },

        challengeUser: function ( id, user_challenged ) {
            console.log("ChallengeFactory");
            return $http.post('/api/members/challenge/'+id, user_challenged ).then(function (response) {
                return response.data;
            });
            
        },

        acceptChallenge: function ( challenge ) {

            return $http.put('/api/members/challenge/'+challenge._id, event )
            .then(function (response) {
                return response.data;
            });

        }
    };
});
