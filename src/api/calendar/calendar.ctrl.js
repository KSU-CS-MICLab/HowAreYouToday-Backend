const { Account, validate } = require('../../models/account')
const asyncMiddleware = require('../../middleware/async')
const index = asyncMiddleware (async (req, res) => {
    const calendars = await Account.find({ $where: `this.uid == ${req.user.uid}` }, { "calendar": true })

    res.send(calendars)
})

const create = asyncMiddleware (async (req, res) => {
    let type = req.body.type
    // const account = await Account.findOneAndUpdate({ uid: req.body.uid }, {
    //     // calendar: {
    //     //     $push: {
    //     //         beginDate : req.body.date
    //     //     } 
    //     // }
    //     email: "update@test.com"
    // })
    
    res.send(account)
})

const destroy = asyncMiddleware (async (req, res) => {

})

module.exports = {
    index, create, destroy
}