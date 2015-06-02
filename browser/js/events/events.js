'use strict';
app.config(function ($stateProvider) {
    $stateProvider
    .state('events', {
        url: '/events',
        controller: "EventsController",
        templateUrl: 'js/events/events.html'
        ,
        data: {
            authenticate: true
        }
    })
    .state('eventsWithBot',{
    	url: '/events/:defaultBotID',
        controller: "EventsController",
        templateUrl: 'js/events/events.html'
        ,
        data: {
            authenticate: true
        }
    });
});

app.controller('mainEventCtrl',function($scope, $stateParams){
	$scope.showSelectBotModal=false;
    $scope.directEventID = "";
	$scope.botOneID = "";
	$scope.eventsObj = {};
	$scope.$on('refreshEventObj',function(event, data){
		$scope.eventsObj = data;
	});
});

app.controller('LaunchBotModalCtrl', function ($rootScope, $scope, $stateParams, AuthService, BotCodeFactory, UserProfileFactory) {
        
	if (!$scope.user) AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        //get bots by user._id only
        UserProfileFactory.getBotList( user._id ).then(function(bots){
        	if ( bots.length >= 1 ) {
        		$scope.botList = bots;
        	} else {
    			//TODO if there are no bots user must create one... redirect to editor?
        	}
        });
    });
    
    // if bot._id is undefined then showSelectBotModal === hideSelectBotModal if bot._id !== undefined

	// //SCOPE METHODS
    $scope.selectBot = function( bot ) {
    	$scope.$parent.botOneID = bot._id;
    	$rootScope.eventLaunched = true;
    	$scope.$parent.showSelectBotModal = false;
    };
    
});

app.controller('PlayCanvasEventsCtrl',function($rootScope,$scope,$sce){
	 //playCanvas URL can be changed to anything including:
	 // FullStackBots: /pc/index.html ,
	 // FSB: http://playcanv.as/p/bbMQlNMt?server=fsb,
	 // Tanx: http://playcanv.as/p/aP0oxhUr ,
	 // Voyager: http://playcanv.as/p/MmS7rx1i ,
	 // Swoop: http://playcanv.as/p/JtL2iqIH ,
	 // Hack: http://playcanv.as/p/KRE8VnRm 
		
	// trustAsResourceUrl can be highly insecure if you do not filter for secure URLs
	// it compounds the security risk of malicious code injection from the Code Editor
	
	if($rootScope.eventLaunched){
		$scope.$parent.showSelectBotModal=false;
    	$scope.playCanvasURL = $sce.trustAsResourceUrl('/pc/index.html?server=fsb'
			+'&eventID='+$scope.$parent.directEventID
			+"&botOneID="+$scope.$parent.botOneID
            +"&userID="+$scope.$parent.user._id
		);
     }
});


app.controller('EventsController', function ($rootScope, $scope, $stateParams, AuthService, ChallengeFactory, EventsFactory) {

    $scope.data = {
        specs: "",
        slots: 1,
        createEvent: false
    };

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

    $scope.$parent.botOneID = $stateParams.defaultBotID;

    $rootScope.eventLaunched = false;
    $scope.waiting = false;
    if (!$scope.pendingEvents) EventsFactory.getPendingEvents().then(function(events){
        $scope.pendingEvents = events;
    });

    //TODO
	// if (!$scope.liveEvents) EventsFactory.getLiveEvents().then(function(events){
	// 	$scope.liveEvents = events;
	// });
    
    $scope.liveEvents = [];
    $scope.currentEvent="arena";
    
    if (!$scope.challenges) ChallengeFactory.getChallenges().then(function(challenges){
        $scope.challenges = challenges;
    });
    
    $scope.setCurrentEvent=function(arg){
        $scope.currentEvent=arg;
    };
	
	// //SCOPE METHODS
    $scope.createNewChallenge = function() {
        //TODO
    };

    $scope.createNewEvent = function() {
        
        var newEvent = {
            createdBy: $scope.user._id,
            specs: $scope.data.specs,
            slots: $scope.data.slots
        }

        EventsFactory.createEvent( newEvent )
        .then( function ( event )
            {
                $scope.pendingEvents.push(event);
                $scope.data.createEvent = false;
                $scope.data.specs = "";
                $scope.data.slots = 1;
            });
    };

    $scope.deleteEvent = function( index ) {
        EventsFactory.deleteEvent( $scope.pendingEvents[index] )
        .then( function (event)
            {
                $scope.pendingEvents.splice(index, 1);
            });
    };


    $scope.joinEvent = function( index ) {
    	$scope.$parent.directEventID = $scope.pendingEvents[index]._id;
    	$scope.$parent.showSelectBotModal = true;
    };

});

