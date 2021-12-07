import React from "react";
import './StatusForStatus.css'
class StatusForStatus extends React.Component {
    state = {
        statusNotConfirm: false,
    }
    render() {
        let { statusNotConfirm } = this.state;
        console.log(this.props.role_name)
        const user = this.props.user
        return (
            <div className="Status-header">
                <div className="Status-header__left">
                    <div className="Status-headerID">
                        <h3 className="Status-headerID--item Status-headerID--name">
                            {user.full_name}
                        </h3>
                        {statusNotConfirm === false &&
                            <>
                                <h4 className="Status-headerID--item Status-headerID--status">
                                    Đang chờ hỗ trợ
                                </h4>
                            </>
                        }

                    </div>
                </div>
                <div className="Status-header__DateUpPost">
                    {/* <i className="Status-header__Date--title">{this.props.role_name}</i> */}
                    <h3 className="Status-header__date">12/9/2021 12:30</h3>
                </div>
            </div>
        );
    }
}
export default StatusForStatus;