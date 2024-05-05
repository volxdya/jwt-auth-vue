const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    post_id: {
        type: mongoose.ObjectId,
        ref: 'post'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('like', likeSchema);