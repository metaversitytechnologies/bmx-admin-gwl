import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginReport.scss";
import { useState } from "react";
import { useLazyGetSecureCodeQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { convertCode, convertCodeReverse } from "../../../store/constant";

const SecureCode = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState(userId);

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const [trigger, { data: secureData, isLoading, isFetching }] =
    useLazyGetSecureCodeQuery();

  const handleShow = () => {
    trigger({
      userId: clientId,
    });
  };

  console.log(secureData, "secureDatasecureDatasecureData");

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}
      <div className="match_slip secure_code_report">
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Secure Code REPORT"
          extra={<button onClick={handleBackClick}>Back</button>}>
          <div className="secure_code_filters">
            <Input
              className="secure_code_input"
              placeholder="Search Code"
              onChange={(e) => setClientId(convertCodeReverse(e.target.value))}
            />
            <Button
              style={{ borderRadius: "8px" }}
              type="primary"
              className="secure_code_button"
              onClick={handleShow}>
              Search
            </Button>
          </div>
          <div className="table_section secure_code_filters statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>OTP</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      <CustomLoading />
                    </td>
                  </tr>
                ) : (
                  Array.isArray(secureData?.data) &&
                  secureData.data.length > 0 &&
                  secureData.data.map((res, id) => {
                    return (
                      <tr key={id}>
                        <td>{convertCode(res?.userId)}</td>
                        <td>{res?.secureCode}</td>
                        <td>
                          <Button
                            type="primary"
                            className="reset_otp_button"
                            icon={<ReloadOutlined />}>
                            Reset OTP
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {!isLoading &&
              !isFetching &&
              (!Array.isArray(secureData?.data) ||
                secureData.data.length === 0) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default SecureCode;
