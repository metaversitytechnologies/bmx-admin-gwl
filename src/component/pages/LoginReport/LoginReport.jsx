import { Card, Divider, Empty, Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoginReportQuery } from "../../../store/service/loginReportServices";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const LoginReport = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(50);
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
      <div className="match_slip login_report main_live_section list_supers admin-details-panel login-report-panel">
        <AppPageHeader
          icon={<LogIn size={20} strokeWidth={1.8} />}
          title="Login Report"
          subtitle="Review recent login activity and locations"
          onBack={handleBackClick}
        />
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name">
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
                data?.data
                  ?.map((res, id) => {
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
                  })
                  .reverse()}
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
