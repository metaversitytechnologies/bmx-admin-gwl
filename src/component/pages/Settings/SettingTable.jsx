import { Table } from "antd";

const SettingTable = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Sport",
      dataIndex: "Sport",
      key: "Sport",
    },
    {
      title: "Open Date",
      dataIndex: "OpenDate",
      key: "OpenDate",
    },
    {
      title: "Declared",
      dataIndex: "Declared",
      key: "Declared",
    },

    {
      title: "Won By",
      dataIndex: "Won By",
      key: "debit",
    },
    {
      title: "Profit/Loss",
      dataIndex: "Profit",
      key: "Profit",
    },
  ];

  return (
    <>
      <Table
        className="setting_table"
        bordered
        rowClassName="c_pointer "
        columns={columns}
        pagination={{
          defaultPageSize: 50,
          pageSizeOptions: [50, 100, 150, 200, 250],
        }}
        dataSource={[]}
      />
    </>
  );
};

export default SettingTable;
