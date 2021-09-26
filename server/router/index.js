const userAPI = require('./userAPI.js');
const roleAPI = require('./roleAPI.js');
const accountAPI = require('./accountAPI.js');
const statusAPI = require('./statusAPI');
const auth = require('./auth');
const receiverStatusAPI = require('./receiverStatusAPI')
const essentialAPI = require('./essentialAPI')

function router(app){
    app.use('/api/users/',userAPI);
    app.use('/api/roles/',roleAPI);
    app.use('/api/accounts/', accountAPI);
    app.use('/api/status/', statusAPI);
    app.use('/api/receiver', receiverStatusAPI);
    app.use('/api/essential', essentialAPI);
    //lấy tên key của request về
    // app.post('/test',(req, res, next)=>{
    //     for(var key in req.body) {
    //         console.log(key);
    //     }
    // })
    app.use('/login', auth);
}

module.exports = router;