var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Payments = new mongoose.Schema({
    iban : String,
    bic: String,
    saveoption : Boolean,
    shippingaddress:
    {
        address1: String,
        address2: String,
        plz: String
    }
});
var PaymentShema = new mongoose.Schema(Payments);

module.exports = mongoose.model("PaymentDetail",PaymentShema);


