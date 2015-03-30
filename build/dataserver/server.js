var ConfigData = require('./configdata');
var DBManager = require('./dbmanager');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
//
var app = express();
var dbManager = DBManager.DBManager;
var nPort = ConfigData.configdata.ServerPort;
// all environments
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());
app.use(cors());
//
app.get('/favicon.ico', function (req, res, next) {
    res.send(null);
});
app.get('/', function (req, res, next) {
    res.send('Select a collection, e.g., /api/collection')
});
//
app.get('/api/:collectionName', function (req, res, next) {
	var bcount = false;
	var skip = 0;
	var limit = 0;
	var pp = {};
	for (var k in req.query) {
		var v = req.query[k];
		if (k == '$count') {
			bcount = true;
		}
		else if (k == '$limit') {
			limit = v;
		}
		else if (k == '$skip') {
			skip = v;
		}
		else {
			pp[k] = v;
		}
	}
	var collectionName = req.params.collectionName;
	if (bcount) {
		dbManager.count(collectionName, pp, function (e, results) {
			if (e) {
				return next(e);
			}
			else {
				res.send({ count: results });
			}
		});
	}
	else {
		dbManager.get_all(collectionName, pp, function (e, results) {
			if (e) {
				return next(e);
			}
			else {
				res.send(results);
			}
		}, skip, limit);
	}
});
app.post('/api/:collectionName', function (req, res, next) {
	var collectionName = req.params.collectionName;
    //console.log(req.body);
	dbManager.insert_one(collectionName, req.body, function (e, results) {
		if (e) {
			return next(e);
		}
		else {
			res.send(results);
		}
	});
});
app.get('/api/:collectionName/:id', function (req, res, next) {
	var collectionName = req.params.collectionName;
	var id = req.params.id;
	dbManager.get_one(collectionName, id, function (e, results) {
		if (e) {
			return next(e);
		}
		else {
			res.send(results);
		}
	});
});
app.put('/api/:collectionName/:id', function (req, res, next) {
	var collectionName = req.params.collectionName;
	var id = req.params.id;
	var pp = req.body;
	dbManager.update_one(collectionName, id, pp, function (e, result) {
		if (e) {
			return next(e);
		}
		else {
			res.send((result === 1) ? { msg: 'success' } : { msg: 'error' });
		}
	});
});
app.delete('/api/:collectionName/:id', function (req, res, next) {
	var collectionName = req.params.collectionName;
	var id = req.params.id;
	dbManager.delete_one(collectionName, id, function (e, result) {
		if (e) {
			return next(e);
		}
		else {
			res.send((result === 1) ? { msg: 'success' } : { msg: 'error' });
		}
	});
});
http.createServer(app).listen(nPort, function () {
    console.log('Data server listening on port ' + nPort);
});
