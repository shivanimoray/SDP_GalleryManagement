var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Registers = new mongoose.Schema({
    fname : String,
    lname : String,  
    username : String,
    password: String
});

var RegisterShema = new mongoose.Schema(Registers);

module.exports = mongoose.model("RegisterDetail",RegisterShema);