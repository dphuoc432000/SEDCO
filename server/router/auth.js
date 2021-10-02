const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');
const authmiddle = require('../middlewares/auth');
const {validate_login, validate_register,validation_result} = require('../middlewares/validator');

router.get('/check_login', authmiddle.check_login);//OK
router.post('/login',validate_login(), validation_result,authenticationController.login);//OK
router.post('/register_user',validate_register(), validation_result, authenticationController.register);//OK
router.get("/logout", authenticationController.logout);//OK

module.exports = router;