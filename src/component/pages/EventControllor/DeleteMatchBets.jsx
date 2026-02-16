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
  useGetMatchedBetDeletedQuery,
} from "../../../store/service/userlistService";

const DeleteMatchBets = () => {
  const [selectedMkt, setSelectedMkt] = useState("BOOKMAKER");
  const nav = useNavigate();
  const [fancyIdList, setFancyIdList] = useState([]);
  const { id } = useParams();
  const timeBefore = moment()
    .subtract(14, "days")
    .format("YYYY-MM-DD HH:mm:ss");
  const time = moment().format("YYYY-MM-DD HH:mm:ss");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const onChange = (date, dateString) => {
    setDateData(dateString.map((d) => moment(d).format("YYYY-MM-DD HH:mm:ss")));
  };

  const { data: sportDetail, refetch } = useGetMatchedBetDeletedQuery({
    matchId: id,
    marketName: selectedMkt,
  });

  // const [getDeletedBetByTime] = useGetDeletedBetByTimeMutation();
  const [getDeletBet, { isLoading }] = useGetDeletdBetMutation();
  // const [getActiveDeactive] = useGetEventActiveDeactiveMutation();

  // const handleDeletedBetbyTime = async () => {
  //   const res = await getDeletedBetByTime({
  //     marketId: "",
  //     fromDateTime: dateData[0],
  //     toDateTime: dateData[1],
  //   }).unwrap();
  //   if (res?.status) {
  //     message.success(res?.message);
  //     refetch();
  //   } else {
  //     message.error(res?.message);
  //   }
  // };

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

  const handleDeletedSigleBet = async (id) => {
    const res = await getDeletBet({
      id: [id],
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
        : [...prevFancyIdList, id],
    );
  };

  const userType = localStorage.getItem("userType");

  return (
    <Card
      className="sport_detail"
      title="Delete Match Bets"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row className="" gutter={[16, 16]} style={{ padding: "12px 4px" }}>
        <Col lg={6} xs={16} className="match_ladger profit_loss_ledger">
          <DatePicker.RangePicker
            defaultValue={[dayjs(timeBefore), dayjs(time)]}
            onChange={onChange}
          />
        </Col>
        <Col lg={4} xs={16} className="match_ladger profit_loss_ledger">
          <Select
            placeholder="Select Match"
            showSearch
            allowClear
            value={selectedMkt}
            onChange={(value, option) => {
              setSelectedMkt(option?.value || "");
            }}
            filterOption={false}
            options={
              ["BOOKMAKER", "TOSS"]?.map((item) => ({
                label: item,
                value: item,
              })) || []
            }
            style={{ width: "100%" }}
          />
        </Col>
        {userType == "7" && (
          <Col lg={4} xs={16} className="match_ladger profit_loss_ledger">
            <Button
              type="ghost"
              onClick={handleDeletedBet}
              loading={isLoading}
              disabled={isLoading}
              style={{ background: "red", color: "#fff", borderRadius: "2px" }}>
              Delete Bet
            </Button>
          </Col>
        )}
      </Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              {userType == "7" && <th>#</th>}
              <th>Client</th>
              <th>Session Name</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Mode</th>
              <th>Run</th>
              <th>Date</th>
              {userType == "6" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {sportDetail?.data?.length > 0 ? (
              sportDetail?.data.map((items, id) => (
                <tr key={items?.userId || id}>
                  {userType == "7" && (
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
                  )}
                  <td>
                    {items?.userId} ({items?.username})
                  </td>
                  <td>{items?.selectionName}</td>
                  <td>{items?.amount}</td>
                  <td>{items?.rate}</td>
                  <td>{items?.mode}</td>
                  <td>{items?.run}</td>
                  <td>{items?.time}</td>
                  {userType == "6" && (
                    <td>
                      <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={() => handleDeletedSigleBet(items.id)}>
                        Delete
                      </Button>
                    </td>
                  )}
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

export default DeleteMatchBets;
