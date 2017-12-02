var mylogger = require('../logging');

class Counter{
// collect request 

constructor(){
this.requests = [];
this.requestTrimThreshold = 5000;
this.requestTrimSize = 4000;
}
count(req, res) {
    this.requests.push(Date.now());

    // now keep requests array from growing forever
    if (this.requests.length > this.requestTrimThreshold) {
        this.requests = this.requests.slice(0, this.requests.length - this.requestTrimSize);
    }
    if(this.requests.length>1){
        var old = this.requests[this.requests.length-2];
        mylogger.debug(old);
        mylogger.debug(Date.now())
        if(old < Date.now()-10000){
            mylogger.debug('flushed Counter');
            this.requests = [];
        }
    }
   

return this.requests.length < 3

    
}

getNumberOfReq(){
    return this.requests.length
}

}

var counter = new Counter();

module.exports = counter;