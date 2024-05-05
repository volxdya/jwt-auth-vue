const Like = require(`../models/like`);

class LikeController {
    async createLike(req, res) {
        const { post_id, user_id } = req.body;

        const like = new Like({
            post_id: post_id,
            user_id: user_id
        });

        await like.save();

        res.send(like);
    }
    async getLikesByPost(req, res) {
        const { post_id } = req.query;
        const likes = await Like.find({ post_id: post_id });

        res.send(likes);
    }

    async deleteLike(req, res) {
        const { post_id } = req.body;

        await Like.deleteOne({ post_id: post_id });

        res.send(`ok`);
    }
}

module.exports = new LikeController();