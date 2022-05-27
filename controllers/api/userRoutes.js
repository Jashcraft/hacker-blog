const router = require('express').Router();
const {User} = require ('../../models')

router.post('/', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const data = await User.create({username, email, password});
    
        res.json(data);
    } catch(err) {
        res.json(err)
    }
})

module.exports = router;