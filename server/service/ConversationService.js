const Conversation = require('../models/Conversation');
const {mongooseToObject, multiplemongooseToObject} = require('../util/mongoose');
const Account = require('../models/Account');
const handlePagination = require('../middlewares/handlePagination');
const Message = require('../models/Message');

class ConversationService{

    //tạo phòng chat
    createConversation = async (members) =>{
        //kiểm tra account
        const check_sender_account = await Account.findOne({_id: members[0]})
            .then(data => data?true:false)
            .catch(err => err);
        const check_receiver_account = await Account.findOne({_id: members[1]})
            .then(data => data?true:false)
            .catch(err => err);
        if(check_receiver_account && check_sender_account){
            const conversation = new Conversation({members})
            return await conversation.save()
                .then(data => mongooseToObject(data))
                .catch(err => err);
        }
        return null;
    }

    //lấy tats car conversation của account
    getConversationByAccountID = async (account_id, _limit, _page) =>{
        const totalRows = await Conversation.count({members: {$in:[account_id]}});
        const pagination = handlePagination(_limit,_page,totalRows);
        const start = (pagination._page * pagination._limit) - pagination._limit;

        const conversation_list =  await Conversation.find({members: {$in:[account_id]}})
            .skip(start)
            .limit(pagination._limit)
            .sort('-updatedAt')
            .then(async datas =>{
                let list = multiplemongooseToObject(datas);
                list = await Promise.all(list.map(async item =>{
                    const messages_no_watch = await Message.find({conversation_id: item._id, account_id:{$nin:[account_id]}, watched: false})
                        .then(data => multiplemongooseToObject(data));
                    return {
                        ...item,
                        watched: messages_no_watch.length>0?false:true
                    }
                }))
                return list;
            })
            .catch(err => err);
        return{
            conversation_list,
            pagination,
        }
    }
    
    //lấy conversation của mình và người dùng khác
    getConversationByAccountIDAndReceiverID = async (account_id, receiver_id) =>{
        //kiểm tra account
        const check_sender_account = await Account.findOne({_id: account_id})
            .then(data => data?true:false)
            .catch(err => err);
        const check_receiver_account = await Account.findOne({_id: receiver_id})
            .then(data => data?true:false)
            .catch(err => err);
        if(check_receiver_account && check_sender_account){
            return await Conversation.findOne({members: {$all:[account_id, receiver_id]}})
                .then(data => mongooseToObject(data))
                .catch(err => err)
        }
        return null;
    }
    
}
module.exports = new ConversationService();