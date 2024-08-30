const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const jwt = require('jsonwebtoken');


router.get('/register', (req,res)=>{res.render('register')})
router.post('/register',userController.Register)

router.get('/login', (req,res)=>{res.render('login')})
router.post('/login',userController.Login)

router.get('/dashboard',(req,res)=>{
    if(!req.session.token){
        return res.redirect('/login')
    };

    const decode = jwt.verify(req.session.token,process.env.jwt_secret);

    res.render('dashboard',(role,id))
})

module.exports = router;