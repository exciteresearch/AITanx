'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('userProfile', {
        url: '/userProfile',
        controller: "UserProfileController",
        templateUrl: 'js/userProfile/userProfile.html'
        ,
        data: {
            authenticate: true
        }
    });
});

app.controller('UserProfileController', function ($scope, $stateParams, AuthService, BotCodeFactory, UserProfileFactory, ChallengeFactory) {
    $scope.profileEvent= "bots";
    if (!$scope.user) AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        ChallengeFactory.getUserChallenges( user._id ).then(function(challenges){
            $scope.userChallenges = challenges;
        });

        UserProfileFactory.getBotList( user._id ).then(function(bots){
            $scope.botList = bots;
        });
    });


	// //SCOPE METHODS
    $scope.setProfileEvent=function(arg){
        $scope.profileEvent=arg;
    }
    
    $scope.acceptChallenge = function( index ) {
        ChallengeFactory.acceptChallenge( $scope.challenges[index] );
    }
     
    $scope.editBot = function( bot ) {
    	BotCodeFactory.editBot( $scope.user._id, bot._id );
    }
     
    $scope.deleteBot = function( bot ) {
        UserProfileFactory.deleteBot( bot ).then(function( bot ){
            UserProfileFactory.getBotList( user._id ).then(function(bots){
                $scope.botList = bots;
            });
        });
    }    
  
});
