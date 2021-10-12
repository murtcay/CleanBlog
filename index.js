const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const Post = require('./modules/Post');

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

// ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {
        posts: posts
    });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add-post', (req, res) => {
  res.render('add-post');
});

app.post('/add-post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});
