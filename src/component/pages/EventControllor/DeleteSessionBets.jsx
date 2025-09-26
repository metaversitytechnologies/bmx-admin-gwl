import {
  Button,
  Card,
  Empty,
  message,
  Row,
  Select,
  Col,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import {
  useGetDeletdBetMutation,
  useGetDeletedBetByTimeMutation,
  useGetSessionBetDeletedQuery,
} from "../../../store/service/userlistService";
import { useGetSessionHavingBetQuery } from "../../../store/service/SportDetailServices";

const DeleteSessionBets = () => {
  const nav = useNavigate();
  const [fancyIdList, setFancyIdList] = useState([]);
  const [fancyId, setFancyId] = useState(null);
  const { id } = useParams();

  const timeBefore = moment()
    .subtract(14, "days")
    .format("YYYY-MM-DD HH:mm:ss");
  const time = moment().format("YYYY-MM-DD HH:mm:ss");
  const [dateData, setDateData] = useState([timeBefore, time]);

  // ✅ handle date + time change
  const onChange = (date, dateString) => {
    setDateData(dateString.map((d) => moment(d).format("YYYY-MM-DD HH:mm:ss")));
  };

  const { data: sportDetail, refetch } = useGetSessionBetDeletedQuery({
    marketId: fancyId ?? "",
    matchId: id ?? "",
  });
  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: false,
    matchId: id ?? "",
  });

  const [getDeletedBetByTime] = useGetDeletedBetByTimeMutation();
  const [getDeletBet] = useGetDeletdBetMutation();

  const handleDeletedBetbyTime = async () => {
    const res = await getDeletedBetByTime({
      marketId: fancyId ?? "",
      fromDateTime: dateData[0],
      toDateTime: dateData[1],
    }).unwrap();
    if (res?.status) {
      message.success(res?.message);
      refetch();
    } else {
      message.error(res?.message);
    }
  };

  const handleDeletedBet = async () => {
    if (fancyIdList?.length === 0) {
      message.error("Please choose at least one session.");
      return;
    }

    const res = await getDeletBet({
      id: fancyIdList,
    }).unwrap();
    if (res?.status) {
      message.success(res?.message);
      refetch();
    } else {
      message.error(res?.message);
    }
  };

  const handleSessionChange = (id) => {
    setFancyIdList((prevFancyIdList) =>
      prevFancyIdList.includes(id)
        ? prevFancyIdList.filter((fancyId) => fancyId !== id)
        : [...prevFancyIdList, id]
    );
  };

  return (
    <Card
      className="sport_detail"
      title="Delete Session Bets"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row className="" gutter={[16, 16]} style={{ padding: "12px 4px" }}>
        {/* ✅ Date Range Picker with Time */}
        <Col lg={6} xs={16} className="match_ladger profit_loss_ledger">
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm:ss" }} // ✅ enable time picker
            format="YYYY-MM-DD HH:mm:ss" // ✅ display like 2025-09-26 23:33:10
            defaultValue={[
              dayjs(timeBefore, "YYYY-MM-DD HH:mm:ss"),
              dayjs(time, "YYYY-MM-DD HH:mm:ss"),
            ]}
            onChange={onChange}
          />
        </Col>

        {/* Fancy Select */}
        <Col lg={6} xs={16} className="match_ladger profit_loss_ledger">
          <Select
            style={{ width: "100%" }}
            placeholder="Please select fancy"
            value={fancyId}
            onChange={(value) => setFancyId(value)}
            options={[
              ...(sessionBets?.data || []).map((item) => ({
                value: item.fancyId,
                label: item.fancyName,
              })),
            ]}
          />
        </Col>

        {/* Action Buttons */}
        <Col lg={4} xs={16} className="match_ladger profit_loss_ledger">
          <Button type="primary" onClick={handleDeletedBetbyTime}>
            Delete Bet By Time
          </Button>
        </Col>
        <Col lg={4} xs={16} className="match_ladger profit_loss_ledger">
          <Button
            type="ghost"
            onClick={handleDeletedBet}
            style={{ background: "red", color: "#fff", borderRadius: "2px" }}>
            Delete Bet
          </Button>
        </Col>
      </Row>

      {/* Table Section */}
      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Session Name</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Mode</th>
              <th>Run</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sportDetail?.data?.length > 0 ? (
              sportDetail?.data.map((items, id) => (
                <tr key={items?.userId || id}>
                  <td>
                    <input
                      style={{
                        width: "15px",
                        height: "15px",
                        borderColor: "#0d6efd",
                      }}
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      checked={items.checked}
                      onChange={() => handleSessionChange(items.id)}
                    />
                  </td>
                  <td>
                    {items?.userId} ({items?.username})
                  </td>
                  <td>{items?.selectionName}</td>
                  <td>{items?.amount}</td>
                  <td>{items?.rate}</td>
                  <td>{items?.mode}</td>
                  <td>{items?.run}</td>
                  <td>{items?.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
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

export default DeleteSessionBets;
