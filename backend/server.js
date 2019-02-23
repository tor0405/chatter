'use strict';

const express = require('express');

// Constants
const PORT = process.env.BACKEND_PORT||8000;
const HOST = '0.0.0.0';
let User = require('./src/api/models/userModel');
const mongoose = require('mongoose');
let routes=require("./src/api/routes");
var bodyParser = require('body-parser');


// DB

const config = require('./db');
mongoose.connect(config.DB);

// App
const app = express();
let router = express.Router();
app.use(bodyParser.json());

// Routes

app.use("/api", routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
