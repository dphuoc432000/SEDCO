const express = require('express');
const router = express.Router();

const roleController = require('../controllers/RoleController.js');

router.post('/store', roleController.addRole);
router.get('/role_list', roleController.getAllRole);
router.get('/details/:id', roleController.getRoleByID);
//dùng phương thức POST để update
//có thể dùng phương thức PUT để đúng chuẩn RESTful
router.post('/update/:id', roleController.updateRole); //trả về data cũ object đã được update
//dùng phương thức POST để delete
//có thể dùng phương thức DELETE để đúng chuẩn RESTful
router.post('/delete/:id', roleController.deleteRole);
module.exports = router;