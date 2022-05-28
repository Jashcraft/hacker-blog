const router = require('express').Router();
const {BlogPost} = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, (req, res) => {
    BlogPost.create({...req.body, userId: req.session.userId})
    .then(post => {
        res.json(post)
    })
})

module.exports = router;