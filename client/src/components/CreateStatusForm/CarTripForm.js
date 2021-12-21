import React, { Component } from "react";
import "./CarTripForm.css";
import { connect } from "react-redux";
import cartripFormCreate from "../../stores/actions/createStatusCarTrip.action";
import { getVehicleCensorship_forUser } from "../../stores/actions/vehicle_censorship.action";
import { API_IMAGE_URL } from "../../constants/api";
import { toast } from "react-toastify";
import { FormError } from "../../components/FormError/FormError";
import { CARTRIP_FORM_CREATE_SUCCESS } from "../../constants/actions";
import CarTripFormCss from './CarTripForm.module.css';

const getFullDate = (jsonDate) => {
    const date = new Date(jsonDate);
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
        }`;
};
class CarTripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNextPage: false,
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
            picture: {
                isInputValue: false,
                value: {},
            },
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
            vehicle_censorship: [],
            face_img: {
                isInputValue: false,
                value: {},
            },
            id_card_img_before: {
                isInputValue: false,
                value: {},
            },
            id_card_img_after: {
                isInputValue: false,
                value: {},
            },
            driving_license_img_before: {
                isInputValue: false,
                value: {},
            },
            driving_license_img_after: {
                isInputValue: false,
                value: {},
            },
            test_img_1: {
                isInputValue: false,
                value: {},
            },
            test_img_2: {
                isInputValue: false,
                value: {},
            },
        };
    }
    componentDidMount = async () => {
        await this.props.getVehicleCensorship_forUser(this.props.user._id);
        const vehicleCensorship = await this.props.vehicleCensorshipReducer;
        this.setState({
            vehicle_censorship: vehicleCensorship,
            face_img: vehicleCensorship.face_img
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.face_img,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            id_card_img_before: vehicleCensorship.id_card_img_before
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.id_card_img_before,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            id_card_img_after: vehicleCensorship.id_card_img_after
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.id_card_img_after,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            driving_license_img_before: vehicleCensorship.driving_license_img_before
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.driving_license_img_before,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            driving_license_img_after: vehicleCensorship.driving_license_img_after
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.driving_license_img_after,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            test_img_1: vehicleCensorship.test_img_1
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.test_img_1,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
            test_img_2: vehicleCensorship.test_img_2
                ? {
                    isInputValue: true,
                    value: vehicleCensorship.test_img_2,
                }
                : {
                    isInputValue: false,
                    value: {},
                },
        });
    };
    handleShowNextForm = () => {
        this.setState({
            isNextPage: !this.state.isNextPage,
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
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                ...dataValidate,
            },
        });
    };
    checkingForm = () => {
        const array = [
            this.state.car.license_plate,
            this.state.car.many_people,
            this.state.car.tonnage,
            this.state.car.type_car,
            this.state.start_receive_time,
            this.state.departure_time,
            this.state.location_start,
            this.state.location_finish,
        ];
        // const dataForm = [...Object.values(array)];
        return array.some((item) => {
            return item.isInputValue === false;
        });
    };
    checkingFormImg = () => {
        const array = [
            this.state.face_img,
            this.state.id_card_img_before,
            this.state.id_card_img_after,
            this.state.driving_license_img_before,
            this.state.driving_license_img_after,
            this.state.test_img_1,
            this.state.test_img_2,
        ];
        const dataForm = [...Object.values(array)];
        return dataForm.some((item) => {
            return item.isInputValue === false;
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
                    /^([0-9]){2}[ -.]{0,1}([ABCĐDEFHKLMNPRSTUVXYZabcđdefhklmnprstuvxyz]{1,2})[0-9]{0,1}[ -.]{0,1}[0-9]{2,3}[ -.]{0,1}[0-9]{2}$/;
                const checkingusernameRegex = license_plateRegex.exec(checkingText);
                if (checkingusernameRegex !== null) {
                    return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage: "Vui lòng nhập đúng định dạng. (VD: 11-M1-111-11, 11M111111)",
                };

            case "start_receive_time":
                const departure_time_class = document.getElementsByClassName("departure_time_class")[0];
                const departure_time_class_value = departure_time_class.value;
                var departure_time_class_value_start_receive_time = new Date(getFullDate(departure_time_class_value)).valueOf();
                var today = new Date(getFullDate(new Date())).valueOf();
                var start_receive_state_value = new Date(getFullDate(checkingText)).valueOf();
                if(isNaN(departure_time_class_value_start_receive_time)){
                    if (start_receive_state_value - today >= 0)
                        return { isInputValue: true, errorMessage: "" };
                }
                else{
                    if (
                        start_receive_state_value - today >= 0 &&
                        departure_time_class_value_start_receive_time - start_receive_state_value >= 0
                    )
                        return { isInputValue: true, errorMessage: "" };
                }
                return {
                    isInputValue: false,
                    errorMessage: "Vui lòng nhập lại. Ngày bắt đầu nhận được tính từ ngày hiện tại đến ngày khởi hành!",
                };

            case "departure_time":
                const start_receive_time_class = document.getElementsByClassName("start_receive_time_class")[0];
                const start_receive_time_class_value = start_receive_time_class.value;
                var today_departure_time = new Date(getFullDate(new Date())).valueOf();
                var start_receive_state_value_departure_time = new Date(getFullDate(start_receive_time_class_value)).valueOf(); //13
                var departure_time_state_value = new Date(getFullDate(checkingText)).valueOf(); //13
                if(isNaN(start_receive_state_value_departure_time)){
                    if (departure_time_state_value - today_departure_time >= 0)
                        return { isInputValue: true, errorMessage: "" };
                }
                else{
                    if (
                        departure_time_state_value - today_departure_time >= 0 &&
                        departure_time_state_value - start_receive_state_value_departure_time >= 0
                    ) {
                        return { isInputValue: true, errorMessage: "" };
                    }
                }
                return {
                    isInputValue: false,
                    errorMessage: "Vui lòng nhập lại. Ngày băt đầu khởi được tính từ ngày nhận!",
                };
            case "location_start":
                // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
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
    onlyInputNumber = (event) =>{
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
    onlyInputFloatNumber = (event) =>{
        if ((event.which !== 46 || event.target.value.indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
            return false;
        }
    }
    submitFormCartrip = async () => {
        if (this.checkingForm() || this.checkingFormImg()) {
            toast.warn("Vui lòng nhập đầy đủ thông tin (bắt buộc*)");
        } else {
            let formData = new FormData();
            formData.append("type_car", this.state.car.type_car.value);
            formData.append("license_plate", this.state.car.license_plate.value);
            formData.append("tonnage", this.state.car.tonnage.value);
            formData.append("many_people", this.state.car.many_people.value);
            formData.append(
                "start_receive_time",
                this.state.start_receive_time.value
            );
            formData.append("departure_time", this.state.departure_time.value);
            formData.append("location_start", this.state.location_start.value);
            formData.append("location_finish", this.state.location_finish.value);
            formData.append("note", this.state.note.value);
            formData.append("picture", this.state.picture);
            formData.append("face_img", this.state.face_img.value);
            formData.append(
                "id_card_img_before",
                this.state.id_card_img_before.value
            );
            formData.append("id_card_img_after", this.state.id_card_img_after.value);
            formData.append(
                "driving_license_img_before",
                this.state.driving_license_img_before.value
            );
            formData.append(
                "driving_license_img_after",
                this.state.driving_license_img_after.value
            );
            formData.append("test_img_1", this.state.test_img_1.value);
            formData.append("test_img_2", this.state.test_img_2.value);

            //   console.log(this.props.account_id);

            const cartripFormCreate = await this.props.cartripFormCreate(
                this.props.account_id,
                formData
            );
            if (cartripFormCreate.type === CARTRIP_FORM_CREATE_SUCCESS) {
                this.props.exitModalCarTripForm();
                this.props.handleLoadAgainWhenCreateStatus();
                toast.success("Tạo trạng thái thành công!");
            } else {
                toast.error("Đã xảy ra lỗi trong quá trình tạo trạng thái!");
            }
        }
    };
    render() {
        let { isNextPage } = this.state;
        const vehicle_censorship = this.state.vehicle_censorship;

        return (
            <div className={CarTripFormCss.car_trip_form_container}>
                <div className={CarTripFormCss.car_trip_form_layer_container}>
                    <div className={CarTripFormCss.car_trip_form_layer_background} onClick={() => this.props.exitModalCarTripForm()}></div>
                    <div className={CarTripFormCss.form_container}>
                        <div className={CarTripFormCss.close_button_container}>
                            <button
                                className={CarTripFormCss.close_button}
                                onClick={() => this.props.exitModalCarTripForm()}
                            >
                                X
                            </button>
                        </div>
                        <div className={CarTripFormCss.car_trip_form}>
                            {isNextPage === false ? (
                                <React.Fragment>
                                    <h2 className={CarTripFormCss.form_title}>Tạo chuyến xe</h2>
                                    <div className={CarTripFormCss.form_infor_cartrip_container}>
                                        <h3 className={CarTripFormCss.car_trip_title} style={{ marginLeft: '0px' }}>Thông tin xe</h3>
                                        <div className={CarTripFormCss.Wrapped} >
                                            <select
                                                className={CarTripFormCss.input_cartrip}
                                                value={this.state.car.type_car.value}
                                                name="type_car"
                                                onChange={(event) => {
                                                    this.handleOnChangeCar(event);
                                                }}
                                            >
                                                <option value="">--Chọn loại xe--</option>
                                                <option value="Xe tải hạng nhẹ">Xe tải hạng nhẹ</option>
                                                <option value="Xe tải hạng trung">
                                                    Xe tải hạng trung{" "}
                                                </option>
                                                <option value="Xe tải hạng nặng">Xe tải hạng nặng </option>
                                                <option value="Xe đông lạnh">Xe đông lạnh </option>
                                                <option value="Xe máy">Xe máy </option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Số lượng người"
                                                name="many_people"
                                                className={CarTripFormCss.input_cartrip}
                                                value={this.state.car.many_people.value}
                                                onKeyPress={(event)=>this.onlyInputNumber(event)}
                                                onChange={(event) => {
                                                    this.handleOnChangeCar(event);
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={CarTripFormCss.err_container}
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
                                        <div className={CarTripFormCss.Wrapped}>
                                            <input
                                                type="text"
                                                className={CarTripFormCss.input_cartrip}
                                                placeholder="Biển số xe(Bắt buộc)*"
                                                name="license_plate"
                                                value={this.state.car.license_plate.value}
                                                onChange={(event) => {
                                                    this.handleOnChangeCar(event);
                                                }}
                                            />
                                            <div className={CarTripFormCss.input_tonage}>
                                                <input
                                                    type="text"
                                                    className={CarTripFormCss.input_cartrip}
                                                    placeholder="Trọng tải"
                                                    name="tonnage"
                                                    step="0.01"
                                                    style={{ border: "none", outline: "none" }}
                                                    value={this.state.car.tonnage.value}
                                                    onKeyPress={(event)=>this.onlyInputFloatNumber(event)}
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
                                            className={CarTripFormCss.err_container}
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
                                        <h3 className={CarTripFormCss.car_trip_title} style={{ marginLeft: '0px' }}>Thông tin chuyến xe</h3>

                                        <div className={CarTripFormCss.start_receive_time_container}>
                                            <p className={CarTripFormCss.car_trip_lable}>
                                                Bắt đầu nhận hàng
                                            </p>

                                            <input
                                                type="date"
                                                name="start_receive_time"
                                                className={`${CarTripFormCss.start_receive_time_class} start_receive_time_class`}
                                                value={getFullDate(this.state.start_receive_time.value)}
                                                onChange={(event) => {
                                                    this.handleOnChange(event);
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={CarTripFormCss.err_time_container}
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
                                        <div className={CarTripFormCss.departure_time_container}>
                                            <p className={CarTripFormCss.car_trip_lable}>
                                                Bắt đầu khởi hành
                                            </p>

                                            <input
                                                type="date"
                                                name="departure_time"
                                                className={`${CarTripFormCss.departure_time_class} departure_time_class`}
                                                value={this.state.departure_time.value}
                                                onChange={(event) => {
                                                    this.handleOnChange(event);
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={CarTripFormCss.err_time_container}
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
                                        <h3 className={CarTripFormCss.car_trip_title} >Lộ trình</h3>
                                        <div className={CarTripFormCss.Wrapped}>
                                            <input
                                                type="text"
                                                className={CarTripFormCss.input_cartrip}
                                                placeholder="Địa điểm khởi hành(Bắt buộc)*"
                                                name="location_start"
                                                value={this.state.location_start.value}
                                                onChange={(event) => {
                                                    this.handleOnChange(event);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                className={CarTripFormCss.input_cartrip}
                                                placeholder="Địa điểm đến(Bắt buộc)*"
                                                value={this.state.location_finish.value}
                                                name="location_finish"
                                                onChange={(event) => {
                                                    this.handleOnChange(event);
                                                }}
                                            />

                                        </div>
                                        <div
                                            className={CarTripFormCss.err_container}
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
                                        <div className={CarTripFormCss.Wrapped}>
                                            <textarea
                                                type="text"
                                                className={CarTripFormCss.note}
                                                placeholder="Ghi chú"
                                                value={this.state.note.value}
                                                name="note"
                                                onChange={(event) => {
                                                    this.handleOnChange(event);
                                                }}
                                            />
                                        </div>
                                        <h3 className={CarTripFormCss.car_trip_title} >Hình ảnh</h3>
                                        <div className={CarTripFormCss.Wrapped}>
                                            <div className={CarTripFormCss.img_car_container}>
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    id="picture"
                                                    name="picture"
                                                    className="my_file"
                                                    onChange={(event) =>
                                                        this.displayLoadPicture(event, "picture_data")
                                                    }
                                                />
                                                <label htmlFor="picture">
                                                    <p className={CarTripFormCss.bnt_add_image}>Thêm</p>
                                                </label>
                                                <img
                                                    className={CarTripFormCss.img_item}
                                                    src=""
                                                    id="picture_data"
                                                    alt=""

                                                />
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "center" }} className={CarTripFormCss.btn_continue_container}>
                                            <button
                                                className={CarTripFormCss.btn_continue}
                                                onClick={() => this.handleShowNextForm()}
                                            >
                                                Tiếp theo
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <h2 className={CarTripFormCss.form_title}>Thông tin tài xế</h2>
                                    <div className={CarTripFormCss.form_infor_img_container}>
                                        {/* Chứng minh nhân dân */}
                                        <h3 className={CarTripFormCss.car_trip_title}>
                                            Căn cước công dân/Chứng minh nhân dân
                                        </h3>
                                        <div className={CarTripFormCss.car_trip_row}>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_left}>
                                                <p className={CarTripFormCss.cartrip_label_child}>Mặt trước</p>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="id_card_img_before"
                                                        name="id_card_img_before"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(
                                                                event,
                                                                "id_card_img_before_data"
                                                            )
                                                        }
                                                    />
                                                    {vehicle_censorship.id_card_img_before ? (
                                                        <React.Fragment>
                                                            <label htmlFor="id_card_img_before">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_before}`}
                                                                id="id_card_img_before_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="id_card_img_before">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="id_card_img_before_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_right}>
                                                <p className={CarTripFormCss.cartrip_label_child}>Mặt sau</p>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="id_card_img_after"
                                                        name="id_card_img_after"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(event, "id_card_img_after_data")
                                                        }
                                                    />
                                                    {vehicle_censorship.id_card_img_after ? (
                                                        <React.Fragment>
                                                            <label htmlFor="id_card_img_after">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_after}`}
                                                                id="id_card_img_after_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="id_card_img_after">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="id_card_img_after_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Khuôn mặt */}
                                        <h3 className={CarTripFormCss.car_trip_title}>Khuôn mặt</h3>
                                        <div className={CarTripFormCss.car_trip_row}>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_left}>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="face_img"
                                                        name="face_img"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(event, "face_img_data")
                                                        }
                                                    />
                                                    {vehicle_censorship.face_img ? (
                                                        <React.Fragment>
                                                            <label htmlFor="face_img">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.face_img}`}
                                                                id="face_img_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="face_img">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="face_img_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Giấy phép lái xe */}
                                        <h3 className={CarTripFormCss.car_trip_title}>Giấy phép lái xe</h3>
                                        <div className={CarTripFormCss.car_trip_row}>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_left}>
                                                <p className={CarTripFormCss.cartrip_label_child}>Mặt trước</p>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="driving_license_img_before"
                                                        name="driving_license_img_before"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(
                                                                event,
                                                                "driving_license_img_before_data"
                                                            )
                                                        }
                                                    />
                                                    {vehicle_censorship.driving_license_img_before ? (
                                                        <React.Fragment>
                                                            <label htmlFor="driving_license_img_before">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.driving_license_img_before}`}
                                                                id="driving_license_img_before_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="driving_license_img_before">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="driving_license_img_before_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_right}>
                                                <p className={CarTripFormCss.cartrip_label_child}>Mặt sau</p>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        name="driving_license_img_after"
                                                        id="driving_license_img_after"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(
                                                                event,
                                                                "driving_license_img_after_data"
                                                            )
                                                        }
                                                    />
                                                    {vehicle_censorship.driving_license_img_after ? (
                                                        <React.Fragment>
                                                            <label htmlFor="driving_license_img_after">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_before}`}
                                                                id="driving_license_img_after_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="driving_license_img_after">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="driving_license_img_after_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* giấy xét nghiệm */}
                                        <h3 className={CarTripFormCss.car_trip_title}>
                                            Giấy xét nghiệm Covid/Đã tiêm vaccine
                                        </h3>
                                        <div className={CarTripFormCss.car_trip_row}>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_left}>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="test_img_1"
                                                        name="test_img_1"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(event, "test_img_1_data")
                                                        }
                                                    />
                                                    {vehicle_censorship.test_img_1 ? (
                                                        <React.Fragment>
                                                            <label htmlFor="test_img_1">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_1}`}
                                                                id="test_img_1_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="test_img_1">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="test_img_1_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={CarTripFormCss.Wrapped_NextFrom_right}>
                                                <div className={CarTripFormCss.Block_IMG}>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="test_img_2"
                                                        name="test_img_2"
                                                        className="my_file"
                                                        onChange={(event) =>
                                                            this.displayLoadImage(event, "test_img_2_data")
                                                        }
                                                    />
                                                    {vehicle_censorship.test_img_2 ? (
                                                        <React.Fragment>
                                                            <label htmlFor="test_img_2">
                                                                <p className={CarTripFormCss.bnt_add_image}>Chỉnh sửa</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_2}`}
                                                                id="test_img_2_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <label htmlFor="test_img_2">
                                                                <p className={CarTripFormCss.bnt_add_image}>Cập nhật</p>
                                                            </label>
                                                            <img
                                                                className={CarTripFormCss.img_item}
                                                                src=""
                                                                id="test_img_2_data"
                                                                alt=""
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* button */}
                                        <div className={CarTripFormCss.btn_create_container}>
                                            <button
                                                className={CarTripFormCss.btn_create}
                                                onClick={() => this.submitFormCartrip()}
                                            >
                                                Tạo
                                            </button>
                                        </div>
                                        <div className={CarTripFormCss.btn_back_container}>
                                            <p
                                                className={CarTripFormCss.btn_back}
                                                onClick={() => this.handleShowNextForm()}
                                            >
                                                <i className="fas fa-chevron-left GoodDetail-icon-back"></i>Quay lại
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        vehicleCensorshipReducer: state.vehicleCensorshipReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getVehicleCensorship_forUser: async (user_id) => {
            const action = await getVehicleCensorship_forUser(user_id);
            return dispatch(action);
        },
        //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
        cartripFormCreate: async (account_id, cartrip_status_data) => {
            const action = await cartripFormCreate(account_id, cartrip_status_data);
            return dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarTripForm);
