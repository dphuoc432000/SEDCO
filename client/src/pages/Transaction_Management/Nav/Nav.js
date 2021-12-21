import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, Link } from 'react-router-dom';
import './Nav.css';

export default function Nav(props) {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const path = location.pathname;
  const hanleChangeState = (type) =>{
    props.handleChangeState(type);
  } 
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="Đăng ký nhận" style={{textTransform: 'none'}} onClick={() => {hanleChangeState('sender_register')}} component={Link} to={`/car_trip/transaction_management`}/>
        <Tab label="Đăng ký hỗ trợ" style={{textTransform: 'none'}} onClick={() => {hanleChangeState('receiver_register')}}  component={Link} to={`/car_trip/transaction_management/receiver/register`}/>
        <Tab label="Lịch sử" style={{textTransform: 'none'}} component={Link} to={`/car_trip/transaction_management/history`}/>
      </Tabs>
    </Box>
  );
}
