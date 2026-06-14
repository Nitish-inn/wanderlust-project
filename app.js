if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
if (!process.env.ATLASDB_URL) {
    throw new Error("ATLASDB_URL is not defined. Check your .env file.");
}

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local");

// ─── 1. DB CONNECTION ────────────────────────────────────────────────────────
const dbUrl = process.env.ATLASDB_URL;
console.log("DB URL:", dbUrl);

async function main(){
    await mongoose.connect(dbUrl);
}
main()
.then(() => console.log('Connected to ATLAS'))
.catch((err) => console.log("CONNECTION FAILED", err));

// ─── 2. VIEW ENGINE & STATIC FILES ───────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// ─── 3. MONGO SESSION STORE ──────────────────────────────────────────────────
const store = MongoStore.create({
    mongoUrl: dbUrl,

    secret: process.env.SECRET,
   
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

// ─── 4. SESSION ──────────────────────────────────────────────────────────────
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// ─── 5. PASSPORT ─────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ─── 6. LOCALS MIDDLEWARE ────────────────────────────────────────────────────
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.maptilerKey = process.env.MAPTILER_API_KEY;
    next();
});

// ─── 7. ROUTES ───────────────────────────────────────────────────────────────
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ─── 8. 404 HANDLER ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// ─── 9. ERROR HANDLER ────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

// ─── 10. SERVER ──────────────────────────────────────────────────────────────
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});