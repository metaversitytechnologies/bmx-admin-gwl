import {
  Button,
  Card,
  Col,
  Form,
  notification,
  Row,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  useMatchListActiveBetsQuery,
  useMarketHavingBetMutation,
  useGetBetlistAllMutation,
  useGetDeletedBetMutation,
} from "../../../store/service/SportDetailServices";

const { Option } = Select;

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

  const openNotification = (mess) => {
    api.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

  const openNotificationError = (mess) => {
    api.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };

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
      <Card
        className="sport_detail ledger_data cash_data"
        title="Delete Bets"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div style={{ padding: "10px 0px" }}>
          <Form
            className="form_data mt-16 cash_data"
            name="delete-bet"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off">
            <Row gutter={[16, 16]}>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Match"
                  name="match"
                  rules={[
                    { required: true, message: "Please select a match" },
                  ]}>
                  <Select
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
              </Col>

              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Market"
                  name="maeket"
                  rules={[
                    { required: true, message: "Please select a market" },
                  ]}>
                  <Select
                    onSelect={onSelectMarket}
                    placeholder="Select Market"
                    allowClear>
                    <Option value="">Select Market</Option>
                    <Option value="Bookmaker">Bookmaker</Option>
                    <Option value="Fancy">Fancy</Option>
                  </Select>
                </Form.Item>
              </Col>

              {showFancyFilter && (
                <Col xl={8} lg={8} md={24} xs={24}>
                  <Form.Item
                    label="Bet List"
                    name="betlist"
                    rules={[
                      { required: true, message: "Please select a market" },
                    ]}>
                    <Select
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
                </Col>
              )}
            </Row>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                isLoading={isLoading}
                type="primary"
                onClick={handleDeletedBet}>
                Delete
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <Card className="sport_detail ledger_data">
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Table
            className="live_table"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={deletedbetLsit?.data || []}
            rowKey="id"
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default DeleteBet;
