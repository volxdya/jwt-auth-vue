const mongoose = require('mongoose');

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

module.exports = mongoose.model('post', postSchema);