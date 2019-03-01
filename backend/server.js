'use strict';

const express = require('express');

// Constants
const PORT = process.env.BACKEND_PORT||8000;
const HOST = '0.0.0.0';
let User = require('./src/models/userModel');
let Chat = require('./src/models/chatModel.ts');
const mongoose = require('mongoose');
let routes=require("./src/api/routes");
var bodyParser = require('body-parser');
const app = express();
let http = require('http').Server(app);
//let io = require('socket.io')(http);
let socket = require("./src/socket/socket")(http);


// DB


const options = {
    autoIndex: false,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0
};


if(process.env.dev){
    Chat.remove({}, function(err) {
        console.log('collection removed')
    });
}

const connectWithRetry = () => {
    mongoose.connect(process.env.MONGO_URL, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry in 5 seconds');
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

// App
let router = express.Router();
app.use(bodyParser.json());

// Routes


app.use("/api", routes);

http.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
