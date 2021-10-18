import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import './subMenu.css';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

function MenuListComposition(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    const  handleLogout = () =>{
        props.logout();
        localStorage.removeItem('accessToken');
        props.handleLogout();
        props.history.push('/')
    }
    
    const handleUpdateInformation = ()=>{
        props.history.push('/user/information')
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
        <div>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <ArrowDropDownCircleIcon/>
            </Button>
            <Popper
            className="header-nav_submenu_dropdown"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                    >
                        <MenuItem onClick={(event) =>{handleClose(event); handleUpdateInformation();}}>Cập nhật thông tin</MenuItem>
                        <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
                        <MenuItem onClick={(event) =>{handleClose(event); handleLogout();}}>Đăng xuất</MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
        </Stack>
    );
}

//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {
        isLogined: state.loginReducer.isLogined
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        logout: () => dispatch({type:"LOGOUT_ACCOUNT"})
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MenuListComposition)) ;