const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const conversationController = require('../controllers/ConversationController');

//tạo phòng chat
router.post('/create', conversationController.createConversation)
router.get('/:account_id_pr/list', conversationController.getConversationByAccountID)
router.get('/:account_id_pr/:receiver_id_pr/get', conversationController.getConversationByAccountIDAndReceiverID)
module.exports = router;