const {BlogPost, User} = require('../models')
const router = require('express').Router();

router.get('/', async (req, res) => {
  const postsData = await BlogPost.findAll({
    include: [User]
  })  
  const posts = postsData.map(post => {
    return post.get({plain: true})
  })

  res.render('allPosts', { posts, loggedIn: req.session.loggedIn})
})

router.get('/signup', (req, res) => {
  if(req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('signup')
})

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
})

module.exports = router;