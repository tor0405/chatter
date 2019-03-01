var express = require('express');
var router = express.Router();

var chat = require('../controllers/chatController');


router.route('/')
    .get([], chat.getAll);
router.route('/:id')
    .get([], chat.get)
    .put([], chat.put);


module.exports = router;
