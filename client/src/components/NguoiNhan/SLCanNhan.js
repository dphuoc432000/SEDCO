import React from "react";

class SLCanNhan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style="display: flex; justify-content: space-between;align-items: center;">
          <h3 class="data-container__title">Cần hỗ trợ</h3>
          <a
            href=""
            class="data-container__SeeDetail"
            style="padding-right: 39px;font-size: 1.2rem;"
          >
            Xem chi tiết <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <ul class="data-container__ListItems">
          <li class="data-container__Items">
            Trứng: <h4 class="data-container__ItemQuantity">4 quả</h4>
          </li>
          <li class="data-container__Items">
            Gạo: <h4 class="data-container__ItemQuantity"> 3 bao</h4>{" "}
          </li>
          <li class="data-container__Items">
            Rau củ:<h4 class="data-container__ItemQuantity">2 thùng</h4>{" "}
          </li>
          <li class="data-container__Items">...</li>
          <li class="data-container__Items">
            Tổng khối lượng:<h4 class="data-container__ItemQuantity">270 kg</h4>{" "}
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default SLCanNhan;