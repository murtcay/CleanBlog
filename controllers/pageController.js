const Post = require('../modules/Post');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getPostAddPage = (req, res) => {
  res.render('add-post');
};

exports.getPostEditPage = async (req, res) => {
  // console.log(req.params.id);
  const post = await Post.findById(req.params.id);
  res.render('edit-post', {
    post: post
  });
};
