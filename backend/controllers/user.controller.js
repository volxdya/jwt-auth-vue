const jwt = require('jsonwebtoken');
const DEV_KEY = "DEV_KEY";

const User = require(`../models/user`);

class UserController {
    async register(req, res) {
        const user = new User({
            login: req.body.login,
            password: req.body.password,
        });
        try {
            await user.save();
            res.send(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async login(req, res) {
        // FIND USER BY FORM-FIELDS (USERNAME + PASSWORD)
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        // IF (USER) => CREATE TOKEN AND SEND HIM
        try {
            const token = jwt.sign({
                login: user.login,
                id: user._id
            }, DEV_KEY);

            res.send({ token: token })
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async getUserData(req, res) {
        const user = await User.findOne({ _id: req.query.id });
        try {
            res.send(user);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async getUserDataByPost(req, res) {
        const { author_id } = req.query;

        const user = await User.findOne({ _id: author_id });

        try {
            res.send(user);
        } catch (err) {
            res.send(404);
            console.log(err);
        }
    }
}

module.exports = new UserController();