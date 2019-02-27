var express = require('express');
var router = express.Router();

var chat = require('../controllers/chatController');


router.route('/')
    .get([], chat.get);

module.exports = router;
