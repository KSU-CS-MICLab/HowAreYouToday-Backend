const { Account, validate } = require('../../models/account')
const asyncMiddleware = require('../../middleware/async')

const login = asyncMiddleware (async (req, res) => {
    const user = await Account.find().where('uid').equals(req.user.uid)
    
    // TODO: 빈 객체 체크 다른방법은?
    if (Object.keys(user).length === 0 ) {
        const account = new Account({
            uid: req.user.uid,
            email: req.user.email
        })
        await account.save()
    }

    res.send({'data':'success'})
})

module.exports = {
    login
}