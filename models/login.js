var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Logins = new mongoose.Schema({
    username : String,
    password: String
});

Logins.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", Logins);

