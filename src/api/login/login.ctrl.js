const { Account, validate } = require('../../models/account')
const asyncMiddleware = require('../../middleware/async')

const login = asyncMiddleware (async (req, res) => {
    const user = await Account.find().where('uid').equals(req.user.uid)

    const account = new Account({
        uid: req.user.uid,
        email: req.user.email
    })
    if (!user) {
        await account.save()
    }

    res.send(account)
})

module.exports = {
    login
}