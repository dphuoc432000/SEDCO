

const pagination = (data_list, _limit, _page) =>{
    // console.log(_page, _limit)
    if(_page){
        if(_page < 1)
            _page = 1;
        const start = (_page - 1) * _limit;
        const finish = _page * _limit;
        const arr = data_list.slice(start,finish);
        return arr;
    }
    else
        return data_list;
}

module.exports = pagination;