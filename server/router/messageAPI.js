const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const messageController = require('../controllers/MessageController');

//tạo tin nhắn
router.post('/create', messageController.createMessage)
router.get('/:conversation_id_pr/list', messageController.getMessageByConversationID)
module.exports = router;