var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var Events = new mongoose.Schema({
    eventname : String,
    eventdescription: String,
    eventdate : Date,
    eventlocation : String,
    eventstaff: 
    {
        sfname: String,
        slname: String,
        sspeciality: String,
        semail: String,
        scontactnum: String
    }
});
var EventShema = new mongoose.Schema(Events);

module.exports = mongoose.model("EventDetail",EventShema);



