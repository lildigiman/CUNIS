

var PartsProvider = require('../partsprovider').PartsProvider
  , partsProvider = new PartsProvider('localhost', 27017);

/*
 * GET parts listing.
 */
exports.list = function(req, res){
  partsProvider.findAll(function(error, parts){
    res.render('parts', {
      title: "All Parts",
      parts: parts
    });
  });
};

exports.new = function(req, res){
  res.render('new', {
    title: "New part"
  });
};

/*
 * POST new part
 */
exports.newPost = function(req, res){
  partsProvider.save({
    title: req.param('title'),
    name: req.param('name'),
  }, function (error, docs){
    //res.redirect('/parts');
  });
};
