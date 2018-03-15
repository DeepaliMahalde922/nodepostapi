var express = require('express');
var router = express.Router();

var db = require('../queries');
var dbnew = require('pg-db')();


router.get('/api/getarticles', db.getAllArticle);
router.get('/api/articles/:id', db.getSingleArticle);
router.post('/api/newarticles', db.createArticle);
router.put('/api/articles/:id', db.updateArticle);
router.delete('/api/articles/:id', db.removeArticle);


module.exports = router;
