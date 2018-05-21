/* API logic (controller) */
const Post = require('../../models/posts')

const index = (req, res) => {
    Post.find(function(err, posts){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(posts);
    })
}

const show = (req, res) => {
    Post.findOne({_id: req.params.id}, function(err, post){
        if(err) return res.status(500).json({error: err});
        if(!post) return res.status(404).json({error: 'post not found'});
        res.json(post);
    })
}

const destroy = (req, res) => {
    Post.remove({ _id: req.params.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        // ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "post not found" });
        res.json({ message: "post deleted" });
        
        res.status(204).end();
    })
}

const create = (req, res) => {
    const post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;

    post.save(function (err) {
        if (err) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });

    });
}

const update = (req, res) => {
    Post.update({ _id: req.params.id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'post not found' });
        res.json( { message: 'post updated' } );
    })
}

module.exports = {
    index, show, destroy, create, update,
}