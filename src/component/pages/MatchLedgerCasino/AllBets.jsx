import { Card, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ListChecks } from "lucide-react";
import { useGetCasinoBetByMarketQuery } from "../../../store/service/CasinoServices";
import { render } from "react-dom";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const AllBets = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetCasinoBetByMarketQuery({
    marketId: id,
  });

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Client",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "RoundId",
      dataIndex: "marketId",
      key: "marketId",
    },
    {
      title: "Bet Type",
      dataIndex: "isBack",
      key: "isBack",
      render: (text) => <span>{text ? "K" : "L"}</span>,
    },
    {
      title: "Odds",
      dataIndex: "odds",
      key: "odds",
    },
    {
      title: "Player",
      dataIndex: "selectionName",
      key: "selectionName",
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
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
    },
  ];

  return (
    <>
      <div className="match_slip account_match_slip main_live_section list_supers admin-details-panel casino-all-bets-panel">
        <AppPageHeader
          icon={<ListChecks size={20} strokeWidth={1.8} />}
          title={`All Bets: ${id}`}
          subtitle="Review every bet placed on this casino round"
          onBack={handleBackClick}
        />
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail acc_name">
            <div className="table_section statement_tabs_data">
              <div className="table_section">
                <Table
                  className="live_table agent_master "
                  bordered
                  columns={columns}
                  dataSource={data?.data || []}
                  loading={{
                    spinning: isLoading || isFetching,
                    indicator: <CustomLoading />,
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AllBets;
