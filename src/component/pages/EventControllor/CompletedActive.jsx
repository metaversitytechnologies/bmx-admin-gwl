import { Card, Empty, Input } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { CircleCheckBig, Search } from "lucide-react";
import { useState } from "react";
import { useGetCompletdMatchesQuery } from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const CompletedActive = () => {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Local states for PF-side pagination

  const { data: sportDetail } = useGetCompletdMatchesQuery({});
  const completedRows = sportDetail?.data || [];
  const filteredRows = completedRows.filter((row) =>
    (row?.matchName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main_live_section list_supers admin-details-panel completed-active-panel">
      <AppPageHeader
        icon={<CircleCheckBig size={20} strokeWidth={1.8} />}
        title="Complete Match Active Bet"
        subtitle="Review active bets for completed matches"
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail rollback-table-card">
      <div className="rollback-toolbar">
        <Input
          className="rollback-search"
          allowClear
          prefix={<Search size={17} strokeWidth={1.9} />}
          placeholder="Search match name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="table_section rollback-table-viewport">
        <table className="ant-spin-nested-loading rollback-table completed-active-table">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Date</th>
              <th>Event Name</th>
              <th>Team</th>
              <th>Odds</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows?.length > 0 ? (
              filteredRows?.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td className="rollback-index-cell">{id + 1}</td>
                  <td className="rollback-date-cell">
                    {moment(res.date, "ddd MMM DD HH:mm:ss [IST] YYYY").format(
                      "DD-MM-YYYY hh:mm:ss A",
                    )}
                  </td>
                  <td className="rollback-match-column rollback-match-name">
                    <span title={res?.matchName}>{res?.matchName}</span>
                  </td>
                  <td className="rollback-team-cell">
                    <span title={res?.team}>{res?.team}</span>
                  </td>
                  <td className="rollback-number-cell">{res?.odds}</td>
                  <td className="rollback-number-cell">{res.stake}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No completed active bets available"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default CompletedActive;
