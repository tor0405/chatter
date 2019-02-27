var mongoose = require('mongoose'),
    User = mongoose.model('Chat');

let bcrypt = require('bcrypt-nodejs');
let validator = require('validator');
var jwt = require('jsonwebtoken');


exports.register = function (req, res) {
    console.log(req.body);

    if (req.body.password != null && req.body.username != null) {
        let new_user = new User(req.body);
        User.findOne({username: req.body.username})
            .exec(function (err, user) {
                if (err) {
                    res.json({'error': err});
                } else if (user) {
                    res.json({'error': 'user exist'});
                } else {
                    new_user.save(function (err, user) {
                        if (err) {
                            res.json({'error': err});
                        }
                        res.json({'success': true});
                    });
                }
            });

    } else {
        res.json({'error': ' missing parameters'});
    }
};



exports.login = function (req, res) {
    if (req.body.password != null && req.body.username != null) {

        User.findOne({username: req.body.username})
            .exec(function (err, user) {
                if (err) {
                    res.json({'error': err});
                } else if (!user) {
                    res.json({'error': 'user not found'});
                } else {
                    if (req.body.password === user.password) {
                        var u = {
                            username: user.username,
                            id: user._id,
                            userGroup: user.userGroup
                        };
                        let token = jwt.sign(u, 'Password123', {
                            expiresIn: 60 * 60 * 24
                        });
                        res.json(
                            {
                                success: true,
                                token: token
                            });
                    } else {
                        res.json({'error': 'wrong password'});
                    }


                }
            });
    } else {
        res.json({'error': ' missing parameters'});
    }

};


exports.get = function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            res.json({'error': err});
        } else {
            res.json({
                'username': user.username,
                'id': user._id,
                'fullName': user.fullName
            });
        }

    });
};
