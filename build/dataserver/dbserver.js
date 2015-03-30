//dbserver.js
//
var url = require('url');
//var qs = require('querystring');
var DBManager = require('./mongodbmanager');
//
function my_send(data, res) {
        var sdata = JSON.stringify(data);
        res.setHeader('Content-type', 'application/json');
        //res.setHeader('Content-length', sdata.length);
        res.write(sdata);
        res.end();
    } // my_send
    //
module.exports.process = function (req, res, next) {
    var args = url.parse(req.url, true);
    var spath = args.pathname;
    //console.log(spath);
    var pp = spath.split('/');
    var bProc = false;
    var n = pp.length;
    //console.log(pp);
    if ((n > 2) && (pp[1] == 'api')) {
        bProc = true;
        var collectionName = pp[2];
        var id = null;
        if (n > 3) {
            id = pp[3];
        }
        if (req.method == 'GET') {
            var query = args.query;
            var bcount = false;
            var skip = 0;
            var limit = 0;
            var ppp = {};
            for (var k in query) {
                var v = query[k];
                if (k == '$count') {
                    bcount = true;
                    break;
                } else if (k == '$limit') {
                    limit = v;
                } else if (k == '$skip') {
                    skip = v;
                } else {
                    ppp[k] = v;
                }
            } //
            if (bcount) {
                DBManager.get_count(collectionName, ppp).then(function (results) {
                    my_send({
                        count: results
                    }, res);
                }, function (err) {
                    next(err);
                });

            } else {
                DBManager.get_all(collectionName, ppp, skip, limit).then(function (results) {
                    my_send(results,res);
                },function(err){
                    next(err);
                });
            }
        } else if (req.method == 'DELETE') {
            DBManager.remove_one(collectionName, id).then(function (result) {
                my_send((result == 1) ? {
                    msg: 'success'
                } : {
                    msg: 'error'
                }, res);
            }, function (err) {
                next(err);
            });
        } else if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = JSON.parse(body);
                DBManager.insert_one(collectionName, post).then(function (results) {
                    my_send(results,res);
                },function(err){
                    next(err);
                });
            });
        } else if (req.method == 'PUT') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = JSON.parse(body);
                DBManager.update_one(collectionName, id, post).then(function (result) {
                    my_send((result == 1) ? {
                        msg: 'success'
                    } : {
                        msg: 'error'
                    },res);
                },function(err){
                    next(err);
                });
            });
        }
    }
    return bProc;
};