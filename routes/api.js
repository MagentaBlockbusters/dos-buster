var express = require('express');
var router = express.Router();
var mylogger = require('../logging');



router.route('/send').put(function(req,res){
    //iota get sender adress count # Access
})



router.route('/profiles/:id')
    .get(function(req, res){
        res.body = {id:"1"};

    });
router.route('/profiles')
.get(function(req, res){

});

module.exports = router;
