const router = require('express').Router();
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = await User.create({ username, email, password });

    res.json(userData);
  } catch (err) {
    res.json(err)
  }
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  console.log('req', req)
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

      return res.json({user: userData, message: 'Logged In'})
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})

module.exports = router;