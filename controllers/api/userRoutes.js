const router = require('express').Router();
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = await User.create({ username, email, password });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.json({user: userData, message: 'Logged In'})
    })
  } catch (err) {
    res.json(err)
  }
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  try {
      const userData = await User.findOne({
        where: {
          username: username
        }
      })
      if(!userData){
        return res.status(400).json('Invalid Credentials');
      }

      const isValidPw = await userData.checkPassword(password);
      if(!isValidPw){
        return res.status(400).json('Invalid Credentials');
      }
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = userData.id;
        res.json({user: userData, message: 'Logged In'})
      })
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})


router.post('/logout', async (req, res) =>{
  if (req.session.loggedIn){
    req.session.destroy(()=>{
      res.json("Logged Out");
    })
  }
})
module.exports = router;