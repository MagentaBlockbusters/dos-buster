var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    company:String,
    name:String,
    first_name:String,
    rating:Number,
    car:Object,
    default_start:Object,
    routes:Object,
	created_at: {type: Date, default: Date.now}
});


var routeSchema = new mongoose.Schema({


});

var carSchema = new mongoose.Schema({
    make: String,
    model: String,
    colour: String,
    seats: Number
});



var profileSchema = new mongoose.Schema({
    first_name: String, 
    company: String, 
    name: String, 
    rating: Number,
    car: carSchema
});

mongoose.model('User', userSchema);
mongoose.model('Car', carSchema);
mongoose.model('Profile', profileSchema);

