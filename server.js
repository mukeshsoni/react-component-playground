var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var shortId = require('shortid');
var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("Redis error " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    var id = shortId.generate();
    redisClient.set(id, '');
    res.render('index', { historyId: id, historyJSON: '[]' });
});

app.get('/:id', function(req, res){
    var id = req.params.id;
    redisClient.get(id, function(error, historyString) {
        res.render('index', { historyId: id, historyJSON: historyString || '[]' });
    });
});
app.use(express.static(__dirname));

app.post('/api/history', function(req, res) {
    redisClient.set(req.body.id, JSON.stringify(req.body.data), redis.print);
    res.sendStatus(200);
});

app.listen(3001);