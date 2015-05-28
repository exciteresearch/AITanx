'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/dispatcher', require('./dispatcher'));
// router.use('/saveBotCode', require('./saveBotCode'));
router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/leaderBoard', require('./leaderBoard'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});