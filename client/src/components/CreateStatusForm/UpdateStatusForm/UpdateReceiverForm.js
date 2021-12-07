import React, { Component } from "react";
import ReceiverFormCss from '../ReceiverForm.module.css';
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
    updateFormReceiver = async (event) => {
        // await this.props.
        event.preventDefault()
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
        // console.log("props",this.props)
        const picture = this.props.status_current.detail.picture;
        let essentials = this.props.essentialsReducer.essentials;
        return (
            <div className={ReceiverFormCss.receiver_form_container}>
                <div className={ReceiverFormCss.receiver_form_layer_container}>
                    <div className={ReceiverFormCss.receiver_form_layer_background} onClick={() => this.props.handleShowHideUpdateReceiver()}></div>
                    <div className={ReceiverFormCss.form_container}>
                        <div className={ReceiverFormCss.close_button_container}>
                            <button
                                className={ReceiverFormCss.close_button}
                                onClick={() => this.props.handleShowHideUpdateReceiver()}
                            >
                                X
                            </button>
                        </div>
                        <div className={ReceiverFormCss.receiver_form}>
                            <div className={ReceiverFormCss.content}>
                                <h2 className={ReceiverFormCss.heading}>Cập nhật cần hỗ trợ</h2>
                                <p className={ReceiverFormCss.content_heading}>
                                    Chỉ nhận giúp đỡ khi thật sự cần vì còn nhiều người khó khăn
                                    hơn.
                                </p>
                            </div>
                            <form className={ReceiverFormCss.form} enctype="multipart/form-data">
                                <h3 className={ReceiverFormCss.receiver_form_title}>Nhu yếu phẩm</h3>
                                {essentials.map((essential) => {
                                    return (
                                        <div className={ReceiverFormCss.receiver_form_essentials} key={essential._id}>
                                            <p className={ReceiverFormCss.input_title}>{essential.name}</p>
                                            <div className={ReceiverFormCss.input_item_container}>
                                                <input
                                                    data-id={essential._id}
                                                    type="text"
                                                    placeholder={essential.quantity}
                                                    className={ReceiverFormCss.input_item}
                                                    name={essential.code_name}
                                                    value={
                                                        !isEmpty(this.state.essentials) &&
                                                        this.state.essentials[`${essential.code_name}`]
                                                            .quantity
                                                    }
                                                    onKeyPress={event =>this.onlyInputFloatNumber(event)}
                                                    onChange={(event) =>
                                                        this.handleEssentialInput(event, 0, 50)
                                                    }
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
                                {/* <input type="text" className="GhiChu-Update" /> */}
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
                                        <p className={ReceiverFormCss.bnt_add_image}>Cập nhật</p>
                                    </label>
                                    <img
                                    className={ReceiverFormCss.img_item}
                                        src={`${API_IMAGE_URL}/${picture}`}
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
                                    onClick={(event) => this.updateFormReceiver(event)}
                                >
                                    Cập nhật
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
