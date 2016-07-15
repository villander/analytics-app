var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var db = require('./config/db');


var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// novos middlewares
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('method-override')());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
secret: 'ilovescotchscotchyscotchscotch',
resave: true,
saveUninitialized: true
}));// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// uncomment this line
require('./config/passport')(passport); // pass passport for configuration


app.use(express.static('./public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


io.on('connection', function(socket) {

  var numberClients =  io.engine.clientsCount;
  io.sockets.emit('clients', {'connections': numberClients});

  function getCurrentDate() {
    var date = new Date();
    return (date.getMonth() + 1 ) +  '/' + date.getUTCDate() + '/' + date.getFullYear();
  }

  function getCurrentHour() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var amPm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12; // return '0' ou different of '0'
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    var timeCurrent = hours + ':' + minutes + ' ' + amPm;
    return timeCurrent;
  }

  socket.on('message', function (message) {

    var clientIp =  socket.client.request.headers['x-forwarded-for'] || socket.client.conn.remoteAddress || socket.conn.remoteAddress || socket.request.connection.remoteAddress;
    var timeStamp = getCurrentDate() + ' ' + getCurrentHour();
    var url = message;
    var numberClients =  io.engine.clientsCount;
    io.sockets.emit('clients', {'connections': numberClients});
    io.sockets.emit('pageview', { 'connections': numberClients, 'ip': '***.***.***.' + clientIp.substring(clientIp.lastIndexOf('.') + 1), 'url': url, 'timestamp': timeStamp});
    //ControllerHistory.addHistory()
  });

  socket.on('disconnect', function () {
    console.log("Socket disconnected");
    var numberClients =  io.engine.clientsCount;
    io.sockets.emit('clients', {'connections': numberClients});
  });

});


server.listen(process.env.PORT || 3000, function(){
  console.log('listening on');
});