var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var wine = require('./routes/wines');
var bodyParser = require('body-parser');

// novos middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(express.static('./public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.get('/wines', wine.findAll);
// app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
// app.put('/wines/:id', wines.updateWine);
// app.delete('/wines/:id', wine.deleteWine);


io.on('connection', function(socket) {

  var numberClients =  io.engine.clientsCount;
  io.sockets.emit('clients', {'connections': numberClients});

  socket.on('message', function (message) {

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

    var clientIp =  socket.client.request.headers['x-forwarded-for'] || socket.client.conn.remoteAddress || socket.conn.remoteAddress || socket.request.connection.remoteAddress;
    var timeStamp = getCurrentDate() + ' ' + getCurrentHour();
    var url = message;
    var numberClients =  io.engine.clientsCount;
    io.sockets.emit('clients', {'connections': numberClients});
    io.sockets.emit('pageview', { 'connections': numberClients, 'ip': '***.***.***.' + clientIp.substring(clientIp.lastIndexOf('.') + 1), 'url': url, 'timestamp': timeStamp});
  });

  socket.on('disconnect', function () {
    console.log("Socket disconnected 4");
    var numberClients =  io.engine.clientsCount;
    io.sockets.emit('clients', {'connections': numberClients});
  });

});


server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});