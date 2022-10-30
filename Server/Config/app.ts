import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Step 1 - import db package 
import mongoose from 'mongoose';

//Step 1 for auth - import moudles
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Modules for JWT support
import cors from 'cors';

// Step 2 for auth - define out auth objects
let localStrategy = passportLocal.Strategy; //alias

// Step 3 for auth - import the user model
import User from '../Models/user';


// import the router data 
import indexRouter from '../Routes/index'; //top-level routes
import movieListRouter from '../Routes/movie-list'; //only for movie-list routes
import authRouter from '../Routes/auth'; //authentication routes

const app = express();

// Step 2 - Complete DB Configuration
import * as DBConfig from './db';
mongoose.connect(DBConfig.RemoteURI || DBConfig.LocalURI);
const db =mongoose.connection; // alias for the mongoose connection 

//  Step 2 - Listen for connections or errors 
db.on("open", function() 
{
  console.log (`connected to MongoDB at: ${(DBConfig .RemoteURI) ? DBConfig.HostName : "localhost"}`);
})

db.on("error", function()
{
  console.error(`Connection Error`);
})


// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules'))); 

app.use(cors()); // adds CORS (cross-origin resource sharing) to the config 

//step 4 for auth - setup express session 
app.use(session(
{ secret: DBConfig.Secret,
  saveUninitialized:false,
  resave:false

}));

// Step 5 for auth - setup Flash 
app.use(flash());

//Step 6 for auth - initialize passport and session 
app.use(passport.initialize());
app.use(passport.session());

// Step 7 for auth - implement the Auth Strategy
passport.use(User.createStrategy());

// Step 8 for auth - setup User serialization and deserialization (encoding and decoding)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//uses routes
app.use('/', indexRouter);
app.use('/',movieListRouter);
app.use('/',authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err : createError.HttpError, req : express.Request, res: express.Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
