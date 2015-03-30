//dbmanager.ts
//
var configdata = require('./configdata');
var mongoskin = require('mongoskin');
//
var db = mongoskin.db(configdata.configdata.DatabaseConnectUrl, { safe: true });
var fid = mongoskin.helper.toObjectID;
//
//
var DbUtils = (function () {
    function DbUtils() {
    }
    DbUtils.convert_id = function (s) {
        return fid(s);
    };
    DbUtils.filter_arg = function (key, v) {
        if ((v == null) || (v == undefined)) {
            return null;
        }
        var vRet = v;
        var ss = key.trim().toLowerCase();
        var n = ss.length;
        if (n > 1) {
            if (ss.substr(n - 2, n) == "id") {
                var sval = v.toString();
                vRet = DbUtils.convert_id(sval);
            }
        }
        return vRet;
    }; // filter_arg
    DbUtils.filter_object = function (src) {
        if ((src == null) || (src == undefined)) {
            return null;
        }
        var vRet = {};
        for (var k in src) {
            var v = src[k];
            vRet[k] = DbUtils.filter_arg(k, v);
        }
        return vRet;
    }; // filter_object
    return DbUtils;
})(); // class DBUtils
//
var DBManager = (function () {
    function DBManager() {
    }
    DBManager.insert_one = function (colname, data, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        //console.log(data);
        var pp = DbUtils.filter_object(data);
       // console.log(pp);
        col.insert(pp, {}, function (e, r) {
            db.close();
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
               // console.log(r);
                callback(null, r);
            }
        });
    }; // insert_one
    DBManager.insert_all = function (colname, dataCol, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var ppx = [];
        for (var p in dataCol) {
            var x = DbUtils.filter_object(p);
            ppx.push(x);
        }
        col.insert(ppx, {}, function (e, r) {
            db.close();
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // insert_all
    DBManager.update_one = function (colname, id, data, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var nid = DbUtils.convert_id(id);
        var pp = DbUtils.filter_object(data);
        col.update({ _id: nid }, { $set: pp }, { safe: true, multi: false }, function (e, r) {
            db.close();
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // update
    DBManager.delete_one = function (colname, id, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var nid = DbUtils.convert_id(id);
        col.remove({ _id: nid }, function (e, r) {
            db.close();
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // delete
    DBManager.get_one = function (colname, id, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var nid = DbUtils.convert_id(id);
        col.findOne({ _id: nid }, function (e, r) {
            db.close();
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // delete
    DBManager.count = function (colname, data, callback) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var pp = DbUtils.filter_object(data);
        col.count(pp, function (e, r) {
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // count
    DBManager.get_all = function (colname, data, callback, start, count) {
        if (db == null) {
            callback(new Error("Database not connected..."));
            return;
        }
        var col = db.collection(colname);
        var pp = DbUtils.filter_object(data);
        var options = {};
        if ((start != null) && (start != undefined) && (start > 0)) {
            options['skip'] = start;
        }
        if ((count != null) && (count != undefined) && (count > 0)) {
            options['limit'] = count;
        }
        col.find(pp, options).toArray(function (e, r) {
            if ((e != null) && (e != undefined)) {
                callback(e);
            }
            else {
                callback(null, r);
            }
        });
    }; // count
    return DBManager;
})();
exports.DBManager = DBManager; // class DBManager
