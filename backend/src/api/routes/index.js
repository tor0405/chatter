let express = require('express');
let router = express.Router();

let user = require('./userRoutes');


router.use('/user', user);


module.exports = router;
