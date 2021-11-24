import React, { Component } from "react";
import "./CarTripForm.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { connect } from "react-redux";
import cartripFormCreate from "../../stores/actions/createStatusCarTrip.action";
import { getVehicleCensorship_forUser } from "../../stores/actions/vehicle_censorship.action";
import { API_IMAGE_URL } from "../../constants/api";
import { toast } from "react-toastify";
import { FormError } from "../../components/FormError/FormError";
import { CARTRIP_FORM_CREATE_SUCCESS } from "../../constants/actions";
const getFullDate = (jsonDate) => {
  const date = new Date(jsonDate);
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
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
    console.log(value);
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
            errorMessage: "Vui lòng nhập trường này(bắt buộc*)!",
          };
        return { isInputValue: true, errorMessage: "" };

      case "many_people":
        var many_people_regex = /^[0-9]/;
        const check_many_people_regex = many_people_regex.exec(checkingText);
        if (check_many_people_regex !== null) {
          return { isInputValue: true, errorMessage: "" };
        }
        return {
          isInputValue: false,
          errorMessage: "Vui lòng nhập định dạng chữ số!",
        };

      case "tonnage":
        var tonnage_regex = /^[0-9]/;
        const check_tonnage_regex = tonnage_regex.exec(checkingText);
        if (check_tonnage_regex !== null) {
          //   return { isInputValue: true, errorMessage: "" };
          return { isInputValue: true, errorMessage: "" };
        }
        return {
          isInputValue: false,
          errorMessage: "Vui lòng nhập định dạng chữ số!",
        };
      case "license_plate":
        var license_plateRegex =
          /^([ABCDEFHKLMNPRSTUVXYZabccdefhklmnprstuvxyz 0-9\-\.]{9,15})$/;
        const checkingusernameRegex = license_plateRegex.exec(checkingText);
        if (checkingusernameRegex !== null) {
          return { isInputValue: true, errorMessage: "" };
        }
        return {
          isInputValue: false,
          errorMessage:
            "Vui lòng nhập đúng định dạng. Bao gồm: ABCDEFHKLMNPRSTUVXYZabccdefhklmnprstuvxyz 0-9\\-\\. 9-11 kí tự",
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
        ).valueOf();

        if (
          start_receive_state_value - today >= 0 ||
          departure_time_class_value_start_receive_time -
            start_receive_state_value >=
            0
        ) {
          return { isInputValue: true, errorMessage: "" };
        }
        return {
          isInputValue: false,
          errorMessage:
            "Vui lòng nhập lại. Ngày bắt đầu nhận không nhỏ hơn ngày hiện tại & > ngày vận chuyển!",
        };

      case "departure_time":
        const start_receive_time_class = document.getElementsByClassName(
          "start_receive_time_class"
        )[0];
        const start_receive_time_class_value = start_receive_time_class.value;
        // var today_departure_time = new Date(getFullDate(new Date())).valueOf();
        var today_departure_time = new Date(getFullDate(new Date())).valueOf();
        var start_receive_state_value_departure_time = new Date(
          getFullDate(start_receive_time_class_value)
        ).valueOf(); //13
        var departure_time_state_value = new Date(
          getFullDate(checkingText)
        ).valueOf(); //13
        console.log(departure_time_state_value - today_departure_time);
        console.log(
          departure_time_state_value - start_receive_state_value_departure_time
        );
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
            "Vui lòng nhập lại. Ngày băt đầu khởi hành không < ngày hiện tại & ngày bắt đầu nhận!",
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
    console.log("check state", this.checkingFormImg());
    const vehicle_censorship = this.state.vehicle_censorship;
    
    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <div style={{ float: "right" }}>
              <button
                className="back-receiver js-btn-ReceiverBack"
                onClick={() => this.props.exitModalCarTripForm()}
              >
                X
              </button>
            </div>

            {isNextPage === false ? (
              <>
                <h1 className="cartrip-title">Tạo chuyến xe</h1>
                <div className="wrapped_large" style={{marginLeft: '34px',overflow: 'hidden',}}>
                        <h3 className="cartrip-label" style={{marginLeft: '0px'}}>Thông tin xe</h3>
                        <div className="Wrapped" >
                                <select
                                    className="Select Select-sizeL"
                                    value={this.state.car.type_car.value}
                                    name="type_car"
                                    onChange={(event) => {
                                    this.handleOnChangeCar(event);
                                    }}
                                    style={{marginLeft: '-32px'}}
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
                                    className="input-cartrip"
                                    placeholder="Số lượng người"
                                    name="many_people"
                                    value={this.state.car.many_people.value}
                                    onChange={(event) => {
                                    this.handleOnChangeCar(event);
                                    }}
                                />
                                
                        </div>
                        <div style={{display: 'flex'}}>
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
                        <div className="Wrapped" style={{marginTop: '27px'}}>
                        <input
                            style={{marginLeft: '-31px',}}
                            type="text"
                            className="input-cartrip"
                            placeholder="Biển số xe(Bắt buộc)*"
                            name="license_plate"
                            value={this.state.car.license_plate.value}
                            onChange={(event) => {
                            this.handleOnChangeCar(event);
                            }}
                        />
                        
                        <div
                            style={{
                            width: "220px",
                            display: "flex",
                            border: "1px solid black",
                            }}
                        >
                            <input
                            type="text"
                            className="input-cartrip"
                            placeholder="Trọng tải"
                            name="tonnage"
                            style={{ border: "none", outline: "none" }}
                            value={this.state.car.tonnage.value}
                            onChange={(event) => {
                                this.handleOnChangeCar(event);
                            }}
                            />

                            <label
                            htmlFor=""
                            style={{
                                marginRight: "30px",
                                fontWeight: "700",
                                lineHeight: "33px",
                            }}
                            >
                            Tấn
                            </label>
                        </div>
                        
                        </div>
                        <div style={{display: "flex"}}>
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
                        <h3 className="cartrip-label" style={{marginLeft: '0px'}}>Thông tin chuyến xe</h3>

                        <div style={{ display: "flex", marginBottom: "20px",marginLeft: '20px', }}>
                            <h3 className="cartrip-label" style={{ color: "#767474" }}>
                                Bắt đầu nhận hàng
                            </h3>

                            <input
                                type="date"
                                name="start_receive_time"
                                className="start_receive_time_class"
                                style={{ width: "336px", marginLeft: "30px" }}
                                value={getFullDate(this.state.start_receive_time.value)}
                                onChange={(event) => {
                                this.handleOnChange(event);
                                }}
                            />
                        </div>
                        <FormError
                        type="start_receive_time"
                        isHidden={this.state.start_receive_time.isInputValue}
                        errorMessage={this.state.start_receive_time.errorMessage}
                        />

                        <div style={{ display: "flex" ,marginLeft: '20px'}}>
                            <h3 className="cartrip-label" style={{ color: "#767474" }}>
                                Bắt đầu khởi hành
                            </h3>

                            <input
                                type="date"
                                name="departure_time"
                                className="departure_time_class"
                                style={{ width: "336px", marginLeft: "34px" }}
                                value={this.state.departure_time.value}
                                onChange={(event) => {
                                this.handleOnChange(event);
                                }}
                            />
                        </div>
                        <FormError
                        type="departure_time"
                        isHidden={this.state.departure_time.isInputValue}
                        errorMessage={this.state.departure_time.errorMessage}
                        />

                        <h3 className="cartrip-label" style={{marginLeft: '0px'}}>Lộ trình</h3>
                        <div className="Wrapped">
                            <input
                                type="text"
                                className="input-cartrip"
                                placeholder="Địa điểm khởi hành(Bắt buộc)*"
                                name="location_start"
                                value={this.state.location_start.value}
                                onChange={(event) => {
                                this.handleOnChange(event);
                                }}
                                style={{marginLeft: '-33px'}}
                            />
                            
                            <input
                                type="text"
                                className="input-cartrip"
                                placeholder="Địa điểm đến(Bắt buộc)*"
                                value={this.state.location_finish.value}
                                name="location_finish"
                                onChange={(event) => {
                                this.handleOnChange(event);
                                }}
                            />
                            
                        </div>
                        <div style={{ display: "flex"}}>
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
                </div>
                

                <input
                  type="text"
                  className="note"
                  placeholder="Ghi chú"
                  value={this.state.note.value}
                  name="note"
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />

                <div>
                  <h3 className="cartrip-label" style={{marginLeft: '35px'}}>Hình ảnh</h3>
                  <div
                    className="Wrapped-NextFrom-left"
                    style={{ marginLeft: "34px", paddingBottom: "30px" }}
                  >
                    <div className="Block-IMG">
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

                      <React.Fragment>
                        <label htmlFor="picture">
                          <p>Thêm</p>
                        </label>
                        <img
                          className="img_item"
                          src=""
                          id="picture_data"
                          alt=""
                          
                        />
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="button-2"
                    onClick={() => this.handleShowNextForm()}
                  >
                    Tiếp theo
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="cartrip-title">Thông tin tài xế</h1>

                {/* Chứng minh nhân dân */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 className="cartrip-label">
                    Căn cước công dân/Chứng minh nhân dân
                  </h3>
                  <ion-icon
                    name="arrow-down-outline"
                    style={{
                      fontSize: "15px",
                      fontweight: "300",
                      color: "#9f9f9f",
                      marginLeft: "5px",
                    }}
                  ></ion-icon>
                </div>
                <div className="cartrip-Row">
                  <div className="Wrapped-NextFrom-left">
                    <h3 className="cartrip-label-child">Mặt trước</h3>
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_before}`}
                            id="id_card_img_before_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="id_card_img_before">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
                            src=""
                            id="id_card_img_before_data"
                            alt=""
                          />
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <div className="Wrapped-NextFrom-right">
                    <h3 className="cartrip-label-child">Mặt sau</h3>
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_after}`}
                            id="id_card_img_after_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="id_card_img_after">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 className="cartrip-label">Khuôn mặt</h3>
                  <ion-icon
                    name="arrow-down-outline"
                    style={{
                      fontSize: "15px",
                      fontweight: "300",
                      color: "#9f9f9f",
                      marginLeft: "5px",
                    }}
                  ></ion-icon>
                </div>
                <div className="cartrip-Row">
                  <div className="Wrapped-NextFrom-left">
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.face_img}`}
                            id="face_img_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="face_img">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 className="cartrip-label">Giấy phép lái xe</h3>
                  <ion-icon
                    name="arrow-down-outline"
                    style={{
                      fontSize: "15px",
                      fontweight: "300",
                      color: "#9f9f9f",
                      marginLeft: "5px",
                    }}
                  ></ion-icon>
                </div>
                <div className="cartrip-Row">
                  <div className="Wrapped-NextFrom-left">
                    <h3 className="cartrip-label-child">Mặt trước</h3>
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.driving_license_img_before}`}
                            id="driving_license_img_before_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="driving_license_img_before">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
                            src=""
                            id="driving_license_img_before_data"
                            alt=""
                          />
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <div className="Wrapped-NextFrom-right">
                    <h3 className="cartrip-label-child">Mặt sau</h3>
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_before}`}
                            id="driving_license_img_after_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="driving_license_img_after">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 className="cartrip-label">
                    Giấy xét nghiệm Covid/Đã tiêm vaccine
                  </h3>
                  <ion-icon
                    name="arrow-down-outline"
                    style={{
                      fontSize: "15px",
                      fontweight: "300",
                      color: "#9f9f9f",
                      marginLeft: "5px",
                    }}
                  ></ion-icon>
                </div>
                <div className="cartrip-Row">
                  <div className="Wrapped-NextFrom-left">
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_1}`}
                            id="test_img_1_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="test_img_1">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
                            src=""
                            id="test_img_1_data"
                            alt=""
                          />
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <div className="Wrapped-NextFrom-right">
                    <div className="Block-IMG">
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
                            <p>Chỉnh sửa</p>
                          </label>
                          <img
                            className="img_item"
                            src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_2}`}
                            id="test_img_2_data"
                            alt=""
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <label htmlFor="test_img_2">
                            <p>Cập nhật</p>
                          </label>
                          <img
                            className="img_item"
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
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <button
                    style={{
                      marginRight: "20px",
                      padding: "3px 14px",
                      cursor: "pointer",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "5px",
                    }}
                    onClick={() => this.handleShowNextForm()}
                  >
                    Quay lại
                  </button>
                  <button
                    className="button-2"
                    onClick={() => this.submitFormCartrip()}
                  >
                    Tạo
                  </button>
                </div>
              </>
            )}
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
