const express = require('express');
const app = express();
const post = require('./api/post')

app.use(express.json());

app.use('/posts', post);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));