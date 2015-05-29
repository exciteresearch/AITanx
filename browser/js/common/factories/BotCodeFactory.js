app.factory('BotCodeFactory', function ($http,$state) {
    return {
        getBot: function (bot) {
        	
            var queryParams = {
            		botOneID: bot
            };
            
            if (!bot) {
            	console.log("no bot");
                return;
            }
            
            return $http.get('/api/dispatcher/readFile/', {
                params: queryParams
            }).then(function (response) {
            	//return to controller
                return response.data;
            });
        },

        saveBot: function (bot) {
        	var data; //data packet to send
        	data = { bot: bot };
            return $http.post('/api/dispatcher/saveFile/', data).then(function(res) {
            	return res.data;
              }, function(err) {
                  throw new Error(err);
              });  
        },

        createBlankBot: function ( user_ID ) {
            console.log('createBlankBot user_ID',user_ID);
            return $http.post('/api/dispatcher/createBlankBot/'+user_ID)
            .then(function(res) {
            	$state.go('editBot',{ 'defaultBotID': res.data._id });
              }, function(err) {
                  throw new Error(err);
              });  
        },
        
        editBot: function (userId, botId) {
        	
            return $http.post('/api/dispatcher/editBot/', { userId: userId, botId: botId} ) //no params, just query, why not body?
            .then(function(res) {
            	$state.go('editBot',{ 'defaultBotID': res.data._id });
              }, function(err) {
                  throw new Error(err);
              });  
        },

        createForkedBot: function (user_ID, bot_ID) {
          
            return $http.post('/api/dispatcher/createForkedBot/'+user_ID, { botID : bot_ID} )
            .then(function(res) {
            	$state.go('forkBotToEditor',{ 'defaultBotID': res.data._id });
              }, function(err) {
                  throw new Error(err);
              });  
        },
        
        compete: function (bot){
        	if (!!bot){
//        		console.log("got to learderboard with bot",bot._id)
        		$state.go('eventsWithBot',{ 'defaultBotID': bot._id });
        	} else {
//        		console.log("got to learderboard without a bot")
        		$state.go('events');
        	}
        }

    };
});
