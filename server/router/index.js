const userAPI = require('./userAPI.js');
const roleAPI = require('./roleAPI.js');
const accountAPI = require('./accountAPI.js');
const statusAPI = require('./statusAPI');
const auth = require('./auth');
const receiverStatusAPI = require('./receiverStatusAPI');
const essentialAPI = require('./essentialAPI');
const senderStatusAPI = require('./senderStatusAPI');
const vehicleCensorshipAPI = require('./vehicleCensorshipAPI');
const carStatusAPI = require('./carStatusAPI')
const reportAPI = require('./reportAPI');
function router(app){
    app.use('/api/user/',userAPI);
    app.use('/api/role/',roleAPI);
    app.use('/api/account/', accountAPI);
    app.use('/api/status/', statusAPI);
    app.use('/api/receiver', receiverStatusAPI);
    app.use('/api/essential', essentialAPI);
    app.use('/api/sender', senderStatusAPI);
    app.use('/api/vehicle_censorship', vehicleCensorshipAPI);
    app.use('/api/car_trip/', carStatusAPI);
    app.use('/api/report/', reportAPI);
    //lấy tên key của request về
    // app.post('/test',(req, res, next)=>{
    //     for(var key in req.body) {
    //         console.log(key);
    //     }
    // })
    app.use('/api/authentication', auth);
}

module.exports = router;