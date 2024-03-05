const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer')
const path = require('path')
const port= 8000;

require('dotenv').config();

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});


app.use(express.json()); 
app.use(express.urlencoded({
    extended: true
})); 

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/post.routes')(app);
require('./routes/user.routes')(app);


const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})
