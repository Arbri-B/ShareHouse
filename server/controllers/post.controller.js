const Post = require('../models/post.model');

async function getLatLongFromAddress(address) {
    try {
        const apiKey = 'AIzaSyDNOnnW2lR3qZJqjZ8ZO2w4K0ajm-zmyGA'; 
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

            const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Error fetching geocoding data');
        }

        const data = await response.json();

        if (data.results.length === 0) {
            throw new Error('No results found for the given address');
        }

        const location = data.results[0].geometry.location;
        const {
            lat,
            lng: long
        } = location;

        return {
            lat,
            long
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports.getAllPosts = (req, res) => {
    Post.find().sort({
            createdAt: -1
        })
        .then((allPosts) => {

            res.json({
                posts: allPosts
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.getTopThreePosts = (req, res) => {
    Post.find().sort({
            votesCount: -1
        }).limit(3)
        .then((allPosts) => {

            res.json({
                posts: allPosts
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.getOnePost = (req, res) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(onePost => {
            res.json({
                post: onePost
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.createPost = async (req, res) => {
    const coordinates = await getLatLongFromAddress(req.body.address);
    const post = {
        title: req.body.title,
        address: req.body.address,
        description: req.body.description,
        lat: coordinates.lat,
        long: coordinates.long,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }
    console.log(coordinates);
    Post.create(post)
        .then(newlyCreatedPost => {
            res.json({
                post: newlyCreatedPost
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.getOnePostAndUpdate = (req, res) => {
    Post.findOneAndUpdate({
                _id: req.params.id
            },
            req.body, {
                new: true
            }
        )
        .then(updatedPost => {
            res.json({
                poll: updatedPost
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}


module.exports.deletePost = (req, res) => {
    Post.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.json({
                result: result
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}