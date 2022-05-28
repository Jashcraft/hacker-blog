const router = require('express').Router();
const {BlogPost} = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
  const userPostsData = await BlogPost.findAll({
    where: {
      userId: req.session.userId
    }
  })

  const userPosts = userPostsData.map(post => {
    return post.get({plain: true})
  })
  console.log(userPosts)

  res.render('dashboard', {posts: userPosts, loggedIn: req.session.loggedIn})
})

router.get('/new', withAuth, (req, res) => {
  res.render('newBlogPost');
})

module.exports = router;
