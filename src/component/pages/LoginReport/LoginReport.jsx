import { Card, Divider, Empty, Pagination, Spin, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginReport.scss";
import { useLazyLoginReportQuery } from "../../../store/service/loginReportServices";
import { useEffect, useState } from "react";
import { useLazyUserListQuery } from "../../../store/service/supermasteAccountStatementServices";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { AiFillEye } from "react-icons/ai";

const LoginReport = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState(userId);
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [ipOrder, setipOrder] = useState(false);

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const [userList, resultData] = useLazyUserListQuery();

  const [loginReport, { data, isLoading, isFetching, isError }] =
    useLazyLoginReportQuery();

  const handleChange = (value) => {
    userList({
      userType: null,
      userName: value,
    });
    loginReport({
      index: indexData,
      noOfRecords: paginationTotal,
      parentId: id || value || clientId,
      orderByIp: ipOrder,
    });
  };

  const handleSelect = (value) => {
    setClientId(value);
  };

  useEffect(() => {
    userList({
      userType: null,
      userName: "",
    });
  }, []);

  useEffect(() => {
    loginReport({
      index: indexData,
      noOfRecords: paginationTotal,
      parentId: id ? id : clientId,
      orderByIp: ipOrder,
    });
  }, [clientId, paginationTotal, indexData, ipOrder, id]);

  const headerField = ["User Name", "IP-Address", "Login Date", "Detail"];

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}
      <div className="match_slip login_report">
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Login Report"
          extra={<button onClick={handleBackClick}>Back</button>}>
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <tr>
                <th>User Name</th>
                <th>
                  <div className="ip_section">
                    <p>IP-Address</p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => setipOrder(!ipOrder)}>
                      {ipOrder ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    </p>
                  </div>
                </th>
                <th>Login Date</th>
                <th>Detail</th>
              </tr>
              {isLoading || isFetching ? (
                <div className="spin_icon">
                  <Spin size="large" />
                </div>
              ) : (
                ""
              )}
              {!isError &&
                data?.data?.list?.map((res, id) => {
                  return (
                    <tr key={id}>
                      <td>{res?.userid}</td>
                      <td>{res?.ip}</td>
                      <td>{res?.lastLogin}</td>
                      <td style={{ cursor: "pointer" }} className="divice-info">
                        <Tooltip title={res?.deviceInfo}>
                          <span>
                            <AiFillEye />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
            </table>

            {data?.data?.list === undefined || isError ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <>
                <Divider />
                <div className="pagination_cus">
                  <Pagination
                    className="pagination_main ledger_pagination"
                    onShowSizeChange={(c, s) => setPaginationTotal(s)}
                    total={
                      data?.data?.totalPages &&
                      data?.data?.totalPages * paginationTotal
                    }
                    defaultPageSize={50}
                    pageSizeOptions={[50, 100, 150, 200, 250]}
                    onChange={(e) => setIndexData(e - 1)}
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginReport;
