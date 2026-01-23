import { Card, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCasinoBetListByTableQuery } from "../../../store/service/CasinoServices";
import moment from "moment";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const DisplayGames = () => {
  const nav = useNavigate();
  const { id, name, date } = useParams();
  const { data, isLoading, isFetching } = useGetCasinoBetListByTableQuery({
    tableId: id,
    isActive: true,
  });

  const totalPnl = data?.data?.reduce((acc, item) => {
    return acc + (item.pnl || 0);
  }, 0);
  const columns = [
    {
      title: "S no.",
      dataIndex: "roundId",
      key: "roundId",
    },
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <button
          onClick={() => nav(`/all-bets/${record.roundId}`)}
          type="button"
          className="ant-btn  ant-btn-sm gx-text-white gx-border-redius0"
          style={{
            backgroundColor: "rgb(16, 142, 233)",
            padding: "0px 8px",
            height: "24px",
            lineHeight: "23px",
            border: "unset",
            outline: "unset",
            fontWeight: 400,
          }}>
          <span>Show Bets</span>
        </button>
      ),
    },
  ];
  return (
    <div className="match_slip">
      <Card
        className="sport_detail team_name"
        title={`${name} ${date ? date : ""}`}
        style={{
          margin: 0,
          width: "100%",
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div className="matchladger_total">
          <p>
            Total :{" "}
            <span style={{ color: totalPnl > 0 ? "green" : "red" }}>
              {totalPnl?.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Table
            bordered
            columns={columns}
            rowKey={(record, index) => index}
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            dataSource={data?.data || []}
          />
        </div>
      </Card>
    </div>
  );
};

export default DisplayGames;
