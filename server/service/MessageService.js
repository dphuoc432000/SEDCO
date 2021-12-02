const Message = require('../models/Message');
const {mongooseToObject, multiplemongooseToObject} = require('../util/mongoose');
const Account = require('../models/Account');
const Conversation = require('../models/Conversation')
const handlePagination = require('../middlewares/handlePagination');

class MessageService{

    //tạo phòng chat
    createMessage = async (object) =>{
        //kiểm tra conversation
        const check_conversation = await Conversation.findOne({_id: object.conversation_id})
            .then(data => data?true:false)
            .catch(err => err);

        //kiểm tra account
        const check_account = await Account.findOne({_id: object.account_id})
            .then(data => data?true:false)
            .catch(err => err);

        if(check_conversation && check_account){
            //kiểm tra có account trong phòng chat
            const check_account_in_conv =  await Conversation.findOne({_id: object.conversation_id, members: {$in:[object.account_id]}})
                .then(data => data?true:false)
                .catch(err => err);
            if(check_account_in_conv){
                object.watched = false;
                const message = new Message(object)
                return await message.save()
                    .then(data => mongooseToObject(data))
                    .catch(err => err);
            }
            return 'NO ACCOUNT IN CONVERSATION'
        }
        return null;
    }

    //lấy tin nhắn của phòng chat
    getMessageByConversationID = async (conversation_id, _limit, _page) =>{
        const totalRows = await Message.count({conversation_id: conversation_id});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const message_list = await Message.find({conversation_id: conversation_id})
            .skip(start)
            .limit(pagination._limit)
            .then(datas => multiplemongooseToObject(datas))
            .catch(err => err);
        return{
            message_list,
            pagination,
        }
    }

    //update những message đã đưuọc xem của account trong một conversation
    watchedMessagesOfConversation = async (conversation_id, account_id) =>{
        //kiểm tra conversation
        const check_conversation = await Conversation.findOne({_id: conversation_id})
            .then(data => data?true:false)
            .catch(err => err);
        //kiểm tra account
        const check_account = await Account.findOne({_id: account_id})
            .then(data => data?true:false)
            .catch(err => err);
        if(check_conversation && check_account)
            return await Message.updateMany({conversation_id: conversation_id, account_id: {$nin: [account_id]},watched: false}, {watched: true})
                .then(data => data)
                .catch(err => err);
        return null;
    }
    
}
module.exports = new MessageService();