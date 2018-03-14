var promise = require('bluebird');
var moment = require('moment');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/articles';
var connectionString = 'postgres://ojwxoozqcwgcof:105dfd6f38f00ff5d46a3133ab187e785bca59544478910409abf34db0faa54a@ec2-54-204-45-43.compute-1.amazonaws.com/df62aebt480nve';
var db = pgp(connectionString);

function getAllArticle(req, res, next) {
  db.any('select * from bloglist')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL articles'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleArticle(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from bloglist where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createArticle(req, res, next) {

  var body = "";
	req.on('data', function(chunk) {
    	body += chunk;
	});
	req.on('end', function() {
        var obj = JSON.parse(body);
        req.body.age = parseInt(req.body.age);
        var time = moment();
        var time_format = time.format('YYYY-MM-DD HH:mm:ss Z');
        var describe = contenType = productData = shopUrl = '';
        if(obj.data.describe){ describe = obj.data.describe; }
        if(obj.data.contenType){ contenType = obj.data.contenType; }
        if(obj.data.shopUrl){ shopUrl = obj.data.shopUrl; }
        var product = obj.data.productData; if(product){ productData = JSON.stringify(product) }

        db.none('INSERT INTO blogList(shopurl, describe, contenType, productData, createdat)' +
          'values(${shopUrl}, ${describe}, ${contenType}, ${productData}, ${time})',
        req.body)
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one Entry'
            });
        })
        .catch(function (err) {
          return next(err);
        });
  });
  
}

function updateArticle(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeArticle(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllArticle: getAllArticle,
  getSingleArticle: getSingleArticle,
  createArticle: createArticle,
  updateArticle: updateArticle,
  removeArticle: removeArticle
};
