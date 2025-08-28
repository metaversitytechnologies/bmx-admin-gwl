import { Table } from "antd";
import { useGetCasinoLabilityQuery } from "../../../store/service/userlistService";

const TeenPattiOneDay = ({ odds, id }) => {
  // const filteredOdds = (odds || []).filter(
  //   (item) => item.sid === "1" || item.sid === "3"
  // );

  const { t1 } = odds || {};

  const { data } = useGetCasinoLabilityQuery(
    { roundId: t1?.mid || "" },
    { pollingInterval: 1000 }
  );

  const labilityData = data?.data || [];

  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        const pnl = labilityData?.find(
          (pnlData) => Number(pnlData?.sid) === Number(record?.sectionId)
        )?.liability;
        return (
          <div>
            <p>{record?.nation}</p>
            <p
              style={{
                fontWeight: 700,
                color: pnl > 0 ? "green" : pnl < 0 ? "red" : "black",
              }}>
              {pnl || 0}
            </p>
          </div>
        );
      },
    },
    {
      title: "Back",
      dataIndex: "b1",
      key: "rate",
      align: "center",
      render: (text, render) => {
        return <span>{Number(render?.l1)?.toFixed(2)}</span>;
      },
    },
    {
      title: "Lay",
      dataIndex: "l1",
      key: "rate",
      align: "center",
      render: (text, render) => {
        return <span>{Number(render?.l1)?.toFixed(2)}</span>;
      },
    },
  ];
  return (
    <Table
      pagination={false}
      bordered
      columns={columns}
      dataSource={t1 || []}
    />
  );
};

export default TeenPattiOneDay;
