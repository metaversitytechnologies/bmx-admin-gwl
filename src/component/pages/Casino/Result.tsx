import { Card, Table } from "antd";
import { useGetCasinoBetListByTableQuery } from "../../../store/service/CasinoServices";
import { useParams } from "react-router-dom";
import moment from "moment";

const Result = ({ name }: any) => {
  const { id } = useParams();
  const { data } = useGetCasinoBetListByTableQuery({
    tableId: id,
    isActive: true,
  });
  const columns = [
    {
      title: "Game ID",
      dataIndex: "roundId",
      key: "roundId",
    },
    {
      title: "Started AT",
      dataIndex: "date",
      key: "date",
      render: () => <span>{moment().format("YYYY-MM-DD HH:mm:ss A")}</span>,
    },
    {
      title: "Plus/Minus",
      dataIndex: "pnl",
      key: "pnl",
    },
  ];
  return (
    <div className="match_slip NonDeclare">
      <Card
        className="sport_detail team_name"
        title={name}
        style={{
          margin: 0,
          width: "100%",
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}
        extra={
          <div>
            <h1 className="total_extra">
              Total: <span>0.00</span>
            </h1>
          </div>
        }>
        <Table
          bordered
          columns={columns}
          dataSource={data?.data || []}></Table>
      </Card>
    </div>
  );
};

export default Result;
