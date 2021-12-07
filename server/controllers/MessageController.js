const messageService  = require('../service/MessageService');
const handleOther = require('./handleOther');

class MessageController {

    //tạo conversation
    createMessage = async (req, res, next) =>{
        await messageService.createMessage(req.body)
            .then(data =>{
                if(data){
                    if(data === 'NO ACCOUNT IN CONVERSATION')
                        return res.status(400).json(handleOther.errorHandling("Account không nằm trong phòng chat này!", null));
                    return res.json(data)
                }
                return res.status(400).json(handleOther.errorHandling("ID người gửi hoặc phòng chat không đúng!", null));
            })
            .catch(err => next(err))
    }

     //lấy tin nhắn của phòng chat
    getMessageByConversationID = async (req, res, next) =>{
        await messageService.getMessageByConversationID(req.params.conversation_id_pr, req.query._limit, req.query._page)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Conversation id không đúng!", null));
            })
            .catch(err => next(err));
    }
    watchedMessagesOfConversation = async(req, res, next) =>{
        await messageService.watchedMessagesOfConversation(req.params.conversation_id_pr, req.params.account_id_pr)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("Conversation hoặc account id không đúng!", null));
            })
            .catch(err => next(err));
    }

}

module.exports = new MessageController();