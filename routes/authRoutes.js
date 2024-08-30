const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.post('/register',userController.Register)
router.post('/login',userController.Login)



module.exports = router;