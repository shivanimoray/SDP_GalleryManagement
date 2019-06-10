var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Staffs = new mongoose.Schema({
    staffname : String,
    artistmail : String,
    staffspecialization : String 
});
var StaffShema = new mongoose.Schema(Staffs);

module.exports = mongoose.model("StaffDetail",StaffShema);


