var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var LoginSchema = new mongoose.Schema({
    username : String,
    password: String
});