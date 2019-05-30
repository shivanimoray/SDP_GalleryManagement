var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var PaintingSchema = new mongoose.Schema({
    pname : String,
    pdesc : String,
    partist : String,
    pyear : String,
    ptype : String,
    pcost : String,
    psize : String,
});