import { Table } from "antd";

const TeenPatti = ({ odds, id }) => {
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
            <p
              style={{
                fontWeight: 700,
                color:
                  record?.pnl > 0 ? "green" : record?.pnl < 0 ? "red" : "black",
              }}>
              {id === "57" ? 0 : record?.pnl}
            </p>
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: id === "57" ? "b1" : "rate",
      key: "rate",
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      columns={columns}
      dataSource={id === "57" ? odds : filteredOdds || []}
    />
  );
};

export default TeenPatti;
