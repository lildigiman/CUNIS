
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , parts = require('./routes/parts')
  , http = require('http')
  , path = require('path')
  , PartsProvider = require('./partsprovider').PartsProvider
  , FieldsProvider = require('./fieldsprovider').FieldsProvider;

var app = express();

var partsProvider = new PartsProvider('localhost', 27017)
  , fieldsProvider = new FieldsProvider('localhost', 27017);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/parts', parts.list);
app.get('/parts/new', parts.new);

app.post('/parts/new', parts.newPost);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
