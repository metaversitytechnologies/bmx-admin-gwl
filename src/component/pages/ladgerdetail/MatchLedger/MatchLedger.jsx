import {
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Pagination,
  Row,
  Spin,
} from "antd";
import "./MatchLedger.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const mockData = {
  list: [
    {
      date: "2025-06-10",
      matchName: "Roulette Round 1021",
      netPnl: 150,
    },
    {
      date: "2025-06-11",
      matchName: "Blackjack Match 203",
      netPnl: -75,
    },
    {
      date: "2025-06-12",
      matchName: "Poker Table 5",
      netPnl: 300,
    },
  ],
  total: 375,
  totalPages: 1,
};

const MatchLedger = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [totalPage, setTotalPage] = useState(mockData.totalPages);
  const [indexData, setIndexData] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    // simulate API call
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setData({ data: mockData });
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dateData, indexData, paginationTotal]);

  const nav = useNavigate();

  const headerField = ["Date", "Title", "CR", "DR"];
  const lenadenaHeading = ["Total"];
  const arrBalance = [
    {
      total: data?.data?.total?.toFixed(2),
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}

      <Card
        className="sport_detail my_ledger main_match_ledger"
        title="Profit/Loss"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <Row className="main_super_super_ledger">
          <Col lg={8} xs={24} className="match_ladger profit_loss_ledger">
            <DatePicker.RangePicker
              defaultValue={[dayjs(timeBefore), dayjs(time)]}
              onChange={onChange}
            />
          </Col>
          <Col lg={6} xs={12}>
            <div className="matchladger_total">
              <p style={{ fontSize: "20px" }}>
                Total:{" "}
                <span
                  className={
                    data?.data?.total > 0 ? "text_success" : "text_danger"
                  }>
                  {data?.data?.total?.toFixed(2)}
                </span>
              </p>
            </div>
          </Col>
          <Col lg={3} xs={24}>
            <div className="matchladger_total rep_download">
              <DownloadReport
                lenadenaHeading={lenadenaHeading}
                balanceData={arrBalance}
                headerField={headerField}
                reportType="MyLedgerProfitLoss"
                reportName="profit/loss"
                startDate={dateData[0]}
                endDate={dateData[1]}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </Col>
        </Row>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          {isLoading ? (
            <Spin className="spin_icon" size="large" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>CR</th>
                  <th>DR</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.list?.map((res, id) => (
                  <tr key={id} style={{ cursor: "pointer" }}>
                    <td>{moment(res?.date).format("YYYY-MM-DD")}</td>
                    <td>{res?.matchName}</td>
                    <td className="text_success">
                      {res?.netPnl > 0 ? res?.netPnl : 0}
                    </td>
                    <td className="text_danger">
                      {res?.netPnl < 0 ? res?.netPnl : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data?.data?.list?.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <>
              <Divider />
              <Pagination
                className="pagination_main ledger_pagination"
                onShowSizeChange={(c, s) => setPaginationTotal(s)}
                total={totalPage * paginationTotal}
                defaultPageSize={50}
                pageSizeOptions={[50, 100, 150, 200, 250]}
                onChange={(e) => setIndexData(e - 1)}
              />
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default MatchLedger;
