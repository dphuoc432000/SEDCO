import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalConfirm(props) {

    const handleOpenModalConfirm = () =>{
        props.handleOpenModalConfirm();
    }
    const handleCancleStatus = () =>{
        props.handleCancleStatus(props.status_information);
        props.handleOpenModalConfirm();
    }
    return (
        <div>
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Hủy đăng ký"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.content}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{handleOpenModalConfirm()}}>Từ chối</Button>
            <Button onClick={()=>{handleCancleStatus()}}>
                Đồng ý
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
