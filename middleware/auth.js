const firebase = require("firebase-admin")

exports.firebaseAuth = (req, res, next) => {
    let idToken = req.header('x-auth-token')
    if (!idToken) return res.status(401).send('Access denied. No token provided.')

    firebase.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            console.log(`UID : ${uid}`)
         }).catch(function(error) {
            console.log(`Error : ${error}`)
         });
}