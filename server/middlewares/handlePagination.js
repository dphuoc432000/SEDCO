const handlePagination = (_limit,_page,totalRows) =>{
    let limit = parseInt(_limit);
    let page =  parseInt(_page);
    if(limit && page){
        if(page < 1 || typeof page !== 'number')
            page = 1;
        if(limit < 1 || typeof limit !== 'number')
            limit = 1;
    }
    return {
        _limit: limit,
        _page: page,
        totalRows
    }
}

module.exports = handlePagination;