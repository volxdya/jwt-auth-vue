const Router = require(`express`);
const router = new Router();

const LikeController = require(`../controllers/like.controller`);

router.post(`/create_like`, LikeController.createLike);
router.get(`/get_likes_by_post`, LikeController.getLikesByPost);
router.post(`/delete_like`, LikeController.deleteLike);
module.exports = router;