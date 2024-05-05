
// CREATE SERVER
const express = require(`express`);

const app = express();
const PORT = 3006;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// SETTINGS SERVER
const cors = require('cors');
app.use(cors());
app.use(express.json());

// SETTINGS DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/auth');

// ROUTERS
const user = require(`./routes/user.route`);
const post = require(`./routes/post.route`);


// ROUTES
app.use(`/`, user);
app.use(`/`, post);

// hello danil