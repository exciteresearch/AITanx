app.factory('BotFightFactory', function ($scope) {
    return {
        simBot: function (bot) {
    		$scope.$emit('simulate', $scope.bot);
        },

        competeBot: function (bot) {
        }

    };
});
