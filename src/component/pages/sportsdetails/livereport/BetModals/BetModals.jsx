import { Card, Table } from "antd";

const columns = [
  {
    title: "Rate",
    dataIndex: "odds",
    key: "odds",
  },
  {
    title: "Amount",
    dataIndex: "stake",
    key: "stake",
  },

  {
    title: "Team",
    dataIndex: "matchname",
    key: "matchname",
  },
  {
    title: "Selection Name",
    dataIndex: "selectionname",
    key: "selectionname",
  },
  {
    title: "Client",
    dataIndex: "userid",
    key: "userid",
  },
  {
    title: "Agent",
    dataIndex: "dealerid",
    key: "dealerid",
  },
  {
    title: "Profit/Loss",
    dataIndex: "pnl",
    key: "pnl",
  },
];

const BetModals = ({ data }) => {
  return (
    <div className="login_report" style={{ marginTop: "-16px" }}>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail  team_name">
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Table
            rowClassName={(record) => (record.isback ? "back" : "lay")}
            columns={columns}
            pagination={false}
            dataSource={data}
          />
        </div>
      </Card>
    </div>
  );
};

export default BetModals;
