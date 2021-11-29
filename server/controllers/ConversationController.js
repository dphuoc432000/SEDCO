const conversationService = require('../service/ConversationService');
const handleOther = require('./handleOther');

class ConversationController {

    //tạo conversation
    createConversation = async (req, res, next) =>{
        const members = [req.body.sender_id, req.body.receiver_id]
        await conversationService.createConversation(members)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling("ID người gửi hoặc người nhận không đúng!", null));
            })
            .catch(err => next(err))
    }

    //lấy tất cả conversation của account bằng account_id
    getConversationByAccountID = async (req, res, next) =>{
        // const io = req.app.get('socketio');
        await conversationService.getConversationByAccountID(req.params.account_id_pr, req.query._limit, req.query._page)
            .then(data =>{
                if(data){
                    // io.emit('getConversation',data);
                    return res.json(data);
                }
                return res.status(400).json(handleOther.errorHandling("ID account không đúng!", null));
            })
            .catch(err => next(err));
    }
    

}

module.exports = new ConversationController();