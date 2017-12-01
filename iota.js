
var IOTA = require('iota.lib.js');

var iota = new IOTA({
    'provider': 'http://p103.iotaledger.net:14700'
});

seed = 'COATJUKZKSALBTZQICHYZFXUXVIDWYACMRZDTDSNOXNCWSLRRRWTXHRIUUIO9VNZWGHJISXSYU9ZLNWDB';

function getAdress() {
  // Deterministically generates a new address for the specified seed with a checksum
  iota.api.getNewAddress( seed, { 'checksum': true }, function( e, address ) {
      if (!e) {
          console.log("Generated new address: ", address)
          address = address
      } else {
          console.log("Something went wrong: ", e);
      }
  })
}

name = ''
version = ''
address = 'OZ9YFAAMSPNOKGCHYWTELSCRYMCAATGBYGPGSEOQIJPSHHZHQLWOEVIUNJEVTHPR9EDWCJXUIQDPFHBD9RFRDKVBTA'

function sendIOTA(cb) {
  // iota.api.getNodeInfo(function(error, success) {
  //   if (error) {
  //       console.error(error);
  //   } else {
  //       console.log(success);
  //   }
  // })
  // the message which we will send with the transaction
  var messageToSend = {
  "certificateID": 'MeinErstesCertificate', // Thats the IOTA key
  "certificate": {
    "name": 'Name Certificate',
    "data": {
      "name": 'Nur der HSV!',
      "value": '1. Liga'
    },
  }
  }
  // Stringify to JSON
  var messageStringified = JSON.stringify(messageToSend);
  console.log(messageStringified);
  // Convert the string to trytes
  messageTrytes = iota.utils.toTrytes(messageStringified);
  console.log('Message to send: ', messageTrytes); //ODGABDPCADTCGADBGANBCDADXCBDXCZCGAQAGAADTCGDGDPCVCTCGADBGAWBMDEAUCXCFDGDHDEAADTCGDGDPCVCTCEAGDTCBDHDEAKDXCHDWCEASBYBCCKBSAGAQD
  console.log('In Bytes: ', iota.utils.fromTrytes(messageTrytes));
  // here we define the transfers object, each entry is an individual transaction
  var transfer = [{
      'address': address,
      'value': 0,
      'message': messageTrytes
  }]
  // We send the transfer from this seed, with depth 4 and minWeightMagnitude 9 = because tesnet // 15 = main net
  iota.api.sendTransfer(seed, 4, 9, transfer, function(e, bundle) {
      if (e) cb("Error: " + e);
      cb("Successfully sent your transfer: " + JSON.stringify(bundle));
  })
}

// starts the test

switch (process.argv[2]) {
  case "sendiota":
    sendIOTA(function (res) {
                console.log(res);
    });
    break;
  case "getdata":
    getIOTA()
    break;
  case "getaddress":
    getAdress()
    break;
}
