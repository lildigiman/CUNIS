var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PartsProvider = function(host, port) {
  this.db = new Db('cunis', new Server(host, port, {w: 1}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


PartsProvider.prototype.getCollection= function(callback) {
  this.db.collection('parts', function(error, part_collection) {
    if(error){
      callback(error);
    }
    else{
      callback(null, part_collection);
    }
  });
};

//find all Parts
PartsProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, part_collection) {
      if(error){
        callback(error);
      }
      else {
        part_collection.find().toArray(function(error, results) {
          if(error){
            callback(error);
          }
          else{
            callback(null, results);
          }
        });
      }
    });
};

//save new Parts
PartsProvider.prototype.save = function(parts, callback) {
    this.getCollection(function(error, part_collection) {
      if(error){
        callback(error);
      }
      else {
        if(typeof(parts.length) == "undefined"){
          parts = [parts];
        }
          
        for(var i = 0; i < parts.length; i++) {
          part = parts[i];
          part.created_at = new Date();
        }

        part_collection.insert(parts, function() {
          callback(null, parts);
        });
      }
    });
};

exports.PartsProvider = PartsProvider;
