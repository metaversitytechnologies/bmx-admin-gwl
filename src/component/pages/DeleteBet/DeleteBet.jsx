import { Button, Form, notification, Select, Table } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Filter,
  ShieldAlert,
  Table2,
  Trash2,
  SearchX,
} from "lucide-react";

import {
  useMatchListActiveBetsQuery,
  useMarketHavingBetMutation,
  useGetBetlistAllMutation,
  useGetDeletedBetMutation,
} from "../../../store/service/SportDetailServices";
import { openNotification, openNotificationError } from "../../../App";

const { Option } = Select;

const DeleteBetEmpty = () => (
  <div className="db-empty">
    <span className="db-empty-icon">
      <SearchX size={20} strokeWidth={1.8} />
    </span>
    <p className="db-empty-title">No Data Found</p>
    <p className="db-empty-subtitle">
      There are no bets available for the selected match and market.
    </p>
  </div>
);

const DeleteBet = () => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [showFancyFilter, setShowFancyFilter] = useState(false);
  const [matchId, setMatchId] = useState(null);
  const [marketId, setMarketId] = useState(null);
  const [matchName, setMatchName] = useState("");
  const [fancyId, setFancyId] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const { data: matchList } = useMatchListActiveBetsQuery();
  const [marketbets, { data: marketList }] = useMarketHavingBetMutation();
  const [getDeletedBets, { data: deletedbetLsit }] = useGetBetlistAllMutation();
  const [getDeletedBet, { data: getDelete, isLoading, error }] =
    useGetDeletedBetMutation();


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Event Name",
      dataIndex: "Event",
      key: "Event",
      render: () => <span>{matchName}</span>,
    },
    {
      title: "Nation",
      dataIndex: "selectionName",
      key: "selectionName",
    },
    {
      title: "Bet Type",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "User Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Match Date",
      dataIndex: "time",
      key: "time",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const ids = selectedRows.map((row) => row.id);
      setSelectedRowIds(ids);
    },
    getCheckboxProps: (record) => ({
      disabled: false,
    }),
  };

  const handleBackbtn = () => {
    navigate(-1);
  };

  const onSelectMarket = (value) => {
    marketbets({
      marketType: value,
      matchId: matchId,
    });

    if (value === "Bookmaker") {
      setMarketId(value);
      setShowFancyFilter(false);
      getDeletedBets({
        matchId,
        marketId: value,
      });
    } else {
      setShowFancyFilter(true);
    }
  };

  const onSelectFancy = (value) => {
    setMarketId(value);
    getDeletedBets({
      matchId,
      marketId: value,
    });
  };

  useEffect(() => {
    form.resetFields();
    setMatchId(null);
    setStartDate(dayjs());
  }, [pathname]);

  const handleDeletedBet = async () => {
    const res = getDeletedBet({
      id: selectedRowIds,
    }).unwrap();
  };

  useEffect(() => {
    if (getDelete) {
      if (getDelete?.status) {
        openNotification(getDelete?.message);
        form?.resetFields();
        setTimeout(() => {
          getDeletedBets({
            matchId,
            marketId: marketId,
          });
        }, 1000);
      } else {
        openNotificationError(getDelete?.message || error?.data?.message);
      }
    }
  }, [getDelete, error]);

  return (
    <>
      {contextHolder}
      <div className="main_live_section list_supers admin-details-panel delete-bet-panel">
        <div className="admin-details-header">
          <div className="admin-details-title-wrap">
            <span className="admin-details-icon">
              <ShieldAlert size={20} strokeWidth={1.8} />
            </span>
            <div>
              <div className="team_name admin-details-title">
                Reject Bets
              </div>
              <p className="admin-details-subtitle">
                Review and remove selected bets safely
              </p>
            </div>
          </div>
          <div className="show_btn">
            <button
              type="button"
              className="admin-details-back"
              onClick={handleBackbtn}>
              <ArrowLeft size={15} strokeWidth={1.8} />
              <span className="db-back-label">Back</span>
            </button>
          </div>
        </div>

        <div className="db-body">
          <div className="db-card db-selection-card">
            <div className="db-card-heading">
              <span className="db-card-icon">
                <Filter size={16} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="db-card-title">Bet Selection</h3>
                <p className="db-card-subtitle">
                  Choose a match and market to review available bets.
                </p>
              </div>
            </div>

            <Form
              className="db-form"
              name="delete-bet"
              form={form}
              layout="vertical"
              autoComplete="off">
              <div className="db-selection-row">
                <Form.Item
                  className="db-form-item"
                  label="Match"
                  name="match"
                  rules={[
                    { required: true, message: "Please select a match" },
                  ]}>
                  <Select
                    className="db-select"
                    placeholder="Select Match"
                    showSearch
                    allowClear
                    value={matchId}
                    onChange={(value, option) => {
                      setMatchId(value);
                      setMatchName(option?.label || "");
                    }}
                    filterOption={false}
                    options={
                      matchList?.data?.map((user) => ({
                        label: user.matchName,
                        value: user.matchId,
                      })) || []
                    }
                  />
                </Form.Item>

                <Form.Item
                  className="db-form-item"
                  label="Market"
                  name="maeket"
                  rules={[
                    { required: true, message: "Please select a market" },
                  ]}>
                  <Select
                    className="db-select"
                    onSelect={onSelectMarket}
                    placeholder="Select Market"
                    allowClear>
                    <Option value="">Select Market</Option>
                    <Option value="Bookmaker">Bookmaker</Option>
                    <Option value="Fancy">Fancy</Option>
                  </Select>
                </Form.Item>

                {showFancyFilter && (
                  <Form.Item
                    className="db-form-item"
                    label="Bet List"
                    name="betlist"
                    rules={[
                      { required: true, message: "Please select a market" },
                    ]}>
                    <Select
                      className="db-select"
                      placeholder="Select Fancy"
                      showSearch
                      allowClear
                      onSelect={onSelectFancy}
                      value={fancyId}
                      onChange={(value) => setFancyId(value)}
                      filterOption={false}
                      options={
                        marketList?.data?.map((user) => ({
                          label: user.marketName,
                          value: user.marketId,
                        })) || []
                      }
                    />
                  </Form.Item>
                )}

                <Form.Item className="db-form-item db-delete-item">
                  <Button
                    isLoading={isLoading}
                    type="primary"
                    onClick={handleDeletedBet}
                    className="db-delete-btn"
                    icon={<Trash2 size={14} strokeWidth={2} />}>
                    Delete
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>

          <div className="db-card db-table-card">
            <div className="db-card-heading">
              <span className="db-card-icon">
                <Table2 size={16} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="db-card-title">Available Bets</h3>
                <p className="db-card-subtitle">
                  Select one or more bets to remove.
                </p>
              </div>
            </div>

            <div className="db-table-scroll">
              <Table
                className="db-table"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={deletedbetLsit?.data || []}
                rowKey="id"
                scroll={{ x: 1020 }}
                locale={{ emptyText: <DeleteBetEmpty /> }}
                pagination={{
                  defaultPageSize: 50,
                  pageSizeOptions: [50, 100, 150, 200, 250],
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBet;
