import { Table } from "antd";

const DT20 = ({ odds }) => {
  const filteredOdds = (odds || []).filter(
    (item) => item.sid === "1" || item.sid === "2" || item?.sid === "3"
  );

  const orderedOdds = [
    filteredOdds.find((item) => item.sid === "1"),
    filteredOdds.find((item) => item.sid === "3"),
    filteredOdds.find((item) => item.sid === "2"),
  ].filter(Boolean);

  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
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
      dataSource={orderedOdds || []}
      rowKey="sid"
    />
  );
};

export default DT20;
