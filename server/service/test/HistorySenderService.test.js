const historySenderService = require('../HIstorySenderService');
jest.useRealTimers();

test('check_car_status: ', async () =>{
    jest.setTimeout(10 * 1000)
    return await historySenderService.check_car_status('6176b7514e1de109cbbf8531')
        .then(data => {expect(data).toBe(true)})
    
}, 10000)