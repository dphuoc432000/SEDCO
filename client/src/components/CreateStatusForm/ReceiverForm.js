import React, { Component } from "react";
import "./ReceiverForm.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import receiverFormCreate from "../../stores/actions/receiverForm.action";
import FormError from "../../components/FormError/FormError";
import getEssentials from "./../../stores/actions/essentials.action";
import {RECEIVER_FORM_CREATE_SUCCESS} from './../../constants/actions'
 const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};
class ReceiverForm extends Component {
  // const essentials = await this.props.essentialsReducer.essentials;
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
  handleNumberGDInput = (event, start, end) => {
    var text_regex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]$/;
    var spec_char_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let value = event.target.value ? parseInt(event.target.value) : 0;
    let errorMessage = "";
    let isInputValue = false;
    if (spec_char_regex.test(value) || text_regex.test(value))
        value = 0;
    else if (value < start || value > end)
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
    const array = [...Object.values(this.state.essentials)];
    console.log(array)
    return array.some((item) => {
        
      return item.quantity > 0;
    });
  };
  checkingForm =() =>{
    const array = [this.state.number_per_of_family , this.state.note];
    return array.some((item) => {
      return item.isInputValue === false;
    });
  }
  essentialsConvert = (essentials) => {
    const array = Object.keys(essentials).map(key => {
        const essential = essentials[key];
        return {
            essential_id: essential['essential_id'],
            quantity: essential['quantity'],

        }
      }) 
      return array
  };
 
  submitFormReceiver = async () => {
    // await this.props.
    if (!this.checkEssentialForm() || this.checkingForm()) {
        console.log(this.checkEssentialForm() , this.checkingForm())
      toast.warn("Vui lòng nhập số lượng nhu yếu phẩm");
    } else 
    {
        let formData = new FormData();
        formData.append("essentials", JSON.stringify(this.essentialsConvert(this.state.essentials)));
        formData.append("number_per_of_family", this.state.number_per_of_family.value);
        formData.append("note", this.state.note.value)
        formData.append("picture", this.state.picture)
        const receiverFormCreate =  await this.props.receiverFormCreate(this.props.account_id, formData)
        if (receiverFormCreate.type === RECEIVER_FORM_CREATE_SUCCESS){
            this.props.exitModalReceiverForm();
            this.props.handleLoadAgainWhenCreateStatus()
            toast.success("Tạo trạng thái thành công!");
        }
        else {
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
    // console.log("check >>>", this.props.essentialsRedux);
    // // let {  } = this.state;
    // let essentitalsReact = this.props.essentialsRedux;

    let essentials = this.props.essentialsReducer.essentials;
    console.log("check", this.checkEssentialForm());

    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <div style={{ float: "right" }}>
              <button
                className="back-receiver js-btn-ReceiverBack"
                onClick={() => this.props.exitModalReceiverForm()}
              >
                X
              </button>
            </div>

            <div className="content">
              <p className="heading">Bạn cần hỗ trợ</p>
              <p className="heading-2">
                (Chỉ nhận giúp đở khi thật sự cần vì còn nhiều người khó khăn
                hơn)
              </p>
            </div>
            <div className="input-1">
              <form enctype="multipart/form-data">
                <p className="heading-3 total">Nhu yếu phẩm</p>

                {essentials.map((essential) => {
                  return (
                    <div key={essential._id} >
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
                          onChange={(event) => {
                            this.handleEssentialInput(event, 0, 50);
                          }}
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

                <div className="input-item">
                  <input
                    type="text"
                    placeholder="0"
                    className="input-item1"
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
                    style={{  paddingBottom: "30px" }}
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
            <div
              style={{
                textAlign: "center",
                marginTop: "35px",
                marginBottom: "30px",
              }}
            >
              <button
                className="button-2"
                onClick={() => this.submitFormReceiver()}
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
    // receiverFormReducer : state.receiverFormReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentials: async () => {
      const action = await getEssentials();
      return dispatch(action);
    },
    //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
    receiverFormCreate: async (account_id, receiver_status_data) => {
      const action = await receiverFormCreate(account_id, receiver_status_data);
      return dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReceiverForm);
