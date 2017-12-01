
var express = require('express');
var cors =require('cors');
var bodyParser = require('body-parser');
// Using debug functionality
var debug = require('debug')('dos-buster');
var path = require('path');
var logger = require('morgan');
var mylogger = require('./logging.js');
var api = require('./routes/api');
var IOTA = require('iota.lib.js');
//var models = require('./models/models.js');
var mongoose = require('mongoose');


// Create IOTA instance with host and port as provider
var iota = new IOTA({
    'provider'  : 'http://localhost:14265',
    'sandbox'   :  true,
    'token'     : 'EXAMPLE-TOKEN-HERE'
});

iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
})

// First co-signer uses index 0 and security level 3
var digestOne = iota.multisig.getDigest('ABCDFG', 0, 3);

// Second cosigner also uses index 0 and security level 3 for the private key
var digestTwo = iota.multisig.getDigest('FDSAG', 0, 3);

// Multisig address constructor
var Address = iota.multisig.address;

// Initiate the multisig address generation
var address = new Address()

    // Absorb the first cosigners key digest
    .absorb(digestOne)

    // Absorb the second cosigners key digest
    .absorb(digestTwo)

    //and finally we finalize the address itself
    .finalize();


console.log("MULTISIG ADDRESS: ", address);

// Simple validation if the multisig was created correctly
// Can be called by each cosigner independently
var isValid = iota.multisig.validateAddress(address, [digestOne, digestTwo]);

console.log("IS VALID MULTISIG ADDRESS:", isValid);


//  SIGNING EXAMPLE
//
//  Even though these functions are c alled subsequently, the addSignature functions have to be called by each
//  cosigner independently. With the previous signer sharing the output (bundle with the transaction objects)
//
//  When it comes to defining the remainder address, you have to generate that address before making a transfer
//  Important to know here is the total sum of the security levels used by the cosigners.

// Transfers object
var multisigTransfer = [
  {
    address: iota.utils.noChecksum('ZGHXPZYDKXPEOSQTAQOIXEEI9K9YKFKCWKYYTYAUWXK9QZAVMJXWAIZABOXHHNNBJIEBEUQRTBWGLYMTX'),
    value: 999,
    message: '',
    tag: '9'.repeat(27)
  }
];

// Multisig address object, used as input
var input = {
  address: address,
  securitySum: 6,
  balance: 1000
}

// Define remainder address
var remainderAddress = iota.utils.noChecksum('NZRALDYNVGJWUVLKDWFKJVNYLWQGCWYCURJIIZRLJIKSAIVZSGEYKTZRDBGJLOA9AWYJQB9IPWRAKUC9FBDRZJZXZG');

iota.multisig.initiateTransfer(input, remainderAddress, multisigTransfer, function(e, initiatedBundle) {

    if (e) {
        mylogger.debug(e);
    }

    iota.multisig.addSignature(initiatedBundle, address, iota.multisig.getKey('ABCDFG', 0, 3), function(e,firstSignedBundle) {

        if (e) {
            mylogger.debug(e);
        }

        iota.multisig.addSignature(firstSignedBundle, address, iota.multisig.getKey('FDSAG', 0, 3), function(e,finalBundle) {

            if (!e) {
                mylogger.debug("IS VALID SIGNATURE: ", iota.utils.validateSignatures(finalBundle, address));
            }
        });
    });

})

mylogger.debug('booting');
var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use('/api', api);

// error handlers




module.exports = app;


