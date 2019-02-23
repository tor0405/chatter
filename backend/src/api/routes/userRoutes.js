var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');


router.route('/')
    .post([], user.register);

router.route('/login')
    .post(user.login);

router.route('/:id')
    .get(user.get);

module.exports = router;
