var express = require('express');
var app = express();
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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});