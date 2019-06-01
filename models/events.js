var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var EventSchema = new mongoose.Schema({
    eventname : String,
    edescription: String,
    edate : String,
    elocation : String
});