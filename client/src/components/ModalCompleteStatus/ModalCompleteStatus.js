import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    COMPLETE_CAR_STATUS_SUCCESS
} from "../../constants/actions";
import {
    complete_car_status_action
} from '../../stores/actions/car_trip.action';

function ModalCompleteStatus(props) {
    const handleClose = () => {
        props.handleShowHideModalComplete();
    };
    const handleCompletedCarStatus=async ()=>{
        const complete_car_status_action= await props.complete_car_status_action(props.status_current.detail._id);
        if(complete_car_status_action.type === COMPLETE_CAR_STATUS_SUCCESS){
            toast.success('Chuyến xe hoàn thành thành công!')
            props.handleLoadAgainWhenCreateStatus();
        }
        else
            toast.warn('Số lượng còn dư hoặc giao dịch chưa hoàn thành. Vui lòng kiểm tra lại!');
        props.handleShowHideModalComplete();
    }
    return (
        <div>
            <Dialog
                open={props.showModalComplete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Hoàn thành"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn muốn hoàn thành trạng thái?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={handleCompletedCarStatus} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // essentialsDetailReducer: state.essentialsDetailReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        complete_car_status_action: async(car_status_id)=>{
            const action = await complete_car_status_action(car_status_id);
            return dispatch(action);
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteStatus);
