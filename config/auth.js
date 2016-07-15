// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '542287709267996', // your App ID
        'clientSecret'  : 'bb57d00feb3d66657c352923a4a7a109', // your App Secret
        'callbackURL'   : 'https://dry-headland-13207.herokuapp.com/auth/facebook/callback',
        'profileFields' : ['id', 'emails', 'first_name', 'last_name', 'gender']
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};