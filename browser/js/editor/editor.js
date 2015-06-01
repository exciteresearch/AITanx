'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('editor', {
        url: '/editor',
        templateUrl: 'js/editor/editor.html'
    })
    .state('editBot',{
    	url: '/editor/:defaultBotID',
        controller: "CodeEditorCtrl",
        templateUrl: 'js/editor/editor.html'
        ,
        data: {
            authenticate: true
        }
    })
    .state('forkBotToEditor',{
    	url: '/editor/:defaultBotID',
        controller: "CodeEditorCtrl",
        templateUrl: 'js/editor/editor.html'
        ,
        data: {
            authenticate: true
        }
    });
//    console.log("defaultBotID",defaultBotID);
});

app.controller('mainEditorCtrl',function($scope, $stateParams){
	
	$scope.editorOn=false;
	
	$scope.editorToggle = function(){		
		console.log('toggle $scope.editorOn is',$scope.editorOn);
		if($scope.editorOn === true){
			$scope.editorOn=false;
		} 
		else {
			$scope.editorOn=true;
		}
		console.log('toggle $scope.editorOn is now',$scope.editorOn);
	};
	
	$scope.eventsObj = {};
	
	$scope.$on('refreshEventObj',function(event, data){
		console.log('refreshEventObj end $scope.editorOn',$scope.editorOn);
		$scope.eventsObj = data;
		console.log('refreshEventObj end $scope.editorOn',$scope.editorOn);
	});
});

app.controller('SelectBotModalCtrl', function ($scope, $stateParams, AuthService, BotCodeFactory, UserProfileFactory) {
    
    if (!$scope.user ) AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        //get bots by user._id only
        UserProfileFactory.getBotList( user._id ).then(function(bots){
        	if ( bots.length >= 1 ) {
        		$scope.botList = bots;
        	} else {
    			BotCodeFactory.createBlankBot($scope.user._id).then(function(bot){
    				$scope.botList = [ bot ];
    			});
        	}
        });
    });
    
    // if bot._id is undefined then showSelectBotModal === hideSelectBotModal if bot._id !== undefined

	// //SCOPE METHODS
    $scope.selectBot = function( bot ) {
		BotCodeFactory.editBot($scope.user._id, bot._id ).then(function(bot){
			$scope.bot = bot;
			$scope.editorOn=true;
		});
    };
    
    $scope.createBlankBot = function() {
		BotCodeFactory.createBlankBot($scope.user._id).then(function(bot){
			$scope.bot = bot;
			$scope.editorOn=true;
		});
    };
    
});

app.controller('PlayCanvasEditorCtrl',function($scope, $stateParams, $sce, uuid4){
	$scope.optionsActivated=false;
	$scope.simLaunched = false;
	
	$scope.actions = $scope.options = {
		shots:{
			active:false,
			text:"Shots",
			value: 0
		},
		accuracy:{
			active:false,
			text:"Accuracy",
			value: null
		},
		mines:{
			active:false,
			text:"Mines Layed",
			value: 0
		},
		minesTripped:{
			active:false,
			text:"Mines Tripped",
			value: 0
		},
		coins:{
			active:false,
			text:"Coins",
			value: 0
		},
		kills:{
			active:false,
			text:"Kills",
			value: 0
		},
		deaths:{
			active:false,
			text:"Deaths",
			value: 0
		},
	};
	
    $scope.$on('simulate',function(event, bot) {
		console.log('simulate end $scope.editorOn',$scope.editorOn);

    	if(!bot._id) {
        	$scope.simLaunched = false;
        }
        else {
        	var eventID = uuid4.generate();
        	$scope.$emit('refreshEventObj', { 
        		eventID: eventID,
        		botOneID: bot._id
			});
        	$scope.playCanvasURL = $sce.trustAsResourceUrl('/pc/index.html?server=fsb'
				+'&eventID='+eventID
				+"&botOneID="+bot._id
				+"&userID="+bot.codedBy
			);
        	$scope.simLaunched = true;
        }
		console.log('simulate end $scope.editorOn',$scope.editorOn);
    });
});

app.controller('CodeEditorCtrl',function($scope, $stateParams, BotCodeFactory, AuthService){

	if (!$scope.user) AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });
	
	$scope.bot = $scope.bot || {};
	
	//Could also be a Panel of Tabs, TODO upon selection or forking of a bot
	if ($stateParams.defaultBotID !== undefined){
		BotCodeFactory.getBot($stateParams.defaultBotID).then(function(bot){
			$scope.bot = bot;
			$scope.editorOn=true;
		});
	}	
	
	$scope.saveBot = function(){
		BotCodeFactory.saveBot($scope.bot);
	};
	
	$scope.simBot = function(){
		console.log('simBot() start $scope.editorOn',$scope.editorOn);
		BotCodeFactory.saveBot($scope.bot);
		console.log('simBot() middle $scope.editorOn',$scope.editorOn);
		$scope.$emit('simulate', $scope.bot);
		console.log('simBot() end $scope.editorOn',$scope.editorOn);
	};
	
	// ui.ace start
	$scope.aceLoaded = function(_editor) {
		// Options
		_editor.setReadOnly(false);
	};
	$scope.aceChanged = function(e) {
		//
	};
	
	$scope.compete = function(){
//		console.log("fire compete")
		BotCodeFactory.compete($scope.bot);
	};
	

});

app.controller('CodeConsoleCtrl',function($scope){
	//Code output, console logs, errors etc.
	
});

app.controller('ButtonsCtrl',function($scope){
	//Practice and/or Compete
	
});
