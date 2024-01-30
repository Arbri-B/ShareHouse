const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.get('/api/posts',authenticate,  PostController.getAllPosts);
    app.get('/api/posts/top3',authenticate, PostController.getTopThreePosts)
    app.post('/api/post',authenticate, PostController.createPost);  
    app.get('/api/post/:id',authenticate, PostController.getOnePost);
    app.put('/api/post/:id',authenticate, PostController.getOnePostAndUpdate);
    app.delete('/api/post/:id',authenticate, PostController.deletePost);
    // app.patch('/api/post/:id', authenticate, PostController.getOnePostAndUpdate);
}
