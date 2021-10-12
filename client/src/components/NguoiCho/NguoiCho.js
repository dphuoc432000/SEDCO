import React from 'react';
import SLHoTro from './SLHoTro';
import RecentList from '../GanDay/RecentList'
import StatusForStatus from '../StatusForStatus/StatusForStatus';
import './NguoiCho.css'


class NguoiCho extends React.Component {
  
  render() {
     return (
      <div className="NguoiCho">
        <StatusForStatus/>
        <SLHoTro/>
        
      </div>
  );
  }
 
}

export default NguoiCho;