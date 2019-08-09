var express = require('express');
var router = express.Router();
let User = require('../models/user');
/* GET users listing. */
router.post('/users', async (req, res)=> {
  try{
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      await user.save();
      res.status(201).json({user,token});
  }catch (e) {
      console.log(e);
      return res.status(500).send(e.toString())
  }
});

router.post('/users/login', async (req, res)=> {
    try{
        const user = await User.findByCridentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({user,token});

    }catch (e) {
        console.log(e);
        return res.status(500).send(e.toString())
    }
});


module.exports = router;
