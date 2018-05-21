var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
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