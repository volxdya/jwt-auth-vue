const Router = require(`express`);
const router = new Router();

const PostController = require(`../controllers/post.controller`);

router.get(`/get_posts_user`, PostController.getPostsUser);
router.get(`/delete_post`, PostController.deletePost);
router.post(`/edit_post`, PostController.editPost);
router.post(`/create_post`, PostController.createPost);

module.exports = router;