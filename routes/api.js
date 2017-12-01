var express = require('express');
var router = express.Router();
var mylogger = require('../logging');



router.route('/sendHttp').put(function(req,res){
    //iota get sender adress count # Access
})


router.route('/sendIota').put(function(req,res){
    //iota get sender adress count # Access
})


router.route('/openChannel').put(function(req,res){
    //iota get sender adress count # Access
})

router.route('/closeChannel').put(function(req,res){
    //iota get sender adress count # Access
})

router.route('/createCertificate').put(function(req,res){
    //iota get sender adress count # Access
})

router.route('/sendCertificate').put(function(req,res){
    //iota get sender adress count # Access
})

router.route('/getAddress').put(function(req,res){
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
