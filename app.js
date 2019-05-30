//installed init, express, ejs, body-parser, mongoose, passport, cookieparser, passportlocal, passportlocalmongoose, session, flash

var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    LocalStrategy = require("passport-local")
    //UserDetail = require("./models/userdetail")
//     RecUserDetail = require("./models/recuserdetails"),
//     upload = require('./helpers/multer'),
//     session = require('express-session'),
//     flash = require('connect-flash')

// mongoose.connect("mongodb://localhost:27017/gallery");
// var db = mongoose.connection;

//Check connection to mongo
// db.once('open', function () {
//     console.log('Connected to mongodb');
// });

//Initialization of express and body-parser
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/'));

//Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

//Initialization of express and body-parser

app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser());
app.use(express.static(__dirname + '/'));



//Server port
app.listen(3000, function(){
    console.log("Server is listening");
});

//Landing page
app.get("/", function (req, res) {
    res.render('landing.ejs');
});

//Logout
//Logout
app.get("/logout", function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out successfully!')
    res.redirect("/");
});


app.get("/register", function (req, res) {
    res.render('register.ejs');
});


//Show all paintings and filter painting types on homepage
// app.get("/homepage", function (req, res) {
//   var type = req.params.painting;
//   PaintingSchema.find({}, function (err, paintings) {
//       if (err) {
//           console.log(err);
//       } else {
//           res.render('homepage', {
//             paintings: paintings
//           })
//       }
//   })
// })

app.get("/homepage", function(req, res){
    res.render("homepage.ejs");
})

// app.get("homepage/:painting", function (req, res) {
//   var type = req.params.painting;
//   PaintingSchema.find({ 'details.painting': type }, function (err, paintings) {
//       if (err) {
//           //req.flash('danger', 'Oops! Something went wrong, please try again. ')
//           console.log(err);
//       } else {
//           res.render('homepage', {
//             paintings: paintings,
//           })
//       }
//   })
// })

// //Get Details of painting
// app.get("/:_id", function (req, res) {
//     PaintingSchema.findById({ "_id": req.params._id }, function (err, paintings) {
//       if (err) {
//           //req.flash('danger', 'Oops! Something went wrong, please try again. ')
//           console.log(err)
//       } else {
//           res.render('profile', {
//               paintings: paintings
//           });
//       }
//   });
// });








