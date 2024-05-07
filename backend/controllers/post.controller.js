const Post = require(`../models/post`);

class PostController {
    async getPostsUser(req, res) {
        const { author_id } = req.query;

        try {
            const post = await Post.find({ author_id: author_id }).sort({ createdAt: -1 });

            res.send(post);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async createPost(req, res) {
        const { author_id, text } = req.body;

        try {
            const post = new Post({
                author_id: author_id,
                text: text,
            });

            await post.save();

            res.send(post);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async getPostsUser(req, res) {
        const { author_id } = req.query;

        try {
            const post = await Post.find({ author_id: author_id }).sort({ createdAt: -1 });

            res.send(post);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async deletePost(req, res) {
        const { id } = req.query;
        await Post.deleteOne({ _id: id });

        res.send('ok');
    }

    async editPost(req, res) {
        const { id, text } = req.body;
        const post = await Post.findOne({ _id: id });
        try {
            post.text = text;

            await post.save();
            res.send(post);
        } catch (err) {
            console.log(err);
            res.sendStatus(404);
        }
    }

    async getAllPosts(req, res) {
        const posts = await Post.find();

        res.send(posts);
    }
}

module.exports = new PostController();