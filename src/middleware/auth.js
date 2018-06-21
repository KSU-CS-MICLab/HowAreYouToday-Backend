const firebase = require("firebase-admin")

module.exports = function (req, res, next) {
    let idToken = req.header('x-auth-token')
    if (!idToken) return res.status(401).send('Access denied. No token provided.')

    firebase.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            req.user = {}
            req.user.email = decodedToken.email
            req.user.uid = decodedToken.uid
            next()
         }).catch(function(error) {            
            next(error)
         });
}