'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('leaderBoard', {
        url: '/leaderBoard',
        controller: "LeaderBoardController",
        templateUrl: 'js/leaderBoard/leaderBoard.html'
        ,
        data: {
            authenticate: true
        }
    });
});

app.controller('LeaderBoardController', function ($scope, $stateParams, AuthService, LeaderBoardFactory, ChallengeFactory, BotCodeFactory) {
    
	if (!$scope.user) AuthService.getLoggedInUser().then(function (userLogged) {
        $scope.userLogged = userLogged;
    });

    if (!$scope.userRank) LeaderBoardFactory.getUserRank().then(function(users){
        $scope.userRank = users;
    });

    if (!$scope.botRank) LeaderBoardFactory.getBotRank().then(function(bots){
        $scope.botRank = bots;
    });

    $scope.currentRanking="tank";
	// //SCOPE METHODS

    $scope.setRanking=function(arg){
        $scope.currentRanking=arg;
    }
	$scope.challengeUser = function( user ) {
        
		if ($scope.userLogged._id !== user._id)
        ChallengeFactory.challengeUser( $scope.userLogged._id, 
        	{ challenged: user._id } );
    }
   
   $scope.forkBot = function( bot ) {
        BotCodeFactory.createForkedBot( $scope.userLogged._id, bot._id );
    }
  
});
