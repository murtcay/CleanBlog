const Post = require('../modules/Post');
const moment = require('moment');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts: posts,
    moment: moment
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post: post,
    moment: moment
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.title = req.body.title;
  post.subtitle = req.body.subtitle;
  post.detail = req.body.detail;

  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.redirect('/');
};
