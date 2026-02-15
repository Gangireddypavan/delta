if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const ExpressError = require("./utils/ExpressError.js");

// Environment Variables
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
// const port = 8080;
const port = process.env.PORT || 8080;


// 1. Database Connection Logic
async function main() {
  // Prevent Mongoose buffering timeout errors by ensuring we connect before operations
  // and setting proper options if needed (though connect() is the primary fix)
  await mongoose.connect(dbUrl);
}

// 2. Add connection error listener
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// 3. Start Connection and then Server
main()
  .then(() => {
    console.log("Connected to MongoDB successfully");

    // MODELS (Imported after connection setup as requested)
    const User = require("./models/user.js");

    // MIDDLEWARE & CONFIG
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.engine("ejs", ejsMate);

    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(express.static(path.join(__dirname, "/public")));

    const sessionOptions = {
      secret: process.env.SECRET || "mysupersecretcode",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: dbUrl,
        crypto: {
          secret: process.env.SECRET || "mysupersecretcode",
        },
        touchAfter: 24 * 3600,
      }),
      cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    };


    app.use(session(sessionOptions));
    app.use(flash());

    app.get("/", (req, res) => {
      res.send("Hi I am root ");
    });

    // PASSPORT CONFIG
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Flash Middleware
    app.use((req, res, next) => {
      res.locals.success = req.flash("success");
      res.locals.error = req.flash("error");
      res.locals.currUser = req.user;
      next();
    });

    // ROUTES
    const listingRouter = require("./routes/listing.js");
    const reviewRouter = require("./routes/review.js");
    const userRouter = require("./routes/user.js");

    app.get("/", (req, res) => {
      res.redirect("/listings");
    });

    app.use("/listings", listingRouter);
    app.use("/listings/:id/reviews", reviewRouter);
    app.use("/", userRouter);

    // 404 Route
    app.all("*", (req, res, next) => {
      next(new ExpressError(404, "Page Not Found!"));
    });

    // Error Handling Middleware
    app.use((err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      const { statusCode = 500, message = "Something went wrong" } = err;
      res.status(statusCode).render("error.ejs", { err: { status: statusCode, message } });
    });

    // START SERVER
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });



