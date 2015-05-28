'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('SideMenuCtrl',function($scope){
	//Chat, Repo, FAQ. etc
	
});

app.controller('msgCtrl',function($scope) {
    if (typeof(EventSource) !== "undefined") {
    	
        // Yes! Server-sent events support!
        var source = new EventSource('/api/dispatcher/');
        source.onopen = function(event) {
        	console.log("open",event);
        };
        // creat an eventHandler for when a message is received
        source.onmessage = function(event) {
        	  console.log('messaage data:',event.data);
        	  $scope.msg = JSON.parse(event.data);
//            $scope.$apply();
//            console.log($scope.msg);
        };
        source.onerror = function(event) {
        	console.log("error",event);
        };
    } else {
	    // Sorry! No server-sent events support..
	    console.log('SSE not supported by browser.');
	}
});