// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('config');
var cors = require('cors');

// MongoDB
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'stage') {
    if (!process.env.MONGO_DB_NAME) {
        throw new Error('MONGO_DB_NAME Environment variable not set');
    }
    
    if (!process.env.MONGO_USER) {
        throw new Error('MONGO_USER Environment variable not set');
    }
    
    if (!process.env.MONGO_PASS) {
        throw new Error('MONGO_PASS Environment variable not set');
    }
    var mongoConn = "mongodb://" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB_NAME;
    var mongoOpt = {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        dbName: process.env.MONGO_ADMIN_DB,
        useNewUrlParser: true
    };
}
else {
    var mongoConn = config.DBHost;
    var mongoOpt = {
        useNewUrlParser: true
    };
}

// Express
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({limit: '500mb',extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({limit: '500mb',type: 'application/json'}));

// Routes
app.options('*', cors());
app.use('/api', require('./routes/api'));

// Start Server
if(!module.parent){
    var server = app.listen(3000, function () {
        mongoose.connect(mongoConn, mongoOpt).then(
            () => {
                console.log('Jhaakas Merchant API is working');
            },
            err => { console.log('Database Error:' +  err.message); server.close(); }
        );
    });
} else {
    mongoose.connect(mongoConn, mongoOpt).then(
        err => { console.log('Database Error:' +  err.message); }
    );
}

module.exports = app;