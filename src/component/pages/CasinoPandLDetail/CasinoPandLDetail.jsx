import { useState } from "react";
import { Button, Card, Col, DatePicker, Row, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { useGetCompletdCasinoQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const CasinoPandLDetail = () => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  const fromDate = dateRange[0].format("YYYY-MM-DD");
  const toDate = dateRange[1].format("YYYY-MM-DD");

  const { data, isLoading, isFetching } = useGetCompletdCasinoQuery({
    fromDate,
    toDate,
  });

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const totalPnl =
    data?.data?.reduce(
      (acc, item) => (item?.casinoId === null ? acc + item.pnl : acc),
      0
    ) || 0;

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (text, record) => (
        <Link className="gx-text-blue">
          {text} {record?.casinoId && `(${record?.date})`}
        </Link>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "P/L",
      dataIndex: "pnl",
      key: "pnl",
      render: (value) => (
        <span style={{ color: value > 0 ? "green" : "red" }}>
          {value?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="gx-bg-flex gx-justify-content-end">
            {!record?.isTotal ? (
              record.casinoId ? (
                <>
                  <Button
                    style={{
                      height: "36px",
                      padding: "0px 15px",
                      borderRadius: "5px",
                      marginRight: "15px",
                    }}
                    type="primary">
                    <Link to="/Casino/AndarBahar/plus-minus-type">
                      plusminus
                    </Link>
                  </Button>
                  <Button
                    type="link"
                    style={{
                      height: "36px",
                      padding: "0px 15px",
                      borderRadius: "5px",
                      border: "1px solid #d9d9d9",
                      background: "#fff",
                      color: "#545454",
                    }}>
                    <Link
                      to={`/display-games/${record.casinoId}/${record.eventName}/${record.date}`}>
                      Display Games
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  style={{
                    height: "36px",
                    padding: "0px 15px",
                    borderRadius: "5px",
                    marginRight: "15px",
                  }}
                  type="primary">
                  <Link to={`/plusminuscasinodeatils/${record.date}`}>
                    plusminus2
                  </Link>
                </Button>
              )
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="match_slip match_ledger">
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail team_name"
        title="Casino PandL Detail"
        extra={<button>Back</button>}>
        <div className="gx-mt-3">
          <Row
            className="date_picker gx-px-5"
            style={{
              gap: "16px",
            }}>
            <Col>
              <RangePicker
                value={dateRange}
                onChange={handleDateChange}
                style={{ marginBottom: "10px", width: "300px" }}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: "10px" }}>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                className="gx-border-redius0"
                style={{ height: "36px", lineHeight: "32px" }}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Table
            columns={columns}
            dataSource={[
              {
                eventName: "Total",
                date: "",
                pnl: totalPnl,
                isTotal: true,
              },
              ...(data?.data || []),
            ]}
            rowKey={(record, index) => index}
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            pagination={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default CasinoPandLDetail;
