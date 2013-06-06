

var PartsProvider = require('../partsprovider').PartsProvider
  , partsProvider = new PartsProvider('localhost', 27017);

/*
 * GET parts listing.
 */
exports.list = function(req, res){
  partsProvider.findAll(function(error, parts){
    res.render('parts/parts', {
      title: "All Parts",
      parts: parts
    });
  });
};

exports.new = function(req, res){
  res.render('parts/new', {
    title: "New part"
  });
};

/*
 * POST new part
 */
exports.newPost = function(req, res){
  partsProvider.save(
    req.param('data'),
    function (error, docs){
      res.redirect('/parts');
    }
  );
};
