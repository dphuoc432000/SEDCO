const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');
const statusController = require('../controllers/StatusController.js');
const multer = require("multer");

//thêm mới status bao gồm tạo status, status detail, đổi role user theo loại status và lưu hình
// router.post('/:account_id_pr/:status_type_pr/create', authmiddleware.check_login, authmiddleware.check_user_create_status, uploadFile.uploadFileStatus('uploads/status').single('picture'), statusController.addStatus); //OK
router.get('/no_completed/list', statusController.getAllStatusNoComplete);//OK
router.get('/list', statusController.getAllStatus);//OK (Pagination)
router.get('/:status_type_pr/list', statusController.getAllStatusByType);//OK
router.get('/:status_type_pr/list/filter', statusController.getAllStatusByType_Filter);//OK
router.get('/:status_type_pr/no_completed/list', statusController.getAllStatusByTypeNoComplete);//OK
router.get('/:status_id/detail', statusController.getStatusByID);//OK
// // không cho phép update UserID
// // roleID được update tự động gán nút theo vai trò chuyển. Nên không cần nhập role ID
router.post('/update/:status_id_pr', statusController.updateStatus);
//xóa status bao gồm xóa status, status detail, đổi role user thành user và xóa hình 
router.post('/:status_id_pr/delete', statusController.deleteStatus);//OK
//Lấy status hiện có chưa hoàn thành của account
router.get('/account_id/:account_id_pr/detail', statusController.getStatusDetailByAccountID);
//lấy status gần nhất
router.get('/get/recent/list', statusController.getRecentStatus);
//lấy về tất cả lịch sử nhận nhu yếu phẩm của môt receiver status bằng receiver status id
router.get('/history/receiver/:receiver_status_id_pr/list', authmiddleware.check_login, authmiddleware.checkRole(['admin']), statusController.getAllHistoryRegisterReceiverByReceiverStatusID);
router.get('/history/sender/:sender_status_id_pr/list', authmiddleware.check_login, authmiddleware.checkRole(['admin']), statusController.getAllHistoryRegisterSenderBySenderStatusID);
module.exports = router;