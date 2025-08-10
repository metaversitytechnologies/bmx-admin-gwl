import { useState } from "react";
import { Card, Col, DatePicker, Divider, Empty, Pagination, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCasinoPnlByDateQuery } from "../../../../store/service/CasinoServices";
import dayjs from "dayjs";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const CasinoProfitAndLoss = () => {
  const nav = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");

  const [dates, setDates] = useState({
    fromDate: today,
    toDate: today,
  });

  const { data, refetch, isLoading, isFetching } =
    useGetCasinoPnlByDateQuery(dates);

  const handleBackClick = () => {
    nav(-1);
  };

  const handleRangeChange = (value) => {
    if (value) {
      setDates({
        fromDate: value[0].format("YYYY-MM-DD"),
        toDate: value[1].format("YYYY-MM-DD"),
      });
    }
  };

  const handleTodayClick = () => {
    setDates({
      fromDate: today,
      toDate: today,
    });
    refetch();
  };

  return (
    <div className="match_slip casino_diamond">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail"
        title="Diamond Casino Details"
        extra={<button onClick={handleBackClick}>Back</button>}>
        <Row className="profit_apply">
          <Col xs={24} xl={6} lg={6} md={24}>
            <div className="profit_date">
              <RangePicker onChange={handleRangeChange} />
            </div>
          </Col>
          <Col xs={4} xl={4} lg={4} md={4} className="mb-2 btn_apply">
            <button className="ant-btn-danger" onClick={() => refetch()}>
              Apply
            </button>
            <button className="apply_btn1" onClick={handleTodayClick}>
              Today P/L
            </button>
          </Col>
        </Row>

        <div className="table_section statement_tabs_data">
          {(isLoading || isFetching) && <CustomLoading />}
          <table>
            <thead>
              <tr>
                <th>Game Id</th>
                <th>Type</th>
                <th>Exposer</th>
                <th>P/L</th>
                <th>Client P/L</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.[0]?.dataList?.map((res) => (
                <tr key={res?.key}>
                  <td>{res?.tableId}</td>
                  <td>{res?.eventName}</td>
                  <td>{res?.exposure?.toFixed(2)}</td>
                  <td>{res?.clientpnl?.toFixed(2)}</td>
                  <td>{res?.pnl.toFixed(2)}</td>
                  <td>
                    <span
                      onClick={() =>
                        nav(`/casinoprofitandloss/${res?.marketId}`)
                      }
                      style={{
                        backgroundColor: "rgb(16, 142, 233)",
                        borderRadius: "0px",
                        marginBottom: "8px",
                        color: "#fff",
                        margin: "0 8px 0 0",
                        padding: "4px 7px",
                        fontSize: "12px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}>
                      Show View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <>
              <Divider />
              <div className="pagination_cus">
                <Pagination
                  className="pagination_main ledger_pagination"
                  defaultCurrent={1}
                  total={5}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CasinoProfitAndLoss;
