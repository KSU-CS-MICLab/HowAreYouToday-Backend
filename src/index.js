const error = require('./middleware/error')
const express = require('express');
const app = express();
const post = require('./api/post')
const comment = require('./api/post/comment')
const like = require('./api/post/like')
const login = require('./api/login')
const calendar = require('./api/calendar')
const mongoose = require('mongoose')
const firebaseAuth = require('./middleware/auth')
const cors = require('cors')
const firebase = require("firebase-admin");

app.use(express.json());
app.use(cors())
app.use(firebaseAuth)
app.use('/posts', post);
app.use('/comments', comment);
app.use('/likes', like);
app.use('/login', login);
app.use('/calendars', calendar)
app.use(error)

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const db = mongoose.connection
mongoose.connect(`mongodb://${process.env.DB_HOST || 'localhost'}:27017/${process.env.DB}`)
db.on('error', console.error)
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server")
})

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
  