const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    writer: String,
    created: Date,
    likes: Number,
    comments: {
        name: String,
        message: String,
        created: Date
    }
});

module.exports = mongoose.model('post', postSchema);