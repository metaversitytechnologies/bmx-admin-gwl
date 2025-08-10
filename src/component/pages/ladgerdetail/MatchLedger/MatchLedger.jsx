import { Card, Col, DatePicker, Row, Select, Table } from "antd";
import "./MatchLedger.scss";
import { useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useGetLedgerProfitLossQuery } from "../../../../store/service/SportDetailServices";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";

const MatchLedger = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
      width: "20%",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      width: "60%",
    },

    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (text) => <span className="text_success">{text}</span>,
    },
  ];

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const {
    data: ledgerData,
    isLoading,
    isFetching,
  } = useGetLedgerProfitLossQuery(
    {
      startDate: dateData[0],
      endDate: dateData[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  const totalCreadit =
    ledgerData?.data?.reduce((acc, item) => acc + item.credit, 0) || 0;

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}

      <Card
        className="sport_detail my_ledger main_match_ledger profit_loss_table"
        title="Profit Loss"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <Row className="" gutter={[16, 16]} style={{ padding: "12px 4px" }}>
          <Col lg={6} xs={20} className="match_ladger profit_loss_ledger">
            <DatePicker.RangePicker
              defaultValue={[dayjs(timeBefore), dayjs(time)]}
              onChange={onChange}
            />
          </Col>
          <Col lg={6} xs={20} className="match_ladger profit_loss_ledger">
            <Select
              style={{ width: "100%" }}
              placeholder="Select Game Type"
              options={[
                {
                  label: "All",
                  value: "All",
                },
                {
                  label: "Sport",
                  value: "sport",
                },
                {
                  label: "Int Casino",
                  value: "intcasino",
                },
                {
                  label: "Diamond Casino",
                  value: "casino",
                },
              ]}
              showSearch
              allowClear
            />
          </Col>
          <Col lg={6} xs={12}>
            <div className="matchladger_total">
              <p style={{ fontSize: "20px" }}>
                Total:{" "}
                <span
                  className={totalCreadit > 0 ? "text_success" : "text_danger"}>
                  {totalCreadit?.toFixed(2)}
                </span>
              </p>
            </div>
          </Col>
        </Row>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <div className="table_section">
            <Table
              className="live_table acc_tabel limit_update"
              bordered
              columns={columns}
              rowClassName={() => "no-wrap"}
              loading={{
                spinning: isLoading || isFetching,
                indicator: <CustomLoading />,
              }}
              dataSource={ledgerData?.data}
              pagination={false}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default MatchLedger;
