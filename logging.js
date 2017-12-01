var winston = require('winston');



var logger = new (winston.Logger)({

  level: 'debug',

  transports: [

    new (winston.transports.Console)({'timestamp':true}),

    new (winston.transports.File)({ filename: 'dtPickup_server.log' })

  ]

});



//Is needed to use the logger

module.exports = logger;


