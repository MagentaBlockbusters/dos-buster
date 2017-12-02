var express = require('express');
var router = express.Router();
var mylogger = require('../logging');
var counter = require('../models/counter');
var IOTA = require('iota.lib.js');
var ChannelHandler = require('../models/ioataChannelHandler');

var iota = new IOTA({
    'provider'  : 'http://localhost:14265',
    'sandbox'   :  true,
    'token'     : 'EXAMPLE-TOKEN-HERE'
});


var channelHandler = new ChannelHandler();

iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        mylogger.debug(success);
    }
})

router.route('/sendHttp').put(function(req,res){
    counter.count(req,res);
    mylogger.debug('sendHTTP called');
    var body = req.body   
    var message = body.message
    var address=body.senderAddress;
    
        
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
     
    var body = req.body   



    return res.json(body);  
})

router.route('/closeChannel').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
})

router.route('/createCertificate').put(function(req,res){
    
    var body = req.body   
    return res.json(body);  
})

router.route('/sendCertificate').put(function(req,res){
    //iota get sender adress count # Access
    var body = req.body   
    return res.json(body);  
})

router.route('/getAddress').put(function(req,res){
    if(counter.count(req,res)){
    //iota get sender adress count # Access
    var body = req.body   
    var seed = body.seed
    var myaddress

    
        // Deterministically generates a new address for the specified seed with a checksum
        iota.api.getNewAddress( seed, { 'checksum': true }, function( e, address ) {
            if (!e) {
                mylogger.debug("Generated new address: ", address)
                return res.json(address);
            } else {
                mylogger.debug("Something went wrong: ", e);
                
            }
        })

//        mylogger.debug("address alive?: ", address)
      
        
} else {
    return res.status(500).send('You are flooding!');
}
      
})


module.exports = router;
