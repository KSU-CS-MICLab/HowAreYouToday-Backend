/* Routing */
const express = require('express');
const router = express.Router();
const loginCtrl = require('./login.ctrl')

router.get('/', loginCtrl.login)

module.exports = router;