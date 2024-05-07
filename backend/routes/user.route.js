const UserController = require(`../controllers/user.controller`);

const Router = require(`express`);
const router = new Router();

router.post(`/register`, UserController.register);
router.post(`/login`, UserController.login);
router.get(`/get_user_data`, UserController.getUserData);
router.get(`/get_user_data_by_post`, UserController.getUserDataByPost);

module.exports = router;