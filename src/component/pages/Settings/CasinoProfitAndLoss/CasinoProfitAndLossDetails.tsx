import { useState } from "react";
import {
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCasinoBetByMarketQuery,
  useGetCasinoPnlByDateQuery,
} from "../../../../store/service/CasinoServices";
import dayjs from "dayjs";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Client",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "RoundId",
    dataIndex: "marketId",
    key: "marketId",
  },
  {
    title: "Player",
    dataIndex: "selectionName",
    key: "selectionName",
  },
  {
    title: "Winner",
    dataIndex: "winner",
    key: "winner",
  },
  {
    title: "Stake",
    dataIndex: "stake",
    key: "stake",
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
  },
  {
    title: "Loss",
    dataIndex: "loss",
    key: "loss",
  },
  {
    title: "PNL",
    dataIndex: "pnl",
    key: "pnl",
  },
];

const CasinoProfitAndLossDetails = () => {
  const [clientId, setClientId] = useState("");
  const nav = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");
  const { id } = useParams();

  const userTyep = localStorage.getItem("userType");

  const [getClient, result] = useLazyFilterbyClientQuery();

  const {
    data: casinoData,
    isLoading,
    isFetching,
  } = useGetCasinoBetByMarketQuery({
    marketId: id,
  });

  const [dates, setDates] = useState({
    fromDate: today,
    toDate: today,
  });

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
  };

  console.log(casinoData?.data, "casinoDatacasinoData");

  return (
    <div className="match_slip casino_diamond_details">
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
          <Col xs={24} xl={8} lg={8} md={24}>
            <Select
              placeholder="Select Client"
              onSearch={(value) => {
                if (value) getClient({ userType: Number(userTyep) - 1 });
              }}
              showSearch
              value={clientId}
              allowClear
              onSelect={(value) => {
                setClientId(value);
                // trigger({
                //   userId: value,
                // });
              }}
              options={
                result?.data?.data?.map((user) => ({
                  label: `${user.userName} (${user.userId})`,
                  value: user.userId,
                })) || []
              }
            />
          </Col>
          <Col xs={4} xl={4} lg={4} md={4} className="mb-2 btn_apply">
            <button className="ant-btn-danger">Apply</button>
            <button className="apply_btn1" onClick={handleTodayClick}>
              Today P/L
            </button>
          </Col>
        </Row>

        <div className="table_section">
          <Table
            className="live_table acc_tabel limit_update"
            bordered
            rowClassName={(record) => (record?.pnl < 0 ? "red_back" : "green_back")}
            columns={columns}
            loading={isLoading || isFetching}
            dataSource={casinoData?.data || []}
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default CasinoProfitAndLossDetails;
