var mongoose = require('mongoose');
var Wine = require('../model/wine');

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


var wines = {};

wines.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

wines.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

wines.addWine = function(req, res) {

  var newWine = new Wine();

  newWine.name =  req.body.name;
  newWine.year =  req.body.year;
  newWine.grapes =  req.body.grapes;
  newWine.country =  req.body.country;
  newWine.description =  req.body.description;
  newWine.picture =  req.body.picture;

  newWine.save(function(err) {
    if (err) {
        console.error('[add wine]', 'Erro ao inserir novo vinho', err);

        res.send({ message: 'Erro interno' });
        return next(err);
    }
    res.send({ success: true });
  });

};

wines.updateWine = function(req, res) {

};

wines.deleteWine = function(req, res) {

};


module.exports = wines;