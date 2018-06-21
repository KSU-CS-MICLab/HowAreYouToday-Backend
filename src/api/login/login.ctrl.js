const { Account, validate } = require('../../models/account')
const asyncMiddleware = require('../../middleware/async')

const login = asyncMiddleware (async (req, res) => {
    const user = await Account.find().where('uid').equals(req.user.uid)

    if (!user) {
        const account = new Account({
            uid: req.user.uid,
            email: req.user.email
        })
        await Account.save()
    }

    res.send({'data':'success'})
})