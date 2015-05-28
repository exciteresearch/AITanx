/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Bot = mongoose.model('Bot');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var seedUsers = function () {
	
    var users = [
                 {
                     email: 'dj@exciteresearch.com',
                     password: 'admin',
                     username: "admin"
                 },
                 {
                     email: 'ian@fsb.com',
                     password: 'admin',
                     username: "admin"
                 },
                 {
                     email: 'miguel@fsb.com',
                     password: 'admin',
                     username: "admin"
                 },
         {
             email: 'gwb@gmail.com',
             password: 'pass',
             username: "GWB"
         },
        {
            email: 'obama@gmail.com',
            password: 'pass',
            username: "POTUS"
        }
    ];

    return q.invoke(User, 'create', users);

};

var seedBots = function () {

var userIDs= [];
return User.findOne({email:'dj@exciteresearch.com'}).exec()
.then(function(user) {
    userIDs.push(user._id);
    return userIDs;
})
.then(function(userIDs) {
    return User.findOne({email:'ian@fsb.com'}).exec()
})
.then(function(user) {
    userIDs.push(user._id);
    return userIDs;
})
.then(function(userIDs) {
    return User.findOne({email:'miguel@fsb.com'}).exec()
})
.then(function(user) {
    userIDs.push(user._id);
    return userIDs;
})
.then(function(userIDs) {
    return User.findOne({email:'gwb@gmail.com'}).exec()
})
.then(function(user) {
    userIDs.push(user._id);
    return userIDs;
})
.then(function(userIDs) {
    return User.findOne({email:'obama@gmail.com'}).exec()
})
.then(function(user) {
    userIDs.push(user._id);
    return userIDs;
})
.then(function(userIDs){
    var bots = [
                {
                	codedBy: userIDs[0],
                	botname: "Blank Tank",
                	botCode: "//BlankTank 12:43PM 5/23/2015\r\n\r\n"
                },
                {
                	codedBy: userIDs[1],
                	botname: "Tank Ex Machina",
                	botCode: "//Tank Ex Machina 12:43PM 5/23/2015\r\n" +
                			"//Tank IA hunts down opponents, targets and shoots bullets " +
                			"from a distance, or flames them from up close, and will " +
                			"navigate to pick up double damages if they are detected\r\n" +
                 			"\r\n"+
                 			"//Tank AI wanders around getting pickables and shoots constantly with a rotating turret and it targets opponents hen it finds them.\r\n\r\nif(this.unstick>0){\n    this.unstick--\n}else{\n    if(stuck()){\n        wander();\n        console.log(\"stuck\")\n        currentPlayer.currentPriority=1;\n    }else{\n        if (completedPath()){\n           currentPlayer.destination=false;\n           l=0;\n           currentPlayer.currentPriority=0;\n        }\n        if(currentPlayer.destination===true&&myPath.length>0){\n            direction=followPath();\n        }\n        if(direction[0]===0 && direction[1]===0){\n            direction=randomDirection();\n        }\n    }\n}  \nif(currentPlayer.shootNow===\"right\"){\n    currentPlayer.turretAngle=turnTurret(-3)\n}else if(currentPlayer.shootNow===\"left\"){\n    currentPlayer.turretAngle=turnTurret(3)\n}else if(currentPlayer.shootNow===true || currentPlayer.shootNow===false){\n    tankDoThis('shoot', currentPlayer.shootNow);\n}\ntankDoThis('shoot', currentPlayer.shootNow);\ntankDoThis('move', direction);\ntankDoThis('layMine', true);"
                },
                {
                	codedBy: userIDs[2],
                	botname: "Pickup Artist",
                	botCode: "//Pickup Artist 12:43PM 5/23/2015\r\n\r\n" +
                			"//Tank IA is a pacifist so it prioritizes shield first, then coins " +
                			"then double damages just in case and will seek out repair if it has " +
                			"health less than 100%.\r\n" +
                			"\r\n"+
                 			"//Tank AI wanders around getting pickables and shoots constantly with a rotating turret and it targets opponents hen it finds them.\r\n\r\nif(this.unstick>0){\n    this.unstick--\n}else{\n    if(stuck()){\n        wander();\n        console.log(\"stuck\")\n        currentPlayer.currentPriority=1;\n    }else{\n        if (completedPath()){\n           currentPlayer.destination=false;\n           l=0;\n           currentPlayer.currentPriority=0;\n        }\n        if(currentPlayer.destination===true&&myPath.length>0){\n            direction=followPath();\n        }\n        if(direction[0]===0 && direction[1]===0){\n            direction=randomDirection();\n        }\n    }\n}  \nif(currentPlayer.shootNow===\"right\"){\n    currentPlayer.turretAngle=turnTurret(-3)\n}else if(currentPlayer.shootNow===\"left\"){\n    currentPlayer.turretAngle=turnTurret(3)\n}else if(currentPlayer.shootNow===true || currentPlayer.shootNow===false){\n    tankDoThis('shoot', currentPlayer.shootNow);\n}\ntankDoThis('shoot', currentPlayer.shootNow);\ntankDoThis('move', direction);\ntankDoThis('layMine', true);"
                },
                {
                	codedBy: userIDs[3],
                	botname: "SFAQL",
                	botCode: "//TankAI 8:24PM 5/15/2015 which wanders around getting pickables and shoots constantly with a rotating turret and it targets opponents hen it finds them.\r\n\r\nif(this.unstick>0){\n    this.unstick--\n}else{\n    if(stuck()){\n        wander();\n        console.log(\"stuck\")\n        currentPlayer.currentPriority=1;\n    }else{\n        if (completedPath()){\n           currentPlayer.destination=false;\n           l=0;\n           currentPlayer.currentPriority=0;\n        }\n        if(currentPlayer.destination===true&&myPath.length>0){\n            direction=followPath();\n        }\n        if(direction[0]===0 && direction[1]===0){\n            direction=randomDirection();\n        }\n    }\n}  \nif(currentPlayer.shootNow===\"right\"){\n    currentPlayer.turretAngle=turnTurret(-3)\n}else if(currentPlayer.shootNow===\"left\"){\n    currentPlayer.turretAngle=turnTurret(3)\n}else if(currentPlayer.shootNow===true || currentPlayer.shootNow===false){\n    tankDoThis('shoot', currentPlayer.shootNow);\n}\ntankDoThis('shoot', currentPlayer.shootNow);\ntankDoThis('move', direction);\ntankDoThis('layMine', true);"
                },
                {
                	codedBy: userIDs[4],
                	botname: "potusBot",
                	botCode: "//TankAI 8:24PM 5/15/2015 which wanders around getting pickables and shoots constantly with a rotating turret and it targets opponents hen it finds them.\r\n\r\nif(this.unstick>0){\n    this.unstick--\n}else{\n    if(stuck()){\n        wander();\n        console.log(\"stuck\")\n        currentPlayer.currentPriority=1;\n    }else{\n        if (completedPath()){\n           currentPlayer.destination=false;\n           l=0;\n           currentPlayer.currentPriority=0;\n        }\n        if(currentPlayer.destination===true&&myPath.length>0){\n            direction=followPath();\n        }\n        if(direction[0]===0 && direction[1]===0){\n            direction=randomDirection();\n        }\n    }\n}  \nif(currentPlayer.shootNow===\"right\"){\n    currentPlayer.turretAngle=turnTurret(-3)\n}else if(currentPlayer.shootNow===\"left\"){\n    currentPlayer.turretAngle=turnTurret(3)\n}else if(currentPlayer.shootNow===true || currentPlayer.shootNow===false){\n    tankDoThis('shoot', currentPlayer.shootNow);\n}\ntankDoThis('shoot', currentPlayer.shootNow);\ntankDoThis('move', direction);\ntankDoThis('layMine', true);"
                }
    ];
    return q.invoke(Bot, 'create', bots);
    });

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
    	console.log(chalk.green('Seeding bots!'));
        return seedBots();
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});