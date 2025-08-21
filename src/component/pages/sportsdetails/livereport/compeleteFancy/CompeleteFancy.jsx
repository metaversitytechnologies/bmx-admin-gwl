import { Card, Col, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCompletedFancyMutation } from "../../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../../store/service/supermasteAccountStatementServices";

const CompeleteFancy = () => {
  const [clientId, setClientId] = useState("");

  const { pathname } = useLocation();

  const nav = useNavigate();
  const { id } = useParams();

  const columns = [
    {
      title: "username",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "F. Name",
      dataIndex: "fancyName",
      key: "fancyName",
    },
    {
      title: "Rate",
      dataIndex: "odds",
      key: "odds",
    },
    {
      title: "Value",
      dataIndex: "priceValue",
      key: "priceValue",
    },
    {
      title: "Back/Lay",
      dataIndex: "isBack",
      key: "isBack",
      render: (text) => <span>{text ? "Yes" : "No"}</span>,
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Stake",
      dataIndex: "stake",
      key: "stake",
    },
    {
      title: "PNL",
      dataIndex: "pnl",
      key: "pnl",
      render: (text) => <span>{text?.toFixed(2)}</span>,
    },
  ];
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();
  const [trigger, { data, isLoading, isFetching }] =
    useGetCompletedFancyMutation();

  useEffect(() => {
    trigger({ matchId: id, userId: clientId });
  }, [id]);

  const totalPnl = data?.data?.reduce((acc, item) => acc + item.pnl, 0) || 0;

  return (
    <>
      <div>
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail completed_fancy"
          title="Fancy Profit and Loss"
          extra={
            <div>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              {pathname?.includes("completed-fancy-slips") && (
                <button style={{ marginLeft: "10px" }} onClick={() => nav(-1)}>
                  Back
                </button>
              )}
            </div>
          }>
          <Row
            gutter={[16, 16]}
            justify="center"
            className="fancy_pl"
            align="middle">
            <Col xs={24} md={24} lg={6} xl={6}>
              <Select
                placeholder="Select User"
                showSearch
                onSearch={(value) => {
                  if (value) userTrigger({ userId: value, userType: 1 });
                }}
                value={clientId}
                onSelect={(value) => setClientId(value)}
                options={
                  userData?.data?.map((user) => ({
                    label: `${user.userName} (${user.userId})`,
                    value: user.userId,
                  })) || []
                }
              />
            </Col>
            <Col xs={24} md={24} lg={6} xl={6}>
              <Select
                placeholder="Select Fancy"
                options={[
                  {
                    value: "All",
                    label: "All Fancy",
                  },
                ]}
                showSearch
                allowClear
                // onSelect={(value) => setClientId(value)}
              />
            </Col>
            <Col xs={24} md={24} lg={6} xl={6}>
              <p className="total_pl_fancy">
                Total P/L:{" "}
                <span style={{ color: totalPnl > 0 ? "green" : "red" }}>
                  {totalPnl?.toFixed(2)}
                </span>
              </p>
            </Col>
          </Row>

          <div className="table_section statement_tabs_data">
            <div className="table_section">
              <Table
                className="live_table agent_master1"
                bordered
                columns={columns}
                dataSource={data?.data || []}
                loading={isLoading || isFetching}
                rowClassName={(record) => {
                  if (record.pnl >= 0) return "gx-bg-green-0";
                  if (record.pnl < 0) return "gx-bg-red";
                  return "";
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompeleteFancy;
