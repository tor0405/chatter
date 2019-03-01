const mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var jwt = require('jsonwebtoken');

exports.get = function (req, res) {
    let token=jwt.decode(req.get("Authorization").split(" ")[1]);
    Chat.find({participants:{_id:token.id}}, (err, data)=>{
        if (err) {
            res.json({'error': err});
        } else {
            res.json({chatList:data});
        }

    });
};

exports.put = function (req, res) {
    let token=jwt.decode(req.get("Authorization").split(" ")[1]);
    Chat.find({participants:{_id:token.id}}, (err, data)=>{
        if (err) {
            res.json({'error': err});
        } else {
            res.json({chatList:data});
        }

    });
};
