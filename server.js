/**
 * Created by Pravin on 12/04/17.
 */
var express = require('express'),
    app = express(),
    config = require('./config/development'),
    routes = require('./route'),
    router = express.Router();

    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname,'client')));

app.get('/',function(req,res){
    res.sendfile(__dirname+'/client/index.html');
    // res.render('index',{title : 'Computer Not Working'});
})

mongoose.connect('mongodb://'+config.db.mongo.host+':27017/'+ config.db.mongo.db);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-token');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());

routes.register(router);
 app.use('/',router);



app.listen(config.db.mongo.port,function(){
    console.log("project is working on port ",config.db.mongo.port)
})

