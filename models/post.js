const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { commentSchema } = require('./comment')

const Post = new Schema({
    createdAt: { type: Date, default: Date.now },
    writer: { 
        type: String,
        required: true,
    },
    title: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    content: { 
        type: String,
        required: true,
        minlength: 10
    },
    comments: { 
        type: [commentSchema],
        default: []
    },
    commentsCount: { type: Number, default: 0 }
});

const validatePost = (req) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        content: Joi.string().min(10).required(),
        writer: Joi.string().required()
    }

    return Joi.validate(req, schema)
}

module.exports = {
    Post: mongoose.model('post', Post),
    validate: validatePost
}