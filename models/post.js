const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    content: String
});

const Post = new Schema({
    createdAt: { type: Date, default: Date.now },
    writer: { 
        type: String,
        required: true,
    },
    title: { 
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    content: { 
        type: String,
        required: true,
    },
    likesCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    comments: { 
        type: [Comment],
        default: []
    }
});

const validatePost = (post) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        content: Joi.string().min(10).required(),
        writer: Joi.string().required()
    }
}

module.exports = {
    Post: mongoose.model('post', Post),
    validate: validatePost
}