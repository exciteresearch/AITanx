'use strict';
var fs = require('fs');
var path = require('path');
var router = require('express').Router();
module.exports = router;

//app.use('/', express.static(path.join(__dirname, '/')));


router.post('/', function (req, res) {
	fs.writeFile(path.join(__dirname,"../../../../public/",req.body.filePath,req.body.fileName), req.body.botCode, function (err) {
		  if (err) return console.log(err);
		  console.log('writeFile');
		    res.send({
		    	
		    });
		});
	
});