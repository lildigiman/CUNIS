

var FieldsProvider = require('../fieldsprovider').FieldsProvider
  , fieldsProvider = new FieldsProvider('localhost', 27017);

/*
 * GET fields listing.
 */
exports.list = function(req, res){
  fieldsProvider.findAll(function(error, fields){
    res.render('fields/fields', {
      title: "All field types",
      fields: fields
    });
  });
};

exports.new = function(req, res){
  res.render('fields/new', {
    title: "New field"
  });
};

/*
 * POST new part
 */
exports.newPost = function(req, res){
  fieldsProvider.save(
    req.param('data'),
    function (error, docs){
      res.redirect('/fields');
    }
  );
};
