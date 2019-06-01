var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Paintings = new mongoose.Schema({
    pname : String,
    pdesc : String,
    partist : String,
    pyear : String,
    ptype : String,
    pcost : String,
    psize : String,
    pimage: String
});
var PaintingShema = new mongoose.Schema(Paintings);

module.exports = mongoose.model("PaintingDetail",PaintingShema);