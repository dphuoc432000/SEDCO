import React, { Component } from "react";
import UpdateCarTripFormCss from "./UpdateCarTripForm.module.css";
import { updateCartripStatus } from "../../../stores/actions/updateStatusCarTrip.action";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { API_IMAGE_URL } from "../../../constants/api";
import { toast } from "react-toastify";
import { FormError } from "../../../components/FormError/FormError";
import { UPDATE_STATUS_CARTRIP_SUCCESS } from "../../../constants/actions";

const getFullDate = (jsonDate) => {
    const date = new Date(jsonDate);
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
        }`;
};

class UpdateCarTripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {
                type_car: {
                    isInputValue: false,
                    value: "",
                    errorMessage: "",
                },
                license_plate: {
                    isInputValue: false,
                    value: "",
                    errorMessage: "",
                },
                tonnage: {
                    isInputValue: true,
                    value: "",
                    errorMessage: "",
                },
                many_people: {
                    isInputValue: true,
                    value: "",
                    errorMessage: "",
                },
            },
            picture: "",
            start_receive_time: {
                isInputValue: false,
                value: "",
                errorMessage: "",
            },
            departure_time: {
                isInputValue: false,
                value: "",
                errorMessage: "",
            },
            location_start: {
                isInputValue: false,
                value: "",
                errorMessage: "",
            },
            location_finish: {
                isInputValue: false,
                value: "",
                errorMessage: "",
            },
            note: {
                isInputValue: true,
                value: "",
                errorMessage: "",
            },
        };
    }

    componentDidMount = async () => {
        // state cartrip cũ
        const car_data_old = this.props.status_current.detail.car;
        const car_update = {
            type_car: {
                ...this.state.car.type_car,
                value: car_data_old.type_car,
                ...this.validateInput("type_car", car_data_old.type_car),
            },
            license_plate: {
                ...this.state.car.license_plate,
                value: car_data_old.license_plate,
                ...this.validateInput("license_plate", car_data_old.license_plate),
            },
            tonnage: {
                ...this.state.car.tonnage,
                value: car_data_old.tonnage,
                ...this.validateInput("tonnage", car_data_old.tonnage),
            },
            many_people: {
                ...this.state.car.many_people,
                value: car_data_old.many_people,
                ...this.validateInput("many_people", car_data_old.many_people),
            },
        };
        const location_start_data_old =
            this.props.status_current.detail.location_start;
        const location_finish_data_old =
            this.props.status_current.detail.location_finish;
        const note_data_old = this.props.status_current.detail.note;
        const picture_data_old = this.props.status_current.detail.picture;
        const start_receive_time_data_old =
            this.props.status_current.detail.start_receive_time;
        const departure_time_data_old =
            this.props.status_current.detail.departure_time;

        this.setState({
            car: car_update,
            location_start: {
                ...this.state.location_start,
                value: location_start_data_old,
                ...this.validateInput("location_start", location_start_data_old),
            },
            location_finish: {
                ...this.state.location_finish,
                value: location_finish_data_old,
                ...this.validateInput("location_finish", location_finish_data_old),
            },
            start_receive_time: {
                ...this.state.start_receive_time,
                value: getFullDate(start_receive_time_data_old),
                ...this.validateInput(
                    "start_receive_time_didMount",
                    getFullDate(start_receive_time_data_old)
                ),
            },
            departure_time: {
                ...this.state.departure_time,
                value: getFullDate(departure_time_data_old),
                ...this.validateInput(
                    "departure_time_didMount",
                    getFullDate(departure_time_data_old)
                ),
            },
            note: {
                ...this.state.note,
                value: note_data_old,
            },
            picture: "",
        });
    };

    displayLoadImage = (event, id_img) => {
        const output = document.getElementById(id_img);
        const file = event.target.files[0];
        const name = event.target.name;
        // console.log(output)
        if (file) {
            // console.log(URL.createObjectURL(file))
            output.src = URL.createObjectURL(file);
            output.onload = function () {
                URL.revokeObjectURL(output.src); // free memory
            };
            this.setState({
                [name]: {
                    isInputValue: true,
                    value: file,
                },
            });
        }
    };
    displayLoadPicture = (event, id_img) => {
        const output = document.getElementById(id_img);
        const file = event.target.files[0];
        const name = event.target.name;
        // console.log(output)
        if (file) {
            // console.log(URL.createObjectURL(file))
            output.src = URL.createObjectURL(file);
            output.onload = function () {
                URL.revokeObjectURL(output.src); // free memory
            };
            this.setState({
                [name]: file,
            });
        }
    };
    handleOnChangeCar = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const dataValidate = this.validateInput(name, value);
        // console.log(dataValidate);
        this.setState({
            car: {
                ...this.state.car,
                [name]: {
                    value,
                    ...dataValidate,
                },
            },
        });
    };
    handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const dataValidate = this.validateInput(name, value);
        // console.log(value);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                ...dataValidate,
            },
        });
    };

    validateInput = (type, checkingText) => {
        switch (type) {
            case "type_car":
                if (!checkingText)
                    return {
                        isInputValue: false,
                        errorMessage: "Vui lòng chọn loại xe!",
                    };
                return { isInputValue: true, errorMessage: "" };

            case "many_people":
                if(checkingText.length > 0){
                    var many_people_regex = /^[0-9]/;
                    const check_many_people_regex = many_people_regex.exec(checkingText);
                    if (check_many_people_regex !== null) {
                        checkingText = parseInt(checkingText);
                        if(checkingText < 11)
                            return { isInputValue: true, errorMessage: "" };
                        return { isInputValue: false, errorMessage: "Vui lòng nhập số lượng tối đa 10!" };
                    }
                    return {
                        isInputValue: false,
                        errorMessage: "Vui lòng nhập số 0-9!",
                    };
                }
                return { isInputValue: true, errorMessage: "" };

            case "tonnage":
                if(checkingText.length > 0){
                    var tonnage_regex = /^[0-9]/;
                    const check_tonnage_regex = tonnage_regex.exec(checkingText);
                    if (check_tonnage_regex !== null) {
                        //   return { isInputValue: true, errorMessage: "" };
                        checkingText= parseFloat(checkingText);
                        if(checkingText <= 50)
                            return { isInputValue: true, errorMessage: "" };
                        return { isInputValue: false, errorMessage: "Vui lòng nhập trọng tải từ 0.1-50.0!" };
                    }
                    return {
                        isInputValue: false,
                        errorMessage: "Vui lòng nhập số từ 0-9!",
                    };
                }
                return { isInputValue: true, errorMessage: "" };
            case "license_plate":
                var license_plateRegex =
                    /^([ABCDEFHKLMNPRSTUVXYZabccdefhklmnprstuvxyz 0-9\-\.]{9,15})$/;
                const checkingusernameRegex = license_plateRegex.exec(checkingText);
                if (checkingusernameRegex !== null) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage: "Vui lòng nhập đúng định dạng.",
                };
            case "start_receive_time_didMount":
                var today = new Date(getFullDate(new Date())).valueOf();
                var start_receive_state_value = new Date(
                    getFullDate(checkingText)
                ).valueOf(); //13

                // const start_receive_state = this.state.value;
                if (start_receive_state_value - today >= 0) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage:
                        "Vui lòng nhập lại. Ngày bắt khởi hành không nhỏ hơn ngày hiện tại!",
                };

            case "departure_time_didMount":
                var today_departure_time = new Date(getFullDate(new Date())).valueOf();
                var departure_time_state_value = new Date(
                    getFullDate(checkingText)
                ).valueOf(); //13
                if (departure_time_state_value - today_departure_time >= 0) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage:
                        "Vui lòng nhập lại. Ngày băt đầu vận chuyển không < ngày hiện tại & ngày bắt đầu nhận!",
                };

            case "start_receive_time":
                const departure_time_class = document.getElementsByClassName(
                    "departure_time_class"
                )[0];
                const departure_time_class_value = departure_time_class.value;
                var departure_time_class_value_start_receive_time = new Date(
                    getFullDate(departure_time_class_value)
                ).valueOf();
                var today = new Date(getFullDate(new Date())).valueOf();
                var start_receive_state_value = new Date(
                    getFullDate(checkingText)
                ).valueOf(); //13

                // const start_receive_state = this.state.value;
                if (
                    start_receive_state_value - today >= 0 &&
                    departure_time_class_value_start_receive_time -
                    start_receive_state_value >=
                    0
                ) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage:
                        "Vui lòng nhập lại. Ngày nhận không < ngày hiện tại & > ngày khởi hành !",
                };

            case "departure_time":
                const start_receive_time_class = document.getElementsByClassName(
                    "start_receive_time_class"
                )[0];
                const start_receive_time_class_value = getFullDate(
                    start_receive_time_class.defaultValue
                );
                console.log(start_receive_time_class_value);
                // var today_departure_time = new Date(getFullDate(new Date())).valueOf();
                var today_departure_time = new Date(getFullDate(new Date())).valueOf();
                var start_receive_state_value_departure_time = new Date(
                    getFullDate(start_receive_time_class_value)
                ).valueOf(); //13
                var departure_time_state_value = new Date(
                    getFullDate(checkingText)
                ).valueOf(); //13
                if (
                    departure_time_state_value - today_departure_time >= 0 &&
                    departure_time_state_value -
                    start_receive_state_value_departure_time >=
                    0
                ) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage:
                        "Vui lòng nhập lại. Ngày vận chuyển không < ngày hiện tại & ngày nhận!",
                };
            case "location_start":
                var location_start_regex =
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ0-9/.\s,'-]{5,}$/;
                if (location_start_regex.test(checkingText))
                    return { isInputValue: true, errorMessage: "" };
                return {
                    isInputValue: false,
                    errorMessage:
                        'Vui lòng nhập lại. Bao gồm: 5 ký tự trở lên a-z, A-Z, 0-9, ", - / ."!',
                };

            case "location_finish":
                var location_finish_regex =
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ0-9/.\s,'-]{5,}$/;
                if (location_finish_regex.test(checkingText))
                    return { isInputValue: true, errorMessage: "" };
                return {
                    isInputValue: false,
                    errorMessage:
                        'Vui lòng nhập lại. Bao gồm: 5 ký tự trở lên a-z, A-Z, 0-9, ", - / ."!',
                };

            default:
                break;
        }
    };
    checkingForm = () => {
        const array = [
            this.state.car.license_plate,
            this.state.car.tonnage,
            this.state.car.many_people,
            this.state.car.type_car,
            this.state.start_receive_time,
            this.state.departure_time,
            this.state.location_start,
            this.state.location_finish,
            this.state.note,
        ];
        const dataForm = [...Object.values(array)];
        return dataForm.some((item) => {
            return item.isInputValue === false;
        });
    };
    carsConvert = (car) => {
        // const array = Object.keys(car).map((key) => {
        //   const cars = car[key];
        //   return {
        //     value: cars["value"],
        //   };
        // });
        // return {...array};
        return {
            type_car: car.type_car.value,
            license_plate: car.license_plate.value,
            tonnage: car.tonnage.value,
            many_people: car.many_people.value,
        }
    };
    updateFormCartrip = async () => {
        const cartrip_status_id = this.props.cartrip_status_id;
        const cartrip_status_data = {
            car: this.state.car,
            //   start_receive_time: this.state.start_receive_time,
            //   departure_time: this.state.departure_time,
            //   location_start: this.state.location_start,
            //   location_finish: this.state.location_finish,
            note: this.state.note,
        };

        if (this.checkingForm())
            toast.error("Vui lòng nhập đầy đủ thông tin và chính xác!");
        else {
            let formData = new FormData();
            formData.append("car", JSON.stringify(this.carsConvert(this.state.car)));
            formData.append(
                "start_receive_time",
                this.state.start_receive_time.value
            );
            formData.append("departure_time", this.state.departure_time.value);
            formData.append("location_start", this.state.location_start.value);
            formData.append("location_finish", this.state.location_finish.value);
            formData.append("note", this.state.note.value);
            formData.append("picture", this.state.picture);
            const updateaction = await this.props.updateCartripStatus(
                cartrip_status_id,
                formData,
            );
            if (updateaction.type !== UPDATE_STATUS_CARTRIP_SUCCESS)
                toast.error("Cập nhật không thành công");
            else {
                const carsConvert = Object.keys(this.state.car).map((key) => {
                    return cartrip_status_data.car[key];
                });
                // const car_map = await Promise.all(
                //     carsConvert.map((car) =>{
                //         const car_detail = { 
                //             car : this.state.car
                //         }
                //     })
                // )
                toast.success("Cập nhật thành công!");

                // this.props.handleUpdateCarTrips(cartrip_status_data);
                this.props.handleShowHideUpdateCarTrip();
                this.props.handleUpdateStatusCurrent(123);
                this.props.handleUpdate();
                // this.props.history.push('/')
            }
        }
    };

    onlyInputNumber = (event) => {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
    onlyInputFloatNumber = (event) => {
        if ((event.which !== 46 || event.target.value.indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
            return false;
        }
    }

    render() {
        console.log("check state", this.state);
        const picture = this.props.status_current.detail.picture;
        // const start_receive_state = this.state.start_receive_time.value;
        // const todate_start_receive = new Date(start_receive_state).getDate();
        // console.log("check ngày state", todate_start_receive);
        return (
            <div className={UpdateCarTripFormCss.car_trip_form_container}>
                <div className={UpdateCarTripFormCss.car_trip_form_layer_container}>
                    <div className={UpdateCarTripFormCss.car_trip_form_layer_background} onClick={() => this.props.handleShowHideUpdateCarTrip()}></div>
                    <div className={UpdateCarTripFormCss.form_container}>
                        <div className={UpdateCarTripFormCss.close_button_container}>
                            <button
                                className={UpdateCarTripFormCss.close_button}
                                onClick={() => this.props.handleShowHideUpdateCarTrip()}
                            >
                                X
                            </button>
                        </div>
                        <div className={UpdateCarTripFormCss.car_trip_form}>
                            <h2 className={UpdateCarTripFormCss.form_title}>Cập nhật chuyến xe</h2>
                            <div className={UpdateCarTripFormCss.form_infor_cartrip_container}>
                                <h3 className={UpdateCarTripFormCss.car_trip_title} style={{ marginLeft: '0px' }}>Thông tin xe</h3>
                                <div className={UpdateCarTripFormCss.Wrapped} >
                                    <select
                                        className={UpdateCarTripFormCss.input_cartrip}
                                        value={this.state.car.type_car.value}
                                        name="type_car"
                                        onChange={(event) => {
                                            this.handleOnChangeCar(event);
                                        }}
                                    >
                                        <option value="">--Chọn loại xe--</option>
                                        <option value="Xe tải hạng nhẹ">Xe tải hạng nhẹ</option>
                                        <option value="Xe tải hạng trung">Xe tải hạng trung</option>
                                        <option value="Xe tải hạng nặng">Xe tải hạng nặng </option>
                                        <option value="Xe đông lạnh">Xe đông lạnh </option>
                                        <option value="Xe máy">Xe máy </option>
                                    </select>

                                    <input
                                        type="text"
                                        className={UpdateCarTripFormCss.input_cartrip}
                                        placeholder="Số lượng người"
                                        name="many_people"
                                        value={this.state.car.many_people.value}
                                        onKeyPress={(event) => this.onlyInputNumber(event)}
                                        onChange={(event) => {
                                            this.handleOnChangeCar(event);
                                        }}
                                    />
                                </div>
                                <div
                                    className={UpdateCarTripFormCss.err_container}
                                    style={{
                                        display: 'flex',
                                        marginTop: '-7px'
                                    }}
                                >
                                    <FormError
                                        type="type_car"
                                        isHidden={this.state.car.type_car.isInputValue}
                                        errorMessage={this.state.car.type_car.errorMessage}
                                    />
                                    <FormError
                                        type="many_people"
                                        isHidden={this.state.car.many_people.isInputValue}
                                        errorMessage={this.state.car.many_people.errorMessage}
                                    />
                                </div>
                                <div className={UpdateCarTripFormCss.Wrapped}>
                                    <input
                                        type="text"
                                        className={UpdateCarTripFormCss.input_cartrip}
                                        placeholder="Biển số xe(Bắt buộc)*"
                                        name="license_plate"
                                        value={this.state.car.license_plate.value}
                                        onChange={(event) => {
                                            this.handleOnChangeCar(event);
                                        }}
                                    />

                                    <div className={UpdateCarTripFormCss.input_tonage}>
                                        <input
                                            type="text"
                                            className={UpdateCarTripFormCss.input_cartrip}
                                            placeholder="Trọng tải"
                                            step="0.01"
                                            name="tonnage"
                                            style={{ border: "none", outline: "none" }}
                                            value={this.state.car.tonnage.value}
                                            onKeyPress={(event) => this.onlyInputFloatNumber(event)}
                                            onChange={(event) => {
                                                this.handleOnChangeCar(event);
                                            }}
                                        />

                                        <label
                                            htmlFor=""
                                            style={{
                                                marginRight: "30px",
                                                lineHeight: "33px",
                                                color: '#595959'
                                            }}
                                        >
                                            Tấn
                                        </label>
                                    </div>
                                </div>
                                <div
                                    className={UpdateCarTripFormCss.err_container}
                                    style={{
                                        display: 'flex',
                                        marginTop: '-7px'
                                    }}
                                >
                                    <FormError
                                        type="license_plate"
                                        isHidden={this.state.car.license_plate.isInputValue}
                                        errorMessage={this.state.car.license_plate.errorMessage}
                                    />
                                    <FormError
                                        type="tonnage"
                                        isHidden={this.state.car.tonnage.isInputValue}
                                        errorMessage={this.state.car.tonnage.errorMessage}
                                    />
                                </div>
                                <h3 className={UpdateCarTripFormCss.car_trip_title} style={{ marginLeft: '0px' }}>Thông tin chuyến xe</h3>

                                <div className={UpdateCarTripFormCss.start_receive_time_container}>
                                    <p className={UpdateCarTripFormCss.car_trip_lable}>
                                        Bắt đầu nhận hàng
                                    </p>

                                    <input
                                        type="date"
                                        name="start_receive_time"
                                        className={`${UpdateCarTripFormCss.start_receive_time_class} start_receive_time_class`}
                                        value={getFullDate(this.state.start_receive_time.value)}
                                        onChange={(event) => {
                                            this.handleOnChange(event);
                                        }}
                                    />
                                </div>
                                <div
                                    className={UpdateCarTripFormCss.err_time_container}
                                    style={{
                                        display: 'flex',
                                        marginTop: '-7px'
                                    }}
                                >
                                    <FormError
                                        type="start_receive_time"
                                        isHidden={this.state.start_receive_time.isInputValue}
                                        errorMessage={this.state.start_receive_time.errorMessage}
                                    />
                                </div>

                                <div className={UpdateCarTripFormCss.departure_time_container}>
                                    <p className={UpdateCarTripFormCss.car_trip_lable}>
                                        Bắt đầu khởi hành
                                    </p>

                                    <input
                                        type="date"
                                        name="departure_time"
                                        className={`${UpdateCarTripFormCss.departure_time_class} departure_time_class`}
                                        value={this.state.departure_time.value}
                                        onChange={(event) => {
                                            this.handleOnChange(event);
                                        }}
                                    />
                                </div>
                                <div
                                    className={UpdateCarTripFormCss.err_time_container}
                                    style={{
                                        display: 'flex',
                                        marginTop: '-7px'
                                    }}
                                >
                                    <FormError
                                        type="departure_time"
                                        isHidden={this.state.departure_time.isInputValue}
                                        errorMessage={this.state.departure_time.errorMessage}
                                    />
                                </div>

                                <h3 className={UpdateCarTripFormCss.car_trip_title}>Lộ trình</h3>
                                <div className={UpdateCarTripFormCss.Wrapped}>
                                    <input
                                        type="text"
                                        className={UpdateCarTripFormCss.input_cartrip}
                                        placeholder="Địa điểm khởi hành(Bắt buộc)*"
                                        name="location_start"
                                        value={this.state.location_start.value}
                                        onChange={(event) => {
                                            this.handleOnChange(event);
                                        }}
                                    />

                                    <input
                                        type="text"
                                        className={UpdateCarTripFormCss.input_cartrip}
                                        placeholder="Địa điểm đến(Bắt buộc)*"
                                        value={this.state.location_finish.value}
                                        name="location_finish"
                                        onChange={(event) => {
                                            this.handleOnChange(event);
                                        }}
                                    />

                                </div>
                                <div
                                    className={UpdateCarTripFormCss.err_container}
                                    style={{
                                        display: 'flex',
                                        marginTop: '-7px'
                                    }}
                                >
                                    <FormError
                                        type="location_start"
                                        isHidden={this.state.location_start.isInputValue}
                                        errorMessage={this.state.location_start.errorMessage}
                                    />
                                    <FormError
                                        type="location_finish"
                                        isHidden={this.state.location_finish.isInputValue}
                                        errorMessage={this.state.location_finish.errorMessage}
                                    />
                                </div>

                                <div className={UpdateCarTripFormCss.Wrapped}>
                                    <textarea
                                        type="text"
                                        className={UpdateCarTripFormCss.note}
                                        placeholder="Ghi chú"
                                        value={this.state.note.value}
                                        name="note"
                                        onChange={(event) => {
                                            this.handleOnChange(event);
                                        }}
                                    />
                                </div>
                                <h3 className={UpdateCarTripFormCss.car_trip_title}>Hình ảnh</h3>
                                <div className={UpdateCarTripFormCss.Wrapped}>
                                    <div className={UpdateCarTripFormCss.img_car_container}>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            id="picture"
                                            name="picture"
                                            className="my_file"
                                            onChange={(event) => { this.displayLoadPicture(event, "picture_data") }
                                            }
                                        />
                                        <label htmlFor="picture">
                                            <p className={UpdateCarTripFormCss.bnt_add_image}>Cập nhật</p>
                                        </label>
                                        <img
                                            className={UpdateCarTripFormCss.img_item}
                                            src={`${API_IMAGE_URL}/${picture}`}
                                            id="picture_data"
                                            alt=""

                                        />
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }} className={UpdateCarTripFormCss.btn_continue_container}>
                                    <button
                                        className={UpdateCarTripFormCss.btn_continue}
                                        onClick={() => { this.updateFormCartrip() }}
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateCartripStatus: async (cartrip_status_id, cartrip_status_data) => {
            console.log("vao");
            const action = await updateCartripStatus(
                cartrip_status_id,
                cartrip_status_data
            );
            console.log(action);
            return dispatch(action);
        },
    };
};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UpdateCarTripForm)
);
