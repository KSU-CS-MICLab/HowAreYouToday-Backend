const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    content: {
        type: String,
        required: true,
        minlength: 3
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    hasReplies: {
        type: Boolean,
        default: false
    }
});

commentSchema.add({ replies: [commentSchema] });
const Comment = mongoose.model('Comment', commentSchema);

const validateComment = (req) => {
    const schema = {
        commentId: Joi.string(),
        level: Joi.number().required(),
        content: Joi.string().min(3).required(),
    }

    return Joi.validate(req, schema)
}

module.exports = {
    commentSchema: commentSchema,
    Comment: Comment,
    validate: validateComment
}