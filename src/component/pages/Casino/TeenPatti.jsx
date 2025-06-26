import { Table } from "antd";

const TeenPatti = ({ odds }) => {
  const filteredOdds = (odds || []).filter(
    (item) => item.sid === "1" || item.sid === "3"
  );
  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <div>
            <p>{record?.nation}</p>
            <p style={{ fontWeight: 700 }}>{record?.pnl}</p>
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      columns={columns}
      dataSource={filteredOdds || []}
    />
  );
};

export default TeenPatti;
