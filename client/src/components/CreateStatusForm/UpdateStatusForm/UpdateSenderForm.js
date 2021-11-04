import React, { Component } from "react";
import './UpdateReceiverForm.css'
import { connect } from "react-redux";
import {updateSenderStatus} from "../../../stores/actions/updateStatusSender.action";
import getEssentials from "../../../stores/actions/essentials.action";
import axios from "axios";
import {API_URL} from "../../../constants/api";
import getEssentialsDetail from '../../../stores/actions/essentialsDetail.action'
import {UPDATE_STATUS_SENDER_SUCCESS} from '../../../constants/actions'
import {toast } from 'react-toastify';

class UpdateSenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // status_data_old : {}, 
      essentials: {},
      weight_essential: 0,
      note: "",
    };
  }
  componentDidMount = async () => {
    const status_data_old =await axios.get(`${API_URL}/api/sender/${this.props.sender_status_id}/detail`)
      .then(res => res.data)
      .catch(err=> console.log(err))
    await this.props.getEssentials();
    const essentials = await this.props.essentialsReducer.essentials;
    const essentials_data_old = status_data_old.essentials;
    const object = {};
    essentials.map((essential) => {
      // const essential_old =essentials_data_old.find(essential => {
      //   return essential.essential_id === essential._id
      // })
      // console.log(essential_old)
      object[`${essential.code_name}`] = {
        essential_id: essential._id,
        quantity: 0,
      };
      return object[`${essential.name}`];
    });
    this.setState({
      status_data_old: status_data_old,
      essentials: {
        ...object,
      },
    });
  };
  handleOnchange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const essential_id=event.target.getAttribute("data-id");
    console.log(name, value, essential_id);
    this.setState({
      essentials: {
        ...this.state.essentials,
        [name]: {
          ...this.state.essentials[name],
          essential_id: essential_id,
          quantity: parseInt(value),
        },
      },
    });
  };

  handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  getEssentialsDetail = async (essential_id) => {
    await this.props.getEssentialsDetail(essential_id);
    const essentialsDetail = await this.props.essentialsDetailReducer;
    // console.log(essentialsDetail)
    return essentialsDetail;
  };
  updateFormSender = async () => {
    // await this.props.
    const sender_status_id = this.props.sender_status_id;
    const sender_status_data = {
      essentials: this.state.essentials,
      weight_essential: this.state.weight_essential,
      note: this.state.note
    };
    const updateaction =   await this.props.updateSenderStatus(sender_status_id, sender_status_data);
    if(updateaction.type !== UPDATE_STATUS_SENDER_SUCCESS)
      toast.error('Cập nhật không thành công!')
    else{
      toast.success('Cập nhật thành công!');
      const essentialsConvert = Object.keys(this.state.essentials).map(key => {
        return sender_status_data.essentials[key]
      }) 
      const essentials_map =await Promise.all(essentialsConvert.map(async essential =>{
        const essential_detail = await this.getEssentialsDetail(essential.essential_id);
        return {
          ...essential,
          name: essential_detail.name,
          code_name: essential_detail.code_name,
          unit: essential_detail.unit,
        }
      }))
      // console.log(essentials_map)
      this.props.handleUpdateEssentials(essentials_map)
      this.props.handleShowHideUpdateSender();
      this.props.handleUpdateStatusCurrent(123);
    }
  };
  render() {
    let essentials = this.props.essentialsReducer.essentials;
    console.log(this.state);
    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.handleShowHideUpdateSender()}
            >
              X
            </button>
            <div className="content">
              <p className="heading">Cập nhật hỗ trợ</p>
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
                          type="number"
                          placeholder="0"
                          className="input-item-update"
                          name={essential.code_name}
                          // value={this.state.essentials[`${essential.code_name}`].quantity}
                          onChange={(event) => this.handleOnchange(event)}
                        />
                        <p className="unit">{essential.unit}</p>
                      </div>
                    </div>
                  );
                })}
               

                <p className="heading-3 total">Thông tin khác</p>

                <h3 className="input-title">Tổng khối lượng</h3>
                <div className="input-item-Update">
                  <input type="number" 
                  placeholder="0" 
                  className="input-item-update"
                  name="weight_essential"
                  value={this.state.weight_essential}
                  onChange={(event) => this.handlechange(event)}
                  />
                  <p className="unit">Kg</p>
                </div>

                <h3 className="input-title">Mô tả hoàn cảnh/ ghi chú</h3>
                <input type="text" 
                className="GhiChu-Update"
                name="note" 
                value={this.state.note}
                onChange={(event) => this.handlechange(event)}

                />

                <h3 className="input-title">Hình ảnh</h3>

                <button className="button-addIMG">Thêm hình ảnh</button>
              </form>
            </div>
            
            <div style={{textAlign: 'center',marginTop:'35px',marginBottom:'30px'}}>
              <button className="button-2" 
              onClick={() => this.updateFormSender()}>
              Cập nhật</button>
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
      console.log('vao')
      const action = await updateSenderStatus(sender_status_id,sender_status_data);
      console.log(action)
      return dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSenderForm);
