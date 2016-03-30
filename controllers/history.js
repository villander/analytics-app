// app/controllers/campaign.js

// load up the user model
var User       = require('../model/history');

// put history of user
module.exports.addHistory = function(req, page) {

    // lista todas as campanhas
    var newHistory = new History();

        newHistory.author = req.user._id;
        newHistory.page  = page;

        newHistory.save(function(err) {
          if (err) {
            console.error('[create history]', 'Erro ao inserir nova history', err);
            //return next(err);
          }

          console.error('[create history]', 'Sucesso');
        });
};