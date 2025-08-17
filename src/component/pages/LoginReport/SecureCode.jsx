import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Pagination,
  Row,
  Spin,
} from "antd";
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
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const [trigger, { data: secureData, isLoading, isFetching, isError }] =
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
      <div
        className="match_slip"
        style={{
          margin: "30px 15px",
        }}>
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Secure Code"
          extra={<button onClick={handleBackClick}>Back</button>}>
          <Row
            gutter={[16]}
            style={{
              padding: "12px 20px",
            }}>
            <Col xs={18} md={18} lg={7} xl={7}>
              <Input
                style={{ height: "36px", borderRadius: "0px" }}
                placeholder="Enter"
                onChange={(e) => setClientId(convertCodeReverse(e.target.value))}
              />
            </Col>
            <Col xs={6} md={6} lg={7} xl={7}>
              <Button
                type="primary"
                style={{ height: "36px" }}
                onClick={handleShow}>
                Show
              </Button>
            </Col>
          </Row>
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <tr>
                <th>Code</th>
                <th>OTP</th>
                <th>CREATED ON</th>
              </tr>
              {isLoading || isFetching ? <CustomLoading /> : ""}
              {!isError &&
                secureData?.data?.map((res, id) => {
                  return (
                    <tr key={id}>
                      <td>{convertCode(res?.userId)}</td>
                      <td>{res?.secureCode}</td>
                      <td>{res?.createdOn}</td>
                    </tr>
                  );
                })}
            </table>

            {secureData?.data === undefined ||
              (isError && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}
          </div>
        </Card>
      </div>
    </>
  );
};

export default SecureCode;
