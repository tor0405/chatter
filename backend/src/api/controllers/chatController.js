const mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var jwt = require('jsonwebtoken');

exports.getAll = function (req, res) {
    let token=jwt.decode(req.get("Authorization").split(" ")[1]);
    Chat.find({participants:{_id:token.id}}, (err, data)=>{
        if (err) {
            res.json({'error': err});
        } else {
            res.json({chatList:data});
        }

    });
};

exports.get = function (req, res) {
    let token=jwt.decode(req.get("Authorization").split(" ")[1]);
    Chat.findOne({'public_id':req.params.id, 'participants._id':token.id}, (err, data)=>{
        if (err) {
            res.json({'error': err});
        } else {
            if(data==null){
                res.json({'error': "not found"});
            }else{
                res.json({'chat':data});
            }
        }

    });
};


exports.put = function (req, res) {
    let token=jwt.decode(req.get("Authorization").split(" ")[1]);
    Chat.findOneAndUpdate({public_id:req.params.id, participants:{_id:token.id,admin:true}}, {$set:{...req.body}},(err, data)=>{
        if (err) {
            res.json({'error': err});
        } else {
            if(data==null){
                res.json({'error': "not found"});
            }else{
                res.json({'success':true});
            }
        }

    });
};
