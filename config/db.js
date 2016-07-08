var mongoose = require('mongoose');

mongoose.connect('mongodb://mano:123@ds055575.mongolab.com:55575/mano', function(err) {
   if (err) {
    throw err;
  }
});

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err);
    /*
{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }
    */
});

db.on('open', function () {
  console.log('Conexão aberta.')
});

db.on('connected', function(err){
    console.log('Conectado')
});