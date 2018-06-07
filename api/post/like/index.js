/* Routing */
const express = require('express');
const router = express.Router();
const postCtrl = require('./like.ctrl')

router.post('/', likeCtrl.like)


module.exports = router;