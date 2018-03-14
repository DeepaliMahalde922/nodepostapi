var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/getarticles', db.getAllArticle);
router.get('/api/articles/:id', db.getSingleArticle);
router.post('/api/articles', db.createArticle);
router.put('/api/articles/:id', db.updateArticle);
router.delete('/api/articles/:id', db.removeArticle);


module.exports = router;
