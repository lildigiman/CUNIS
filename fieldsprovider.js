var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

FieldsProvider = function(host, port) {
  this.db = new Db('cunis', new Server(host, port, {w: 1}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


FieldsProvider.prototype.getCollection= function(callback) {
  this.db.collection('fields', function(error, field_collection) {
    if(error){
      callback(error);
    }
    else{
      callback(null, field_collection);
    }
  });
};

//find all Parts
FieldsProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, field_collection) {
      if(error){
        callback(error);
      }
      else {
        field_collection.find().toArray(function(error, results) {
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
FieldsProvider.prototype.save = function(fields, callback) {
    this.getCollection(function(error, field_collection) {
      if(error){
        callback(error);
      }
      else {
        if(typeof(fields.length) == "undefined"){
          fields = [fields];
        }
          
        for(var i = 0; i < fields.length; i++) {
          part = fields[i];
          part.created_at = new Date();
        }

        field_collection.insert(fields, function() {
          callback(null, fields);
        });
      }
    });
};

exports.FieldsProvider = FieldsProvider;