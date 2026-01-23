import { Card, Divider, Empty, Spin, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginReport.scss";
import { useLazyLoginReportQuery } from "../../../store/service/loginReportServices";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import TablePagination from "../../common/TablePagination";

const LoginReport = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 50;
  const [indexData, setIndexData] = useState(0);
  const userId = localStorage.getItem("userId");

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const [loginReport, { data, isLoading, isFetching, isError }] =
    useLazyLoginReportQuery();

  useEffect(() => {
    loginReport({
      userId: id ?? userId,
    });
  }, [id, userId]);

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
                <th>COUNTRY</th>
                <th>REGION</th>
                <th>ISP</th>
                <th>
                  <div className="ip_section">
                    <p>IP-ADDRESS</p>
                  </div>
                </th>
                <th>LOGIN DATE</th>
              </tr>
              {isLoading || isFetching ? <CustomLoading /> : ""}
              {!isError &&
                data?.data?.map((res, id) => {
                  return (
                    <tr key={id}>
                      <td>{res?.country}</td>
                      <td>
                        {res?.city} - {res?.region}
                      </td>
                      <td>{res?.isp}</td>
                      <td>{res?.ipAddress}</td>
                      <td>{res?.loginDate} </td>
                    </tr>
                  );
                }).reverse()}
            </table>

            {data?.data?.list === undefined || isError ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <>
                <Divider />
                <div className="pagination_cus">
                  <TablePagination
                    className="pagination_main ledger_pagination"
                    total={data?.data?.totalPages * pageSize}
                    pageSize={pageSize}
                    current={indexData + 1}
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
