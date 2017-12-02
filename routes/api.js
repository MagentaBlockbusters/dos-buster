var express = require('express');
var router = express.Router();
var mylogger = require('../logging');
var IOTA = require('iota.lib.js');

var iota = new IOTA({
    'provider'  : 'http://localhost:14265',
    'sandbox'   :  true,
    'token'     : 'EXAMPLE-TOKEN-HERE'
});


router.route('/sendHttp').put(function(req,res){
    mylogger.debug('sendHTTP called');
    var body = req.body   
   
    var message=body;
    
        console.log(message);
        var messageStringified = JSON.stringify(message);
        console.log(messageStringified);
        // Convert the string to trytes
        messageTrytes = iota.utils.toTrytes(messageStringified);

    return res.json(messageTrytes);  


    //iota get sender adress count # Access
})


router.route('/sendIota').put(function(req,res){
    mylogger.debug('sendIota called');
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
  
})


router.route('/openChannel').put(function(req,res){
    //iota get sender adress count # 
    var body = req.body   
    return res.json(body);  
})

router.route('/closeChannel').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
})

router.route('/createCertificate').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
})

router.route('/sendCertificate').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
})

router.route('/getAddress').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    var seed = body.seed

    
        // Deterministically generates a new address for the specified seed with a checksum
        iota.api.getNewAddress( seed, { 'checksum': true }, function( e, address ) {
            if (!e) {
                mylogger.debug("Generated new address: ", address)
                address = address
            } else {
                mylogger.debug("Something went wrong: ", e);
            }
        })
      
      

    return res.json(address);  
})



router.route('/profiles/:id')
    .get(function(req, res){
        res.body = {id:"1"};

    });
router.route('/profiles')
.get(function(req, res){

});

module.exports = router;
