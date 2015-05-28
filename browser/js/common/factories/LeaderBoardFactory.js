app.factory('LeaderBoardFactory', function ($http) {

    return {

        getUserRank: function () {

            return $http.get('/api/leaderBoard/getUserRank').then(function (response) {
                return response.data;
            });
            
        },

        getBotRank: function () {

            return $http.get('/api/leaderBoard/getBotRank').then(function (response) {
                return response.data;
            });
            
        }
    };
});
