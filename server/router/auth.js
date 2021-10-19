const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');
const authmiddle = require('../middlewares/auth');
const {validate_login, validate_register,validation_result} = require('../middlewares/validator');
const path = require('path');

router.get('/check_login', authmiddle.check_login);//OK
router.post('/login',validate_login(), validation_result,authenticationController.login);//OK
router.post('/register_user',validate_register(), validation_result, authenticationController.register);//OK
router.get("/logout", authenticationController.logout);//OK
router.post('/forgot_password', authenticationController.forgotPassword)

router.get('/signin', (req,res, next) =>{res.sendFile(path.join("F:\\daiHoc\\Nam IV\\Capstone1\\SEDCO\\server", 'index.html'))})
router.post("/signin", authenticationController.signin);
router.post("/refreshtoken", authenticationController.refreshToken);
router.get("/test", authmiddle.verifyToken, authmiddle.checkRole(['user']),(req, res)=>{res.json("123")});


module.exports = router;