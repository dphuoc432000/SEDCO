import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { connect } from "react-redux";
import deleteStatus from "../../stores/actions/deleteStatus.action";
import { toast } from "react-toastify";
import { DELETE_STATUS__SUCCESS } from "../../constants/actions";
function ModalDeleteStatus(props) {
  const handleClose = () => {
    props.handleShowHideModalDelete();
  };
  const deleteStatusCurrent = async () => {
    const status_id = props.status_id;
    const deleteaction = await props.deleteStatus(status_id);
    
    if (deleteaction.type !== DELETE_STATUS__SUCCESS){
      toast.warn("Chưa xác thực chuyến xe. Vui lòng xác thưc.");
      props.handleShowHideModalDelete();
    }
    else {
      toast.success("Xóa trạng thái thành công!");
      props.handleLoadAgainWhenCreateStatus();
      props.handleHiddenShowFormDetail();
      props.handleUpdateRecentListWhenRegisStatus();
    }
  };
  return (
    <div>
      <Dialog
        open={props.showModalDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa trạng thái?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Từ chối</Button>
          <Button onClick={deleteStatusCurrent} autoFocus>
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
    deleteStatus: async (status_id) => {
      console.log("vao xoa");
      const action = await deleteStatus(status_id);
      return dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteStatus);
