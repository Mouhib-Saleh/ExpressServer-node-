var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts');
var osRouter = require('./routes/os');
var productsRouter = require('./routes/products');
const dotenv = require('dotenv').config();
var socket = require('socket.io')(require("http"));
var app = express();

socket.on("connect",function(client){
  console.log("user connected")
  client.emit("message","Hello from server")
})


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true },
() => console.log('connected to db'));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/products', productsRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(express.static(__dirname+'/public')); 
app.get("/",(req,res,next)=>{
    res.sendFile(__dirname + "/index.html");
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
