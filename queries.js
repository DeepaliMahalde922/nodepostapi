var promise = require('bluebird');
var moment = require('moment');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);


//var connectionString = 'postgres://localhost:5432/articles';
//var connectionString = 'postgres://ojwxoozqcwgcof:105dfd6f38f00ff5d46a3133ab187e785bca59544478910409abf34db0faa54a@ec2-54-204-45-43.compute-1.amazonaws.com/df62aebt480nve';
var connectionString = 'postgres://postgres:TechAdmin@localhost/shopify-app-development';
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

    var obj = req.body;
     var describe = contenType = productData = shopUrl = '';
    obj.data.forEach(function(item) {
        if(item.describe){ describe = item.describe; }
        if(item.shopUrl){ shopUrl = item.shopUrl; }
        if(item.contenType){ contenType = JSON.stringify(item.contenType);  }
        if(item.productData){ productData = JSON.stringify(item.productData) }
    });
    var time = moment();
    var time_format = time.format('YYYY-MM-DD HH:mm:ss Z'); 

    db.one("insert into bloglist(shopurl, describe, contenType, productData, createdat)" +
        "values ($1, $2, $3, $4, $5)"
        +"returning id", [shopUrl, describe, contenType, productData, time])
    .then(function (data) {
        res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recivied ONE Entry'
        });
        
    }, function (reason) {
        console.log('Insert into /locations failed for ', reason); // print error;
        return next(reason);
    });

}

function updateArticle(req, res, next) {
  db.one('update bloglist set describe=$1 where id=$2',['Update form', 84])
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
