const UserController = require(`../controllers/user.controller`);

const Router = require(`express`);
const router = new Router();

router.post(`/register`, UserController.register);
router.post(`/login`, UserController.login);
router.get(`/get_user_data`, UserController.getUserData);

module.exports = router;