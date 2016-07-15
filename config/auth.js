// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '736148913187959', // your App ID
        'clientSecret'  : '1e4961a1dfe1326e2e2204a17e3bec39', // your App Secret
        'callbackURL'   : 'http://dry-headland-13207/auth/facebook/callback',
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