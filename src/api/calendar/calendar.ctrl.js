const { Account, validate } = require('../../models/account')
const asyncMiddleware = require('../../middleware/async')
const index = asyncMiddleware (async (req, res) => {
    const account = await Account.findOne().where('uid').equals(req.user.uid)
    
    res.send(account)
})

const create = asyncMiddleware (async (req, res) => {
    const account = await Account.findOneAndUpdate({ uid: req.user.uid }, {
        $push: {
            "calendar.beginDate" : req.body.beginDate,
            "calendar.endDate" : req.body.endDate
        }
    }, { new: true })
    
    res.send(account)
})

const destroy = asyncMiddleware (async (req, res) => {
    let type = req.body.type
    let account
    if(type === "begin") {

        account = await Account.findOneAndUpdate({ uid: req.user.uid }, {  
            $pull: {
                "calendar.beginDate" : req.body.date
            }
        }, { new: true })        
    }
    else if(type === "end") {

        account = await Account.findOneAndUpdate({ uid: req.user.uid }, {  
            $pull: {
                "calendar.endDate" : req.body.date
            }          
        }, { new: true })
    }
    else if(type === "pills") {

        account = await Account.findOneAndUpdate({ uid: req.user.uid }, {  
            $pull: {
                "calendar.pillsDate" : req.body.date
            }          
        }, { new: true })
    }

    res.send(account)
})

module.exports = {
    index, create, destroy
}