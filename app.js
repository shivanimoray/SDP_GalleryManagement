//installed init, express, ejs, body-parser, mongoose, passport, cookieparser, passportlocal, passportlocalmongoose, session, flash

var express = require("express"),
    //mongoose = require("mongoose"),
    //passport = require("passport"),
    bodyParser = require("body-parser")
    var app = express();
    //cookieParser = require('cookie-parser'),
    //User = require("./models/user"),
    //LocalStrategy = require("passport-local"),
    //passportLocalMongoose = require("passport-local-mongoose"),
    //UserDetail = require("./models/userdetail"),
    //CustUserDetail = require("./models/recuserdetails"), //Customer user details
    //upload = require('./helpers/multer'),
    //session = require('express-session'),
    //flash = require('connect-flash')

//mongoose.connect("mongodb://localhost:27017/gallery");
//var db = mongoose.connection;

//Check connection to mongo
//db.once('open', function () {
  //  console.log('Connected to mongodb');
//});

//Initialization of express and body-parser

app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser());
app.use(express.static(__dirname + '/'));



//Server port
app.listen(3000, function(){
    console.log("Server is listening");
});

//Landing page
app.get("/register", function (req, res) {
    res.render('register.ejs');
});


//Show all paintings and filter painting types on homepage
app.get("/homepage", function (req, res) {
  var type = req.params.painting;
  UserDetail.find({}, function (err, paintings) {
      if (err) {
          console.log(err);
      } else {
          res.render('homepage', {
            paintings: paintings
          })
      }
  })
})

app.get("homepage/:painting", function (req, res) {
  var type = req.params.painting;
  UserDetail.find({ 'details.painting': type }, function (err, paintings) {
      if (err) {
          //req.flash('danger', 'Oops! Something went wrong, please try again. ')
          console.log(err);
      } else {
          res.render('homepage', {
            paintings: paintings,
          })
      }
  })
})

//Get Details of painting
app.get("/:_id", function (req, res) {
  UserDetail.findById({ "_id": req.params._id }, function (err, paintings) {
      if (err) {
          //req.flash('danger', 'Oops! Something went wrong, please try again. ')
          console.log(err)
      } else {
          res.render('profile', {
              paintings: paintings
          });
      }
  });
});

//Logout
//app.get("/logout", function (req, res) {
 //   req.logout();
  //  req.flash('success', 'You have logged out successfully!')
   // res.redirect("/");
//});

//Show all paintings and filter painting types on homepage
//app.get("/homepage", isLoggedIn, function (req, res) {
 //   var type = req.params.artist;
 //   UserDetail.find({}, function (err, artists) {
 //       if (err) {
  //          console.log(err);
  //      } else {
  //          res.render('homepage', {
  //              artists: artists
   //         })
   //     }
   // })
//})

//app.get("/homepage/:artist", isLoggedIn, function (req, res) {
 //   var type = req.params.artist;
//    UserDetail.find({ 'details.artist': type }, function (err, artists) {
 //       if (err) {
 //           req.flash('danger', 'Oops! Something went wrong, please try again. ')
  //          console.log(err);
  //      } else {
  //          res.render('homepage', {
  //              artists: artists,
  //          })
  //      }
  //  })
//})






