import React, { Component } from "react";
import SenderFormCss from "../SenderForm.module.css";
import { connect } from "react-redux";
import { updateSenderStatus } from "../../../stores/actions/updateStatusSender.action";
import getEssentials from "../../../stores/actions/essentials.action";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import getEssentialsDetail from "../../../stores/actions/essentialsDetail.action";
import { UPDATE_STATUS_SENDER_SUCCESS } from "../../../constants/actions";
import { toast } from "react-toastify";
import { API_IMAGE_URL } from "../../../constants/api";
import { FormError } from "../../../components/FormError/FormError";
const isEmpty = (object) => {
    return Object.keys(object).length === 0;
};
class UpdateSenderForm extends Component {
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
                value: "",
                errorMessage: "",
            },
            picture: "",
        };
    }
    componentDidMount = async () => {
        const status_data_old = await axios
            .get(`${API_URL}/api/sender/${this.props.sender_status_id}/detail`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
        await this.props.getEssentials();
        const essentials = await this.props.essentialsReducer.essentials;
        const essentials_data_old = status_data_old.essentials;
        const note_data_old = status_data_old.note;
        const weight_essential_data_old = status_data_old.weight_essential;

        const object = {};
        essentials.map((essential) => {
            let essential_old = essentials_data_old.find((essential_old_element) => {
                return essential._id === essential_old_element.essential_id;
            });

            object[`${essential.code_name}`] = {
                essential_id: essential._id,
                quantity: essential_old.quantity,
                isInputValue: true,
                errorMessage: "",
            };
            return object[`${essential.name}`];
        });
        this.setState({
            status_data_old: status_data_old,
            essentials: {
                ...object,
            },
            weight_essential: {
                value: weight_essential_data_old,
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
        const value = event.target.value;
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
    checkEssentialForm = () => {
        console.log("Vao1");
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
    updateFormSender = async (event) => {
        event.preventDefault();
        // await this.props.
        const sender_status_id = this.props.sender_status_id;
        const sender_status_data = {
            essentials: this.state.essentials,
            weight_essential: this.state.weight_essential.value,
            note: this.state.note.value,
        };
        if (!this.checkEssentialForm() || this.checkingForm()) {
            toast.warn("Vui lòng nhập số lượng nhu yếu phẩm");
        } else {
            let formData = new FormData();
            console.log(this.essentialsConvert(this.state.essentials))
            formData.append(
                "essentials",
                JSON.stringify(this.essentialsConvert(this.state.essentials))
            );
            formData.append("weight_essential", this.state.weight_essential.value);
            formData.append("note", this.state.note.value);
            formData.append("picture", this.state.picture);
            const updateaction = await this.props.updateSenderStatus(
                sender_status_id,
                formData
            );
            if (updateaction.type !== UPDATE_STATUS_SENDER_SUCCESS)
                toast.error("Cập nhật không thành công!");
            else {
                toast.success("Cập nhật thành công!");
                const essentialsConvert = Object.keys(this.state.essentials).map(
                    (key) => {
                        return sender_status_data.essentials[key];
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
                this.props.handleShowHideUpdateSender();
                this.props.handleUpdateStatusCurrent(123);
            }
        }
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
        if (spec_char_regex.test(value) || text_regex.test(value)) {
            value = 0;
        } else if (value < start || value > end)
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
        const picture = this.props.status_current.detail.picture;
        let essentials = this.props.essentialsReducer.essentials;
        return (
            <div className={SenderFormCss.sender_form_container}>
                <div className={SenderFormCss.sender_form_layer_container}>
                    <div className={SenderFormCss.sender_form_layer_background}></div>
                    <div className={SenderFormCss.form_container}>
                        <div className={SenderFormCss.close_button_container}>
                            <button
                                className={SenderFormCss.close_button}
                                onClick={() => this.props.handleShowHideUpdateSender()}
                            >
                                X
                            </button>
                        </div>
                        <div className={SenderFormCss.sender_form}>
                            <div className={SenderFormCss.content}>
                                <h2 className={SenderFormCss.heading}>Cập nhật hỗ trợ</h2>
                            </div>
                            <form className={SenderFormCss.form} enctype="multipart/form-data">
                                <h3  className={SenderFormCss.sender_form_title} >Nhu yếu phẩm</h3>
                                {essentials.map((essential) => {
                                    return (
                                        <div className={SenderFormCss.sender_form_essentials} key={essential._id}>
                                            <p className={SenderFormCss.input_title}>{essential.name}</p>
                                            <div className={SenderFormCss.input_item_container}>
                                                <input
                                                    data-id={essential._id}
                                                    type="text"
                                                    placeholder={essential.quantity}
                                                    className={SenderFormCss.input_item}
                                                    name={essential.code_name}
                                                    // value={this.state.essentials[`${essential.code_name}`].quantity}
                                                    value={
                                                        !isEmpty(this.state.essentials) &&
                                                        this.state.essentials[`${essential.code_name}`]
                                                            .quantity
                                                    }
                                                    onKeyPress={event =>this.onlyInputFloatNumber(event)}
                                                    onChange={(event) =>
                                                        this.handleEssentialInput(event, 0, 1000)
                                                    }
                                                />
                                                <div class={SenderFormCss.vl}></div>
                                                <p lassName={SenderFormCss.unit}>{essential.unit}</p>
                                            </div>
                                            <div className={SenderFormCss.err_container}>
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

                                <h3 className={SenderFormCss.sender_form_title}>Thông tin khác</h3>
                                <p className={SenderFormCss.input_title}>Tổng khối lượng</p>
                                <div className={SenderFormCss.input_item_container}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className={SenderFormCss.input_item}
                                        name="weight_essential"
                                        value={this.state.weight_essential.value}
                                        onKeyPress={(event) => this.onlyInputFloatNumber(event)}
                                        step="0.01"
                                        onChange={(event) =>
                                            this.handleWeight_Essential_Input(event, 1, 200)
                                        }
                                    />
                                    <div className={SenderFormCss.vl}></div>
                                    <p cclassName={SenderFormCss.unit}>Kg</p>
                                </div>
                                <div className={SenderFormCss.err_container}>
                                    <FormError
                                        type="weight_essential"
                                        isHidden={this.state.weight_essential.isInputValue}
                                        errorMessage={this.state.weight_essential.errorMessage}
                                    />
                                </div>
                                <p className={SenderFormCss.input_title}>Ghi chú</p>
                                <textarea
                                    type="text"
                                    className={SenderFormCss.note}
                                    name="note"
                                    value={this.state.note.value}
                                    onChange={(event) => this.handlechange(event)}
                                />

                                <h3 className={SenderFormCss.sender_form_title}>Hình ảnh</h3>
                                <div className={SenderFormCss.img_sender_container}>
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
                                        <p className={SenderFormCss.bnt_add_image}>Cập nhật</p>
                                    </label>
                                    {
                                        picture ? 
                                        <img
                                            className={SenderFormCss.img_item}
                                            src={`${API_IMAGE_URL}/${picture}`}
                                            id="picture_data"
                                            alt=""
                                        />
                                        :
                                        <img
                                            className={SenderFormCss.img_item}
                                            src=""
                                            id="picture_data"
                                            alt=""
                                        />
                                    }
                                </div>
                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <p className={SenderFormCss.content_heading}>Chúng tôi cảm ơn bạn rất nhiều</p>
                                    <p className={SenderFormCss.content_heading}>Cùng chung tay hỗ trợ những người khó khăn</p>
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                    className={SenderFormCss.btn_create_container}
                                >
                                    <button
                                        className={SenderFormCss.btn_create}
                                        onClick={(event) => this.updateFormSender(event)}
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
        updateSenderStatus: async (sender_status_id, sender_status_data) => {
            console.log("vao");
            const action = await updateSenderStatus(
                sender_status_id,
                sender_status_data
            );
            console.log(action);
            return dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSenderForm);
