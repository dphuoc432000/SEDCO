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
    console.log(deleteaction)
    if (deleteaction.type !== DELETE_STATUS__SUCCESS)
      toast.error("Xóa trạng thái không thành công!");
    else {
      toast.success("Xóa trạng thái thành công!");
      props.handleLoadAgainWhenCreateStatus();
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
            Bạn có thật sự muốn trở về người dùng mặc định?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={deleteStatusCurrent} autoFocus>
            Có
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
