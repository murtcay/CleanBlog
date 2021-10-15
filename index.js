const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();
const port = 3000;

// connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TEMPALATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

// ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/add-post', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add-post', pageController.getPostAddPage);
app.get('/posts/edit/:id', pageController.getPostEditPage);

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});
