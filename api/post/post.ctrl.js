/* API logic (controller) */
const Post = require('../../models/post')

const index = async (req, res) => {
    const posts = await Post.find()

    res.send(posts)
}

const show = async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) return post.status(404).send('The post was not found. :)')

    res.send(post)    
}

const destroy = async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id)

    if (!post) return post.status(404).send('The post was not found. :)')

    res.send(post)
}

const create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })

    await post.save()

    res.send(post)
}

const update = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    })

    if (!post) return post.status(404).send('The post was not found. :)')
    
    res.send(post)
}

module.exports = {
    index, show, destroy, create, update,
}