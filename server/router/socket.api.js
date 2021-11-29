const conversationAPI = require('./conversationAPI'); 

let accounts = [];

const addAccount = (account_id, socket_id) =>{
    !accounts.some(account => account.account_id === account_id)
        && accounts.push({account_id, socket_id});
}
const removeAccount = (socket_id) =>{
    accounts = accounts.filter(account => account.socket_id !== socket_id)
}
const getAccount = (account_id) =>{
    return accounts.find(account => account.account_id === account_id);
}
const checkObject = (object) =>{
    return object && Object.keys(object).length>0?true:false;
}
function router(app,io){
    io.on('connection', (socket) => {
        console.log('A USER CONNECTED');
        socket.emit('welcome', 'hello this is socket server');
        io.emit('getConversation', 123);
        socket.on('addAccount', (account_id) =>{
            addAccount(account_id, socket.id)
            io.emit('getAccounts', accounts)
        })
        socket.on('sendMessage', ({sender_id, receiver_id, text})=>{
            const account =  getAccount(receiver_id);
            if(account)
                io.to(account.socket_id).emit('getMessage', {
                    sender_id,
                    text
                })
        })
        socket.on('checkReceiver', ({sender_id, receiver_id}) =>{
            const receiver = getAccount(receiver_id);
            const sender = getAccount(sender_id);
            const check = checkObject(receiver);
            io.to(sender.socket_id).emit('checkSocket', check);
        })
        socket.on('disconnect',() =>{
            console.log('a user disconnected!')
            removeAccount(socket.id);
            io.emit('getAccounts', accounts)
        })
    });
    app.use('/api/conversation/', conversationAPI);
    
}

module.exports = router;