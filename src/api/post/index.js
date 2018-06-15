/* Routing */
const express = require('express');
const router = express.Router();
const postCtrl = require('./post.ctrl')
const commentCtrl = require('./comment/comment.ctrl')

router.get('/', postCtrl.index)
router.get('/:postId', postCtrl.show)
router.delete('/:postId', postCtrl.destroy)
router.post('/', postCtrl.create)
router.put('/:postId', postCtrl.update)
router.get('/:postId/comments', commentCtrl.getCommentList)
router.post('/:postId/comments', commentCtrl.writeComment)

module.exports = router;