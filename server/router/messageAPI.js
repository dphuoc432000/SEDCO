const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const messageController = require('../controllers/MessageController');

//tạo tin nhắn
router.post('/create', messageController.createMessage)
router.get('/:conversation_id_pr/list', messageController.getMessageByConversationID)
//xem tin nhắn
router.post('/:conversation_id_pr/:account_id_pr/watched/messages', messageController.watchedMessagesOfConversation)
module.exports = router;