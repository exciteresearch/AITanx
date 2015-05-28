app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'RegisterCtrl'
    });

});

app.controller('RegisterCtrl', function ($scope, AuthService, $state) {

    $scope.error = null;
    $scope.registerInfo = {};

    //SCOPE METHODS
    $scope.registerUser = function (registerInfo) {
        
        //console.log("AuthService.signUp called", registerInfo);
        $scope.error = null;

        AuthService.signUp(registerInfo).then(function () {
            //console.log("AuthService.signUp returned");
            $state.go('events');
        }).catch(function () {
            $scope.error = 'Invalid signUp credentials.';
        });

    };



});