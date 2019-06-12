//installed init, express, ejs, body-parser, mongoose, passport, cookieparser, passportlocal, passportlocalmongoose, session, flash

var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  User = require("./models/login"),
  Registers = require("./models/register"),
  Paintings = require("./models/paintings"),
  Payments = require("./models/payment"),
  Artists = require("./models/artists"),
  Events = require("./models/events"),
  upload = require("./helpers/multer"),
  cloudinary = require("./helpers/cloudinary").cloudinary,
  nodemailer = require("nodemailer");

mongoose.connect("mongodb://localhost:27017/gallerymanagement");
var db = mongoose.connection;

//Check connection to mongo
db.once("open", function() {
  console.log("Connected to mongodb");
});

//Initialization of express, cookie-parser and body-parser`
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/"));

//Express session middleware
app.use(
  require("express-session")({
    key: "user_sid",
    secret: "This is the login part", //salt
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: new Date(Date.now() + 60 * 1000 * 10) }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passport authentication
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/"
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

//Landing page
app.get("/", function(req, res) {
  res.render("landing");
});

//Registration page
app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", async (req, res) => {
  var username = req.body.username;
  var fname = req.body.fname;
  var lname = req.body.lname;

  if (req.body.password === req.body.confirmpassword) {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function(err, user) {
        if (err) {
          return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
          saveRegisterDetails(username, fname, lname);
          res.redirect("/homepage");
        });
      }
    );
    async function main() {
      var account = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "artifactinfoteam@gmail.com", // generated ethereal user
          pass: "artifact@2019" // generated ethereal password
        }
      });

      // setup email data with unicode symbols
      var mailOptions = {
        from: '"Team Artifact" <artifactinfoteam@gmail.com>', // sender address
        to: username, // list of receivers
        subject: "Registration Confirmed", // Subject line
        text:
          "User registration successful!! Welcome to Artifact Gallery Management App" // plain text body
        // html body
      };

      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
  } else {
    res.redirect("/register");
  }
});

function saveRegisterDetails(username, fname, lname) {
  var newUser = {
    username: username,
    fname: fname,
    lname: lname
  };
  Registers.create(newUser, function(err, user) {
    if (err) {
      console.log(err);
    }
  });
}

//Show all paintings and filter paintings on homepage
app.get("/homepage", isLoggedIn, function(req, res) {
  var type = req.params.painting;
  Paintings.find({}, function(err, paintings) {
    if (err) {
      console.log(err);
    } else {
      res.render("homepage", {
        paintings: paintings
      });
    }
  });
});

//Server port
app.listen(8001, function() {
  console.log("Server is listening");
});

//Landing page
app.get("/", function(req, res) {
  res.render("landing.ejs");
});

//Logout
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

//filter for the type of paintings
app.get("/homepage/:type", function(req, res) {
  var type = req.params.type;
  Paintings.find({ painttype: req.params.type }, function(err, paintings) {
    if (err) {
      console.log(err);
    } else {
      res.render("homepage", {
        paintings: paintings
      });
    }
  });
});

//details about single painting
app.get("/singlepainting/:_id", function(req, res) {
  Paintings.findById({ _id: req.params._id }, function(err, paintings) {
    if (err) {
      //req.flash('danger', 'Oops! Something went wrong, please try again. ')
      console.log(err);
    } else {
      res.render("singlepainting", {
        paintings: paintings
      });
    }
  });
});

//events for customer
app.get("/events", function(req, res) {
  var type = req.params.events;
  Events.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render("events", {
        events: events
      });
    }
  });
});

//events for admin
app.get("/admin/events", function(req, res) {
  var type = req.params.events;
  Events.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render("ad_events", {
        events: events
      });
    }
  });
});

//edit artist profile
app.get("/admin/artists", function(req, res) {
  var type = req.params.artists;
  Artists.find({}, function(err, artists) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_profile", {
        artists: artists
      });
    }
  });
});

//saving edit artist profile
app.post("/admin/artists/:_id", async (req, res) => {
  Artists.updateOne(
    { _id: req.params._id },
    { $set: { 
        afname: req.body.afirstname,
        alastname: req.body.alname,
        aemail: req.body.amail,
        acontactnum: req.body.acontact } 
    },
    function(err, artists) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/artists");
      }
    }
  );
});

//route for admin page
app.get("/admin", function(req, res) {
  var type = req.params.painting;
  Paintings.find({}, function(err, paintings) {
    if (err) {
      console.log(err);
    } else {
      res.render("admin", {
        paintings: paintings
      });
    }
  });
});

//upload new painting
app.post("/upload_painting/", upload.single("pimage"), async (req, res) => {
  var result = await cloudinary.v2.uploader.upload(req.file.path);
  var new_img = result.secure_url;

  var new_painting = {
    paintname: req.body.pname,
    paintdesc: req.body.pdesc,
    paintyear: req.body.pyear,
    painttype: req.body.ptype,
    paintcost: req.body.pscost,
    paintsize: req.body.psize,
    paintbuyprice: req.body.pbcost,
    paintimage: new_img,
    paintartist: {
      afname: req.body.pafname,
      alname: req.body.palname,
      aemail: req.body.paemail,
      acontactnum: req.body.pacontact
    }
  };

  Paintings.create(new_painting, function(err, paintings) {
    Artists.create(new_painting.paintartist, function(err, artists) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin");
      }
    });
  });
});

//upload new event
app.post("/upload_event/", async (req, res) => {
  var new_event = {
    eventname: req.body.ename,
    eventdescription: req.body.edesc,
    eventdate: req.body.edate,
    eventlocation: req.body.elocation,
    eventstaff: {
      sfname: req.body.esfname,
      slname: req.body.eslname,
      semail: req.body.esemail,
      scontactnum: req.body.escontact
    }
  };

  Events.create(new_event, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});

app.post("/payment/", async (req, res) => {
  var new_payment = {
    iban: req.body.piban,
    bic: req.body.pbic,
    shippingaddress: {
        address1: req.body.add1,
        address2: req.body.add2,
        plz: req.body.pcode
    }
  };

  Payments.create(new_payment, function(err, payments) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/homepage");
    }
  });
});

// delete a event from the db
app.get("/admin/events/:_id", function(req, res) {
  var id = req.params._id;
  Events.remove({ _id: id }, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin/events");
    }
  });
});

