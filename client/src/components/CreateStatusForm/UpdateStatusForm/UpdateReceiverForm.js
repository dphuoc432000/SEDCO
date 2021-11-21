import React, { Component } from "react";
import "./UpdateReceiverForm.css";
import { connect } from "react-redux";
import { updateReceiverStatus } from "../../../stores/actions/updateStatusReceiver.action";
import getEssentials from "../../../stores/actions/essentials.action";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import { toast } from "react-toastify";
import getEssentialsDetail from "../../../stores/actions/essentialsDetail.action";
import { UPDATE_STATUS_RECEIVER_SUCCESS } from "../../../constants/actions";
import FormError from "../../../components/FormError/FormError";
import { API_IMAGE_URL } from "../../../constants/api";
const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};
class UpdateReceiverForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essentials: {},
      number_per_of_family: {
        isInputValue: false,
        value: null,
        errorMessage: "",
      },
      note: {
        isInputValue: true,
        value: "",
        errorMessage: "",
      },
      picture: "",
    };
  }

  componentDidMount = async () => {
    const status_data_old = await axios
      .get(`${API_URL}/api/receiver/${this.props.receiver_status_id}/detail`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    await this.props.getEssentials();
    //bảng essentials
    const essentials = await this.props.essentialsReducer.essentials;
    //essential cũ của status
    const essentials_data_old = status_data_old.essentials;
    const number_per_of_family_data_old = status_data_old.number_per_of_family;
    const note_data_old = status_data_old.note;

    // console.log(essentials_data_old);

    //map essentials cho essentials trong state
    const object = {};
    essentials.map((essential) => {
      let essential_old = essentials_data_old.find((essential_old_element) => {
        return essential._id === essential_old_element.essential_id;
      });
      // console.log(essential_old);
      object[`${essential.code_name}`] = {
        essential_id: essential._id,
        quantity: essential_old.quantity,
        isInputValue: true,
        errorMessage: "",
      };
      return object[`${essential.name}`];
    });
    // console.log(object);
    this.setState({
      status_data_old: status_data_old,
      essentials: {
        ...object,
      },
      number_per_of_family: {
        value: number_per_of_family_data_old,
        isInputValue: true,
        errorMessage: "",
      },
      note: {
        value: note_data_old,
        isInputValue: true,
        errorMessage: "",
      },
    });
  };
  handleOnchange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    const essential_id = event.target.getAttribute("data-id");
    console.log(name, value, essential_id);
    this.setState({
      essentials: {
        ...this.state.essentials,
        [name]: {
          ...this.state.essentials[name],
          //   essential_id: essential_id,
          quantity: parseInt(value),
        },
      },
    });
  };
  handleEssentialInput = (event, start, end) => {
    var text_regex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]$/;
    var spec_char_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let value = event.target.value ? parseInt(event.target.value) : 0;
    let errorMessage = "";
    if (spec_char_regex.test(value) || text_regex.test(value)) value = 0;
    else if (value < start || value > end)
      errorMessage = `Vui lòng nhập số lượng từ ${start} đến ${end}`;
    else errorMessage = "";
    this.setState({
      essentials: {
        ...this.state.essentials,
        [event.target.name]: {
          ...this.state.essentials[event.target.name],
          quantity: value,
          errorMessage: errorMessage,
        },
      },
    });
  };

  handleNumberGDInput = (event, start, end) => {
    var text_regex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]$/;
    var spec_char_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let value = event.target.value ? parseInt(event.target.value) : 0;
    let errorMessage = "";
    let isInputValue = false;
    if (spec_char_regex.test(value) || text_regex.test(value)) {
      value = 0;
    } else if (value < start || value > end)
      errorMessage = `Vui lòng nhập số lượng từ ${start} đến ${end}`;
    else {
      errorMessage = "";
      isInputValue = true;
    }
    this.setState({
      number_per_of_family: {
        ...this.state.number_per_of_family,
        value: value,
        errorMessage,
        isInputValue,
      },
    });
  };

  checkEssentialForm = () => {
    console.log("Vao1");
    const array = [...Object.values(this.state.essentials)];
    return array.some((item) => {
      return item.quantity > 0;
    });
  };
  checkingForm = () => {
    console.log("Vao2");
    const array = [this.state.number_per_of_family, this.state.note];
    return array.some((item) => {
      return item.isInputValue === false;
    });
  };

  handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      [name]: {
        ...this.state[name],
        value,
      },
    });
  };
  getEssentialsDetail = async (essential_id) => {
    await this.props.getEssentialsDetail(essential_id);
    const essentialsDetail = await this.props.essentialsDetailReducer;
    // console.log(essentialsDetail)
    return essentialsDetail;
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
  essentialsConvert = (essentials) => {
    const array = Object.keys(essentials).map((key) => {
      const essential = essentials[key];
      return {
        essential_id: essential["essential_id"],
        quantity: essential["quantity"],
      };
    });
    return array;
  };
  updateFormReceiver = async () => {
    // await this.props.
    const receiver_status_id = this.props.receiver_status_id;
    const receiver_status_data = {
      essentials: this.state.essentials,
      number_per_of_family: this.state.number_per_of_family.value,
      note: this.state.note.value,
    };
    

    if (!this.checkEssentialForm() || this.checkingForm()) {
      toast.warn("Vui lòng nhập số lượng nhu yếu phẩm");
    } else {
      let formData = new FormData();
      formData.append(
        "essentials",
        JSON.stringify(this.essentialsConvert(this.state.essentials))
      );
      formData.append(
        "number_per_of_family",
        this.state.number_per_of_family.value
      );
      formData.append("note", this.state.note.value);
      formData.append("picture", this.state.picture);
      const updateaction = await this.props.updateReceiverStatus(
        receiver_status_id,
        formData
      );
      if (updateaction.type !== UPDATE_STATUS_RECEIVER_SUCCESS)
        toast.error("Cập nhật không thành công!");
      else {
        toast.success("Cập nhật thành công!");
        const essentialsConvert = Object.keys(this.state.essentials).map(
          (key) => {
            return receiver_status_data.essentials[key];
          }
        );
        const essentials_map = await Promise.all(
          essentialsConvert.map(async (essential) => {
            const essential_detail = await this.getEssentialsDetail(
              essential.essential_id
            );
            return {
              ...essential,
              name: essential_detail.name,
              code_name: essential_detail.code_name,
              unit: essential_detail.unit,
            };
          })
        );
        // console.log(essentials_map)
        this.props.handleUpdateEssentials(essentials_map);
        this.props.handleShowHideUpdateReceiver();
        this.props.handleUpdateStatusCurrent(123);
      }
    }
  };
  render() {
    // console.log("props",this.props)
    const picture = this.props.status_current.detail.picture;
    let essentials = this.props.essentialsReducer.essentials;
    console.log(this.state);
    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <div style={{ float: "right" }}>
              <button
                className="back-update js-btn-ReceiverBack"
                onClick={() => this.props.handleShowHideUpdateReceiver()}
              >
                X
              </button>
            </div>

            <div className="content">
              <p className="heading">Cập nhật cần hỗ trợ</p>
              <p className="heading-2">
                (Chỉ nhận giúp đở khi thật sự cần vì còn nhiều người khó khăn
                hơn)
              </p>
            </div>
            <div className="input-UpdateStatusForm">
              <form action="#">
                <p className="heading-3 total">Nhu yếu phẩm</p>

                {essentials.map((essential) => {
                  return (
                    <div key={essential._id}>
                      <h3 className="input-title">{essential.name}</h3>
                      <div className="input-item-Update">
                        <input
                          data-id={essential._id}
                          type="text"
                          placeholder={essential.quantity}
                          className="input-item-update"
                          name={essential.code_name}
                          value={
                            !isEmpty(this.state.essentials) &&
                            this.state.essentials[`${essential.code_name}`]
                              .quantity
                          }
                          //   value={
                          //     this.state.essentials[`${essential.code_name}`] &&
                          //     this.state.essentials[`${essential.code_name}`]
                          //       .quantity
                          //   }
                          onChange={(event) =>
                            this.handleEssentialInput(event, 0, 50)
                          }
                        />
                        <p className="unit">{essential.unit}</p>
                      </div>
                      <FormError
                        type={essential.code_name}
                        isHidden={
                          !isEmpty(this.state.essentials) &&
                          this.state.essentials[essential.code_name]
                            .isInputValue
                        }
                        errorMessage={
                          !isEmpty(this.state.essentials) &&
                          this.state.essentials[essential.code_name]
                            .errorMessage
                        }
                      />
                    </div>
                  );
                })}

                <p className="heading-3 total">Thông tin khác</p>

                <h3 className="input-title">Số người trong gia đình</h3>
                <div className="input-item-Update">
                  <input
                    type="text"
                    placeholder="0"
                    className="input-item-update"
                    name="number_per_of_family"
                    value={this.state.number_per_of_family.value}
                    onChange={(event) => this.handleNumberGDInput(event, 1, 10)}
                  />
                  <p className="unit">Người</p>
                </div>
                <FormError
                  type="number_per_of_family"
                  isHidden={this.state.number_per_of_family.isInputValue}
                  errorMessage={this.state.number_per_of_family.errorMessage}
                />
                <h3 className="input-title">Mô tả hoàn cảnh/ ghi chú</h3>
                {/* <input type="text" className="GhiChu-Update" /> */}
                <input
                  type="text"
                  className="GhiChu-Update"
                  name="note"
                  value={this.state.note.value}
                  onChange={(event) => this.handlechange(event)}
                />
                <h3 className="cartrip-label">Hình ảnh</h3>
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
                        src={`${API_IMAGE_URL}/${picture}`}
                        id="picture_data"
                        alt=""
                      />
                    </React.Fragment>
                  </div>
                </div>
              </form>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "35px",
                marginBottom: "30px",
              }}
            >
              <button
                className="button-2"
                onClick={() => this.updateFormReceiver()}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    essentialsReducer: state.essentialsReducer,
    essentialsDetailReducer: state.essentialsDetailReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentialsDetail: async (essential_id) => {
      const action = await getEssentialsDetail(essential_id);
      return dispatch(action);
    },
    getEssentials: async () => {
      const action = await getEssentials();
      return dispatch(action);
    },
    //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
    updateReceiverStatus: async (receiver_status_id, receiver_status_data) => {
      console.log("vao");
      const action = await updateReceiverStatus(
        receiver_status_id,
        receiver_status_data
      );
      console.log(action);
      return dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateReceiverForm);
