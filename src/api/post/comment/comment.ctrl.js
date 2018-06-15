/* API logic (controller) */
const { Comment, validate } = require('../../../models/comment')
const { Post } = require('../../../models/post')
const asyncMiddleware = require('../../../middleware/async')

/* 해당 댓글 자세히 보기 | GET /comments/:commentId */
const showDetails = asyncMiddleware(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId)
    res.send(comment)
})

/* 댓글 작성 | POST /posts/:postId/comments */
const writeComment = asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    /* 부모 댓글(첫 번쨰 댓글)이면 그냥 업데이트 */
    let level = req.body.level
    const comment = new Comment({
        content: req.body.content,
        level: level
    })
    if (level === 0) {
        // TODO:
        await comment.save()
        const post = await Post.findByIdAndUpdate(req.params.postId, {
            $push: {
                comments: comment
            }
        }, { new: true })

    } 
    /* 자식 댓글 (즉 댓글에 대한 답글)이면, 부모 댓글 부분에 replies push */ 
    else {
        // TODO:
        console.log('WriteComment else')
        await Comment.findByIdAndUpdate(req.body.commentId, {
            $push: {
                replies: comment
            },
            hasReplies: true
        })
        console.log('asdf')
        await Post.findByIdAndUpdate(req.params.postId, {
            comments: {
                $eq: comment._id
            },
            $push: {
                replies: comment
            }
        })
        console.log('WriteComment success (else)')
    }
    // TODO:
    // if (!post) return post.status(404).send('The post was not found. :)')

    res.send({"data":"success"})

})

/* 해당 포스트의 댓글들 불러오기 | GET /posts/:postId/comments */
const getCommentList = asyncMiddleware(async (req, res) => {
    const comments = await Post.findById(req.params.postId, {'_id': false, 'comments': true })
    
    // TODO: 없을경우 처리

    res.send(comments) 
})

/* 해당 댓글의 답글들 보기 | GET /comments/:commentId/replies */
const getReplies = asyncMiddleware(async (req, res) => {
    const replies = await Comment.findById(req.params.commentId, {'_id': false, 'replies': true })

    // TODO: 없을경우 처리

    res.send(replies)
})

module.exports = {
    showDetails, writeComment, getCommentList, getReplies
}