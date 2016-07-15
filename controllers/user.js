
var User = require('../model/user');

module.exports.findOrCreateUser = function (token, refreshToken, profile, done) {
  // find the user in the database based on their facebook id
  User.findOrCreate(token, refreshToken, profile, done);
}
