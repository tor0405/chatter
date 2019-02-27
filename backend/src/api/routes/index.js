let express = require('express');
let router = express.Router();

let user = require('./userRoutes');
let chat = require('./chatRoutes');


router.use('/user', user);
router.use('/chat', chat);


module.exports = router;
