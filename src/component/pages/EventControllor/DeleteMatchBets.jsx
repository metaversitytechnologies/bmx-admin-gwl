import {
  Button,
  Card,
  Empty,
  message,
  Select,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { ListChecks, RotateCcw, Trash2 } from "lucide-react";
import {
  useGetDeletdBetMutation,
  useGetMatchedBetDeletedQuery,
} from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const DeleteMatchBets = () => {
  const [selectedMkt, setSelectedMkt] = useState("BOOKMAKER");
  const nav = useNavigate();
  const [fancyIdList, setFancyIdList] = useState([]);
  const [filterResetKey, setFilterResetKey] = useState(0);
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

  const handleResetFilters = () => {
    setDateData([timeBefore, time]);
    setSelectedMkt("BOOKMAKER");
    setFancyIdList([]);
    setFilterResetKey((key) => key + 1);
  };

  const userType = localStorage.getItem("userType");

  return (
    <div className="main_live_section list_supers admin-details-panel delete-match-bets-panel">
      <AppPageHeader
        icon={<ListChecks size={20} strokeWidth={1.8} />}
        title="Delete Match Bets"
        subtitle="Review and remove match bets for this match"
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail delete-bet-detail-card">
      <div className="delete-bet-filter-toolbar">
        <div className="delete-bet-filter-control is-date-range">
          <DatePicker.RangePicker
            key={filterResetKey}
            defaultValue={[dayjs(dateData[0]), dayjs(dateData[1])]}
            onChange={onChange}
          />
        </div>
        <div className="delete-bet-filter-control is-select">
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
          />
        </div>
        <div className="delete-bet-toolbar-actions">
          {userType == "7" && (
            <Button
              type="ghost"
              onClick={handleDeletedBet}
              loading={isLoading}
              disabled={isLoading}
              className="delete-bet-danger-button">
              <Trash2 size={16} strokeWidth={2} />
              Delete Bet
            </Button>
          )}
          <Button
            type="default"
            onClick={handleResetFilters}
            className="delete-bet-reset-button">
            <RotateCcw size={16} strokeWidth={2} />
            Reset
          </Button>
        </div>
      </div>

      <div className="delete-bet-mobile-hint">← Swipe to view all columns →</div>
      <div className="table_section delete-bet-table-viewport">
        <table className="ant-spin-nested-loading delete-bet-detail-table">
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
              {userType == "6" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {sportDetail?.data?.length > 0 ? (
              sportDetail?.data.map((items, id) => (
                <tr key={items?.userId || id}>
                  <td className="delete-bet-check-cell">
                    {userType == "7" ? (
                      <input
                        className="form-check-input delete-bet-checkbox"
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={items.checked}
                        onChange={() => handleSessionChange(items.id)}
                      />
                    ) : (
                      <span className="delete-bet-muted-marker">—</span>
                    )}
                  </td>
                  <td className="delete-bet-client-cell">
                    <span>
                      {items?.userId} ({items?.username})
                    </span>
                  </td>
                  <td className="delete-bet-session-cell">
                    <span title={items?.selectionName}>
                      {items?.selectionName}
                    </span>
                  </td>
                  <td className="delete-bet-number-cell">{items?.amount}</td>
                  <td className="delete-bet-number-cell">{items?.rate}</td>
                  <td>{items?.mode}</td>
                  <td className="delete-bet-number-cell">{items?.run}</td>
                  <td className="delete-bet-date-cell">{items?.time}</td>
                  {userType == "6" && (
                    <td>
                      <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={() => handleDeletedSigleBet(items.id)}
                        className="delete-bet-row-delete">
                        <Trash2 size={14} strokeWidth={2} />
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <div className="delete-bet-empty-state">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={null}
                    />
                    <h3>No Data Found</h3>
                    <p>
                      There are no match bets available in the selected range.
                    </p>
                    <Button
                      className="delete-bet-clear-button"
                      onClick={handleResetFilters}>
                      Clear Filters
                    </Button>
                  </div>
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

export default DeleteMatchBets;
