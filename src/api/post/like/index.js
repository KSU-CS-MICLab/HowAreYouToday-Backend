/* Routing */
const express = require('express');
const router = express.Router();
const likeCtrl = require('./like.ctrl')

router.post('/:likeId', likeCtrl.like)
// router.get('/:likeId', likeCtrl.isLiked)
router.delete('/:likeId', likeCtrl.unLike)

module.exports = router;