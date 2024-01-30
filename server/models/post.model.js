const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'The title should be more than 5 characters'],
        required: [true, 'The title is required']
    },
    description: {
        type: String,
        minLength: [5, 'The description should be longer than 5 characters'],
        required: [true, 'Description is required']
    },
    address: {
        type: String,
        minLength: [5, 'The address should be longer than 5 characters'],
        required: [true, 'Address is required']
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    imageUrl: {
        type: String,
        required: [true, "The image URL is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
