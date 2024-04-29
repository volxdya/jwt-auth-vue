const express = require(`express`);

const app = express();
const PORT = 3006;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

let cors = require('cors');
app.use(cors());


app.use(express.json());

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/auth');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
});

const User = mongoose.model('user', userSchema);

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('post', postSchema);

const jwt = require('jsonwebtoken');
const DEV_KEY = "DEV_KEY";

app.post(`/register`, async (req, res) => {
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
});

app.post(`/login`, async (req, res) => {
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

        res.send({token: token})
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

app.get(`/get_user_data`, async (req, res) => {
    const user = await User.findOne({_id: req.query.id});

    try {
        res.send(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

app.post(`/create_post`, async (req, res) => {
    const {author_id, text} = req.body;

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
});

app.get(`/get_posts_user`, async (req, res) => {
    const {author_id} = req.query;
    try {
        const post = await Post.find({author_id: author_id});

        res.send(post);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});