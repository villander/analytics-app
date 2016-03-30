// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var autoIncrement = require('mongodb-autoincrement');

// define the schema for our user model
var historySchema = mongoose.Schema({

    created  : { type: Date, default: Date.now },
    author   : { type: mongoose.Schema.Types.ObjectId },
    page     : String

});

historySchema.plugin(autoIncrement.mongoosePlugin);

// create the model for users and expose it to our app
module.exports = mongoose.model('History', historySchema);