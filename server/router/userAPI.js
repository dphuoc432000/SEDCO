const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController.js');

router.post('/store', userController.addUser);
router.get('/user_list', userController.getAllUser);
router.get('/details/:id', userController.getUserByID);
//dùng phương thức POST để update
//có thể dùng phương thức PUT để đúng chuẩn RESTful
router.post('/update/:id', userController.updateUser); // trả về dữ liệu cũ
//dùng phương thức POST để delete
//có thể dùng phương thức DELETE để đúng chuẩn RESTful
router.post('/delete/:id', userController.deleteUser);
module.exports = router;