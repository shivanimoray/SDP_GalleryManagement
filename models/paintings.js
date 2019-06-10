var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Paintings = new mongoose.Schema({
    paintname : String,
    paintdesc : String,
    paintyear : String,
    painttype : String,
    paintcost : String,
    paintsize : String,
    paintimage: String,
    paintbuyprice : String,
    paintartist :
    {
        afname: String,
        alname: String,
        aemail: String,
        acontactnum: String
    }
});
var PaintingShema = new mongoose.Schema(Paintings);

module.exports = mongoose.model("PaintingDetail",PaintingShema);



