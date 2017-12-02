var express = require('express');
var router = express.Router();
var mylogger = require('../logging');
var counter = require('../models/counter');
var IOTA = require('iota.lib.js');
var iotaFlash = ('iotaledger/iota.flash.js');

module.exports = class IOTAChannelHandler {

    constructor(){
        mylogger.debug("constructor called")
        this.state = "initial";
        
    }

    openChannel(flash){
        var multisig = iotaFlash.multisig;
        if(typeof iotaFlash === 'undefined'){
            mylogger.debug("iotaFlash is undifined");
        }
        if(this.state != "open"){
            this.state = "open"
            mylogger.debug("opening Channel")
            return true;
        } else {
            mylogger.debug("channel already open");
            return false;
        }
    }

    

    closeChannel(){
        if(this.state != "closed"){
            this.state = "closed"
            mylogger.debug("closing Channel")
            return true;
        } else {
            mylogger.debug("closed");
            return false;
        }
    }
}


