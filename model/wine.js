// app/models/wine.js

// dependencias
var mongoose = require('mongoose');

// cria schema do mongo
var wineSchema = mongoose.Schema({
  name: String,
  year: String,
  grapes: String,
  country: String,
  region: String,
  description: String,
  picture: String
});

// exporta o resultado do modelo
module.exports = mongoose.model('Wine', wineSchema);
