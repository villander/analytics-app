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

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
// app.put('/wines/:id', wines.updateWine);
// app.delete('/wines/:id', wine.deleteWine);


io.on('connection', function(socket) {

  /*socket.on('message', function (message) {
    console.log("Got message: " + message);
    io.sockets.emit('pageview', { 'url': message });
  });

  socket.emit('news', { hello: 'world carai' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/

  socket.on('message', function (message) {
    console.log("Got message: " + message);
    var clientIp =  socket.client.request.headers['x-forwarded-for'] || socket.client.conn.remoteAddress || socket.conn.remoteAddress || socket.request.connection.remoteAddress;
    var timeStamp = new Date();
    var url = message;
    console.log(io.engine, 'engine');
    var numberClients =  io.engine.clientsCount;
    io.sockets.emit('clients', {'connections': numberClients});
    io.sockets.emit('pageview', { 'connections': numberClients, 'ip': '***.***.***.' + clientIp.substring(clientIp.lastIndexOf('.') + 1), 'url': url, 'timestamp': new Date()});
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