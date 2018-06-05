/* Routing */
const express = require('express');
const router = express.Router();
const commentCtrl = require('./comment.ctrl')

router.get('/:commentId', commentCtrl.showDetails);
router.get('/:commentId/replies', commentCtrl.getReplies);

module.exports = router;