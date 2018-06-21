const express = require('express')
const router = express.Router()
const calendarCtrl = require('./calendar.ctrl')

router.get('/', calendarCtrl.index)
// router.post('/', calendarCtrl.beginCreate)
// router.post('/', calendarCtrl.endCreate)
router.post('/', calendarCtrl.create)
router.delete('/', calendarCtrl.destroy)

module.exports = router;