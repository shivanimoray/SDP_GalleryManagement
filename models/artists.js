var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Artists = new mongoose.Schema({
    afname: String,
    alastname: String,
    aemail: String,
    acontactnum: String
});
var ArtistShema = new mongoose.Schema(Artists);

module.exports = mongoose.model("ArtistDetail",ArtistShema);


