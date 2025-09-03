import { Button, Card, Empty, message, Row, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { useGetCompletdMatchesQuery } from "../../../store/service/userlistService";

const CompletedActive = () => {
  const nav = useNavigate();

  // ✅ Local states for PF-side pagination
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(50); // ✅ Default show 50

  const { data: sportDetail, refetch } = useGetCompletdMatchesQuery({});

  return (
    <Card
      className="sport_detail"
      title="Complete Match Active Bet"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row className="date_picker" justify="center"></Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
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
            {sportDetail?.data.length > 0 ? (
              sportDetail?.data?.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td>{id + 1}</td>
                  <td>
                    {" "}
                    {moment(res.date, "ddd MMM DD HH:mm:ss [IST] YYYY").format(
                      "DD-MM-YYYY hh:mm:ss A"
                    )}
                  </td>
                  <td>{res?.matchName}</td>
                  <td>{res?.team}</td>
                  <td>{res?.odds}</td>
                  <td>{res.stake}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CompletedActive;
