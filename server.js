var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var shortId = require('shortid');
var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("Redis error " + err);
});

// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function(req, res) {
    var id = shortId.generate();
console.log('id generated: ', id);
    redisClient.set(id, '');
    res.render('index', { users: users, historyId: id });
});

app.get('/:id', function(req, res){
    var id = req.params.id;
    redisClient.get(id, function(historyString, error) {
        res.render('index', { users: users, historyId: id });
    });
});
app.use(express.static(__dirname));

app.post('history', function(req, res) {
    // TODO
});

// app.get('/p/:id', function(req, res, next) {
//     console.log('got request for project with id: ', req.params.id);
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//     next();
// });

// use 3001 just for api requests
app.listen(3001);

// use 3000 for initial request
// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     hot: true,
//     watchDelay: 300,
//     stats: {colors: true}
// }).listen(3000, 'localhost', function (err, result) {
//     if (err) {
//         console.log(err);
//     }

//     console.log('Listening at localhost:3000');
// });