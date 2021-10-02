const express = require('express');
const router = express.Router();

const roleController = require('../controllers/RoleController.js');

router.post('/store', roleController.addRole); //OK
router.get('/list', roleController.getAllRole); //OK (pagination)
router.get('/:id/detail', roleController.getRoleByID); //OK
//dùng phương thức POST để update
//có thể dùng phương thức PUT để đúng chuẩn RESTful
router.post('/:id/update', roleController.updateRole); //trả về data cũ object đã được update //OK
//dùng phương thức POST để delete
//có thể dùng phương thức DELETE để đúng chuẩn RESTful
router.post('/:id/delete', roleController.deleteRole); //OK
module.exports = router;