var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var RegisterSchema = new mongoose.Schema({
    fname : String,
    lname : String,  
    username : String,
    password: String,
    confirmpassword : String,
    type : String
});