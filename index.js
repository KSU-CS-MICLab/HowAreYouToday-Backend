const express = require('express');
const app = express();
const post = require('./api/post')
const mongoose = require('mongoose')
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

app.use(express.json());

app.use('/posts', post);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const db = mongoose.connection
db.on('error', console.error)
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server")
})

mongoose.connect('mongodb://localhost/test1')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
  