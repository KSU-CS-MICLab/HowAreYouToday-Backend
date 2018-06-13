/* API logic (controller) */
const { Post, validate } = require('../../models/post')
const likesUtil = require('../../utils/likes')
const asyncMiddleware = require('../../middleware/async')

const index = asyncMiddleware (async (req, res) => {
    const posts = await Post.find({}, { title: true }).lean()
    
    /* 해당 게시물들의 좋아요 갯수 */
    let postIds = []
    for (const post of posts) {
        postIds.push(JSON.parse(JSON.stringify(post))._id)
    }

    let postsLikeCount = await Promise.all(likesUtil.getCountList('post', postIds))
    for (const [i, post] of posts.entries()) {
        post.likeCount = postsLikeCount[i]
    }

    res.send(posts)
})

const show = asyncMiddleware (async (req, res) => {
    const post = await Post.findById(req.params.postId, { comments: false }).lean()
    if (!post) return post.status(404).send('The post was not found. :)')

    /* 좋아요 갯수 세기 */
    let likeCount = await likesUtil.getLikeCount('post', req.params.postId)

    // TODO:
    /* 좋아요 여부 확인 */
    // let isLiked = await likesUtil.isLiked('post', req.params.postId, req.user)
    // post.isLiked = isLiked
    post.likeCount = likeCount

    res.send(post)    
})

const destroy = asyncMiddleware (async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.postId)

    if (!post) return post.status(404).send('The post was not found. :)')
    
    // TODO:
    /* 좋아요 정보 삭제 */
    await likesUtil.deleteLikeInfo('post', req.params.postId)
    res.send(post)
})

const create = asyncMiddleware (async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
     
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer
    })

    await post.save()

    res.send(post)
})

const update = asyncMiddleware (async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        content: req.body.content,
    }, { new: true })

    if (!post) return post.status(404).send('The post was not found. :)')
    
    res.send(post)
})

module.exports = {
    index, show, destroy, create, update,
}