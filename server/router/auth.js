const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');
const authmiddle = require('../middlewares/auth');

router.get('/check_login', authmiddle.check_login);
router.get("/logined", authmiddle.check_login);
router.post('/',  authenticationController.login)

module.exports = router;