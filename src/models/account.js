const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    calendar: {
        beginDate: {
            type: Array,
            default: []
        },
        endDate: {
            type: Array,
            default: []
        },
        pillsDate: {
            type: Array,
            default: []
        }
    }
})

const validateAccount = (req) => {
    const schema = {
        uid: Joi.String().required(),
        email: Joi.String.required()
    }
    return Joi.validate(req, schema)
}

module.exports = {
    Account: mongoose.model('account', accountSchema),
    validate: validateAccount
}