const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');

const pagination = (data_list, _limit, _page) =>{
    // console.log(_page, _limit)
    if(_page && _limit){
        if(_page < 1)
            _page = 1;
        if(_limit < 1)
            _limit = 1;
        const start = (_page - 1) * _limit;
        const finish = _page * _limit;
        const arr = data_list.slice(start,finish);
        return arr;
    }
    else
        return data_list;
}


// const pagination2 = async (model, _limit, _page) =>{
//     // console.log(_page, _limit)
//     _page = parseInt(_page);
//     _limit = parseInt(_limit);
//     if(_page && _limit){
//         if(_page < 1)
//             _page = 1;
//         if(_limit < 1)
//             _limit = 1;
//         const start = (_page-1) * _limit;
//         const finish = _page * _limit;
//         console.log('start:' , start, " limit: ",_limit )
//         return await model.find({})
//             .limit(_limit)
//             .skip(start)
//             .then(data => {console.log('datapagina: ', data);return multiplemongooseToObject(data)})
//             .catch(err => err);
//     }
//     else
//         return await model.find({})
//             .then(data => multiplemongooseToObject(data))
//             .catch(err => err);
// }

module.exports = pagination;