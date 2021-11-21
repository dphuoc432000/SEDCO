const CarStatus = require("../models/Car_Status");
const {
  multiplemongooseToObject,
  mongooseToObject,
} = require("../util/mongoose.js");
const fs = require("fs");
const path = require("path");
const carService = require("./CarService");
const Status = require("../models/Status");
const accountService = require("./accountService");
const { stat } = require("fs/promises");
const CarService = require("./CarService");

function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

class CarStatusService {
  checkShippingStatus = (censorship, departure_time, current_time) => {
    return censorship && current_time >= departure_time ? true : false;
  };
  checkReceivingStatus = (censorship, start_receiver_time, current_time) => {
    return censorship && current_time >= start_receiver_time ? true : false;
  };

  addCarStatus = async (status_id, user_id, object) => {
    const car_object = { ...object.car };
    const car_of_user = await carService.getCarByUserID(user_id);
    console.log("car_of_user", car_of_user);
    let car_id;
    if (!car_of_user) {
      car_id = await carService
        .addCar(user_id, car_object)
        .then((car_data) => car_data._id)
        .catch((err) => err);
    } else {
      car_id = await carService
        .updateCarByUserID(user_id, car_object)
        .then((car_data) => car_data._id)
        .catch((err) => err);
    }
    const date = new Date();
    const current_date = date.getDate();
    const current_month = date.getMonth() + 1;
    const current_year = date.getFullYear();
    const current_time = Date.parse(
      `${current_year}-${current_month}-${current_date}`
    );
    const start_receive_time = Date.parse(object.start_receive_time);
    const departure_time = Date.parse(object.departure_time);
    const car_status_object = {
      status_id: status_id,
      start_receive_time: object.start_receive_time,
      departure_time: object.departure_time,
      location_start: object.location_start,
      location_finish: object.location_finish,
      note: object.note,
      picture: object.picture,
      censorship: false,
      //Nếu mà tạo vào thì phải = false chờ admin kiểm duyệt rồi mới được cập nhật trạng thái. Khi được admin kiểm duyệt censorship = true thì
      //receiving_status, shipping_status được kiểm duyệt hàm dưới trong hàm cập nhật CarStatus
      // receiving_status: this.checkReceivingStatus(censorship, start_receive_time, current_time),
      // shipping_status:this.checkShippingStatus(censorship,departure_time, current_time),
      receiving_status: false,
      shipping_status: false,
      car_id: car_id,
      // essentials: [...object.essentials]
    };
    const car = new CarStatus(car_status_object);
    return await car
      .save()
      .then((data) => mongooseToObject(data))
      .catch((err) => err);
  };

  // getCarStatusDetail_status_id = async(status_id) =>{
  //     return await CarStatus.findOne({status_id: status_id})
  //         .then(data => mongooseToObject(data))
  //         .catch(err => err);
  // }

  deleteCarStatus = async (car_status_id_param) => {
    //xóa car status
    // console.log(receive_status_id_param);
    const car_status = await CarStatus.findByIdAndRemove({
      _id: car_status_id_param,
    })
      .then((data) => mongooseToObject(data))
      .catch((err) => err);
    // console.log(car_status)
    //xóa status đi. Đồng thời trả về account id
    const account_id = await Status.findByIdAndRemove({
      _id: car_status.status_id,
    })
      .then((data) => data.account_id)
      .catch((err) => err);
    //update lại role account -> user
    await accountService.accountUpdate_roleId_byRoleName(account_id, "user");

    //xoa file hinh uploaded
    if (car_status.picture) {
      fs.unlink(path.join("..\\server", car_status.picture), (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      //xoa folder nếu trống
      const path_folder = path.join(
        "..\\server",
        "\\uploads\\status\\CAR_TRIP",
        account_id.toString()
      );
      if (isEmpty(path.join(path_folder))) {
        try {
          fs.rmdirSync(path_folder, { recursive: true });

          console.log(`${path_folder} is deleted!`);
        } catch (err) {
          console.error(`Error while deleting ${dir}.`);
        }
      }
    }
    return car_status;
  };

      //Lấy các chuyến xe chưa được kiểm duyệt ->userService
    getAllCarStatusNoCensorship = async (_limit, _page) =>{
        let limit = parseInt(_limit);
        let page =  parseInt(_page)
        let start;
        if(limit && page){
            if(page < 1 || typeof page !== 'number')
                page = 1;
            if(limit < 1 || typeof limit !== 'number')
                limit = 1;
        }
        start = (page * limit) - limit;
        const totalRows = await CarStatus.count({})
        const car_status_list = await CarStatus.find({censorship: false})
            .skip(start)
            .limit(limit)
            .then(data => multiplemongooseToObject(data));
        return {
            car_status_list: car_status_list,
            pagination: {
                _limit:limit,
                _page:page,
                totalRows
            }
        }
    }

  //lấy tất cả các chuyến xe bao gồm chưa được kiểm duyệt và đã được kiểm duyệt
    // getAllCarStatus
    getCarStatusDetail_status_id = async(status_id) =>{
        return await CarStatus.findOne({status_id: status_id})
            .then(async data =>{ 
                const carStatus = mongooseToObject(data);
                carStatus.car = await carService.getCarbyID(data.car_id)
                    .catch(err => err);
                return carStatus;
            })
            .catch(err => err);
    }
  updateCarStatusInfor = async (car_status_id, object) => {
    const car = object.car;
    const car_status = {
      start_receive_time: object.start_receive_time,
      departure_time: object.departure_time,
      location_start: object.location_start,
      location_finish: object.location_finish,
      note: object.note,
      picture: object.picture,
    };
    if (car_status.picture === "") delete car_status.picture;
    const car_status_update = await CarStatus.findByIdAndUpdate(
      { _id: car_status_id },
      car_status
    )
      .then(async (data) => {
        const update_data = mongooseToObject(data);
        if ("picture" in car_status === true) {
          if (update_data.picture)
            fs.unlink(path.join("..\\server", update_data.picture), (err) => {
              if (err) {
                console.log(err);
                return;
              }
            });
        }
        //trả về lại car_status với dữ liệu mới
        const car_status_current = await CarStatus.findById({
          _id: update_data._id,
        })
          .then((data) => mongooseToObject(data))
          .catch((err) => err);

        car_status_current.car = await carService
          .updateCarById(update_data.car_id, car)
          .then((data) => data)
          .catch((err) => err);

        return car_status_current;
      })
      .catch((err) => err);
    // console.log("new car", car_status_update);
    return car_status_update;
  };
}

module.exports = new CarStatusService();
