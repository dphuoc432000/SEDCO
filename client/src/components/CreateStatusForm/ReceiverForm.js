import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import receiverFormCreate from "../../stores/actions/receiverForm.action";
import FormError from "../../components/FormError/FormError";
import getEssentials from "./../../stores/actions/essentials.action";
import { RECEIVER_FORM_CREATE_SUCCESS } from './../../constants/actions';
import ReceiverFormCss from './ReceiverForm.module.css';
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
        let value = event.target.value ? parseFloat(event.target.value) : 0;
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
    checkingForm = () => {
        const array = [this.state.number_per_of_family, this.state.note];
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

    submitFormReceiver = async (event) => {
        event.preventDefault();
        // await this.props.
        if (!this.checkEssentialForm() || this.checkingForm()) {
            console.log(this.checkEssentialForm(), this.checkingForm())
            toast.warn("Vui lòng nhập số lượng nhu yếu phẩm và số lượng người trong hộ gia đình!");
        } else {
            let formData = new FormData();
            formData.append("essentials", JSON.stringify(this.essentialsConvert(this.state.essentials)));
            formData.append("number_per_of_family", this.state.number_per_of_family.value);
            formData.append("note", this.state.note.value)
            formData.append("picture", this.state.picture)
            const receiverFormCreate = await this.props.receiverFormCreate(this.props.account_id, formData)
            if (receiverFormCreate.type === RECEIVER_FORM_CREATE_SUCCESS) {
                this.props.exitModalReceiverForm();
                this.props.handleLoadAgainWhenCreateStatus();
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
    render() {
        // console.log("check >>>", this.props.essentialsRedux);
        // // let {  } = this.state;
        // let essentitalsReact = this.props.essentialsRedux;

        let essentials = this.props.essentialsReducer.essentials;
        // console.log("check", this.checkEssentialForm());

        return (
            <div className={ReceiverFormCss.receiver_form_container}>
                <div className={ReceiverFormCss.receiver_form_layer_container}>
                    <div className={ReceiverFormCss.receiver_form_layer_background} onClick={() => this.props.exitModalReceiverForm()}></div>
                    <div className={ReceiverFormCss.form_container}>
                        <div className={ReceiverFormCss.close_button_container}>
                            <button
                                className={ReceiverFormCss.close_button}
                                onClick={() => this.props.exitModalReceiverForm()}
                            >
                                X
                            </button>
                        </div>
                        <div  className={ReceiverFormCss.receiver_form}>
                            <div className={ReceiverFormCss.content}>
                                <h2 className={ReceiverFormCss.heading}>Bạn cần hỗ trợ</h2>
                                <p className={ReceiverFormCss.content_heading}>
                                    Chỉ nhận giúp đỡ khi thật sự cần vì còn nhiều người khó khăn
                                    hơn.
                                </p>
                            </div>
                            <form className={ReceiverFormCss.form} enctype="multipart/form-data">
                                <h3 className={ReceiverFormCss.receiver_form_title}>Nhu yếu phẩm</h3>
                                {essentials.map((essential) => {
                                    return (
                                        <div className={ReceiverFormCss.receiver_form_essentials} key={essential._id} >
                                            <p className={ReceiverFormCss.input_title}>{essential.name}</p>
                                            <div className={ReceiverFormCss.input_item_container}>
                                                <input
                                                    data-id={essential._id}
                                                    type="text"
                                                    placeholder="0"
                                                    className={ReceiverFormCss.input_item}
                                                    name={essential.code_name}
                                                    value={
                                                        !isEmpty(this.state.essentials) &&
                                                        this.state.essentials[`${essential.code_name}`]
                                                            .quantity
                                                    }
                                                    onKeyPress={event =>this.onlyInputFloatNumber(event)}
                                                    onChange={(event) => {
                                                        this.handleEssentialInput(event, 0, 50);
                                                    }}
                                                />
                                                <div class={ReceiverFormCss.vl}></div>
                                                <p className={ReceiverFormCss.unit}>{essential.unit}</p>
                                            </div>
                                            <div className={ReceiverFormCss.err_container}>
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
                                        </div>
                                    );
                                })}

                                <h3 className={ReceiverFormCss.receiver_form_title}>Thông tin khác</h3>
                                <p className={ReceiverFormCss.input_title}>Số người trong gia đình</p>
                                <div className={ReceiverFormCss.input_item_container}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className={ReceiverFormCss.input_item}
                                        name="number_per_of_family"
                                        value={this.state.number_per_of_family.value}
                                        onKeyPress={(event) => this.onlyInputNumber(event)}
                                        onChange={(event) => this.handleNumberGDInput(event, 1, 10)}
                                    />
                                    <div className={ReceiverFormCss.vl}></div>
                                    <p className={ReceiverFormCss.unit}>Người</p>
                                </div>
                                <div className={ReceiverFormCss.err_container}>
                                    <FormError
                                        type="number_per_of_family"
                                        isHidden={this.state.number_per_of_family.isInputValue}
                                        errorMessage={this.state.number_per_of_family.errorMessage}
                                    />
                                </div>
                                <p className={ReceiverFormCss.input_title}>Mô tả hoàn cảnh/Ghi chú</p>
                                <textarea
                                    type="text"
                                    className={ReceiverFormCss.note}
                                    name="note"
                                    value={this.state.note.value}
                                    onChange={(event) => this.handlechange(event)}
                                />
                                <h3 className={ReceiverFormCss.receiver_form_title}>Hình ảnh</h3>
                                <div className={ReceiverFormCss.img_receiver_container}>
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
                                        <p className={ReceiverFormCss.bnt_add_image}>Thêm</p>
                                    </label>
                                    <img
                                        className={ReceiverFormCss.img_item}
                                        src=""
                                        id="picture_data"
                                        alt=""
                                    />
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                    className={ReceiverFormCss.btn_create_container}
                                >
                                    <button
                                        className={ReceiverFormCss.btn_create}
                                        onClick={(event) => this.submitFormReceiver(event)}
                                    >
                                        Tạo
                                    </button>
                                </div>
                            </form>
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
