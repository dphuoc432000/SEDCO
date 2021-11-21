import React, { Component } from "react";
import "./ReceiverForm.css";
import { connect } from "react-redux";
import senderFormCreate from "../../stores/actions/senderForm.action";
import { FormError } from "../../components/FormError/FormError";
import { SENDER_FORM_CREATE_SUCCESS } from "../../constants/actions";
import getEssentials from "./../../stores/actions/essentials.action";
import { toast } from "react-toastify";
const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};
class SenderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      essentials: {},
      weight_essential: {
        isInputValue: false,
        value: null,
        errorMessage: "",
      },
      note: {
        isInputValue: true,
        errorMessage: "",
        value: "",
      },

      picture: "",
    };
  }
  componentDidMount = async () => {
    await this.props.getEssentials();
    const essentials = await this.props.essentialsReducer.essentials;
    const object = {};
    essentials.map((essential) => {
      object[`${essential.code_name}`] = {
        essential_id: essential._id,
        quantity: 0,
        isInputValue: true,
        errorMessage: "",
      };
      return object[`${essential.name}`];
    });
    this.setState({
      essentials: {
        ...object,
      },
    });
  };
  handleOnchange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (value == null || value === "") value = 0;
    console.log(name, value);
    this.setState({
      essentials: {
        ...this.state.essentials,
        [name]: {
          ...this.state.essentials[name],
          quantity: parseInt(value),
          //   ...dataValidate,
        },
      },
    });
  };
  handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      [name]: {
        value,
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
  handleWeight_Essential_Input = (event, start, end) => {
    var text_regex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]$/;
    var spec_char_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let value = event.target.value ? parseInt(event.target.value) : 0;
    let errorMessage = "";
    let isInputValue = false;
    if (spec_char_regex.test(value) || text_regex.test(value)) value = 0;
    else if (value < start || value > end)
      errorMessage = `Vui lòng nhập số lượng từ ${start} đến ${end}`;
    else {
      errorMessage = "";
      isInputValue = true;
    }

    this.setState({
      weight_essential: {
        ...this.state.weight_essential,
        value: value,
        errorMessage,
        isInputValue,
      },
    });
  };
  checkEssentialForm = () => {
    console.log("vao1");
    const array = [...Object.values(this.state.essentials)];
    return array.some((item) => {
      return item.quantity > 0;
    });
  };
  checkingForm = () => {
    console.log("Vao2");
    const array = [this.state.weight_essential, this.state.note];
    return array.some((item) => {
      return item.isInputValue === false;
    });
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
  submitFormSender = async () => {
    // await this.props.
    if (!this.checkEssentialForm() || this.checkingForm()) {
      toast.warn("Vui lòng nhập số lượng nhu yếu phẩm");
    } else {
      let formData = new FormData();
      formData.append(
        "essentials",
        JSON.stringify(this.essentialsConvert(this.state.essentials))
      );
      formData.append("weight_essential", this.state.weight_essential.value);
      formData.append("note", this.state.note.value);
      formData.append("picture", this.state.picture);
      const senderFormCreate = await this.props.senderFormCreate(
        this.props.account_id,
        formData
      );
      if (senderFormCreate.type === SENDER_FORM_CREATE_SUCCESS) {
        this.props.exitModalSenderForm();
        this.props.handleLoadAgainWhenCreateStatus();
        toast.success("Tạo trạng thái thành công!");
      } else {
        toast.error("Đã xảy ra lỗi trong quá trình tạo trạng thái!");
      }
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
  render() {
    let essentials = this.props.essentialsReducer.essentials;
    console.log("check", this.state);

    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <div style={{ float: "right" }}>
              <button
                className="back-receiver js-btn-ReceiverBack"
                onClick={() => this.props.exitModalSenderForm()}
              >
                X
              </button>
            </div>

            <div className="content">
              <p className="heading">Bạn muốn hỗ trợ</p>
            </div>
            <div className="input-1">
              <form action="#">
                <p className="heading-3 total">Nhu yếu phẩm</p>

                {essentials.map((essential) => {
                  return (
                    <div key={essential._id}>
                      <h3 className="input-title">{essential.name}</h3>
                      <div className="input-item">
                        <input
                          data-id={essential._id}
                          type="text"
                          placeholder="0"
                          className="input-item1"
                          name={essential.code_name}
                          value={
                            !isEmpty(this.state.essentials) &&
                            this.state.essentials[`${essential.code_name}`]
                              .quantity
                          }
                          onChange={(event) =>
                            this.handleEssentialInput(event, 1, 1000)
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

                <h3 className="input-title">Tổng khối lượng</h3>

                <div className="input-item">
                  <input
                    type="text"
                    placeholder="0"
                    className="input-item1"
                    name="weight_essential"
                    value={this.state.weight_essential.value}
                    onChange={(event) =>
                      this.handleWeight_Essential_Input(event, 1, 200)
                    }
                  />
                  <p className="unit">Kg</p>
                </div>
                <FormError
                  type="weight_essential"
                  isHidden={this.state.weight_essential.isInputValue}
                  errorMessage={this.state.weight_essential.errorMessage}
                />
                <h3 className="input-title">Ghi chú</h3>
                <input
                  type="text"
                  className="GhiChu"
                  name="note"
                  value={this.state.note.value}
                  onChange={(event) => this.handlechange(event)}
                />
                <FormError
                  type="note"
                  isHidden={this.state.note.isInputValue}
                  errorMessage={this.state.note.errorMessage}
                />
                <div>
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
                          src=""
                          id="picture_data"
                          alt=""
                        />
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p className="heading-2">Chúng tôi cảm ơn bạn rất nhiều</p>
              <p className="heading-2">
                Cùng chung tay hỗ trợ những người khó khăn
              </p>
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
                onClick={() => this.submitFormSender()}
              >
                Tạo
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentials: async () => {
      const action = await getEssentials();
      return dispatch(action);
    },
    //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
    senderFormCreate: async (account_id, sender_status_data) => {
      const action = await senderFormCreate(account_id, sender_status_data);
      return dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SenderForm);
