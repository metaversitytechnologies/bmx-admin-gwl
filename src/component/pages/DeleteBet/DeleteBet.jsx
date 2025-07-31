import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLazyFilterbyClientQuery } from "../../../store/service/supermasteAccountStatementServices";
import {
  useMatchListActiveBetsQuery,
  useMarketHavingBetMutation,
} from "../../../store/service/SportDetailServices";

const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const DeleteBet = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [matchId, setMatchId] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());

  const [getClient, result] = useLazyFilterbyClientQuery();
  const { data: matchList } = useMatchListActiveBetsQuery();
  const [marketbets, { data: marketList }] = useMarketHavingBetMutation();

  const handleBackbtn = () => {
    navigate(-1);
  };

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    form.resetFields();
    setMatchId(null);
    setStartDate(dayjs());
  };

  const onSelectMarket = (value) => {
    marketbets({
      marketType: value,
      matchId: matchId,
    });
  };

  useEffect(() => {
    form.resetFields();
    setMatchId(null);
    setStartDate(dayjs());
  }, [pathname]);


  console.log(marketList?.data, "marketListmarketList")

  return (
    <>
      <Card
        className="sport_detail ledger_data cash_data"
        title="Delete Bets"
        extra={<Button onClick={handleBackbtn}>Back</Button>}>
        <div className="" style={{ padding: "10px 0px" }}>
          <Form
            className="form_data mt-16 cash_data"
            name="delete-bet"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
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
                    onChange={(value) => setMatchId(value)}
                    filterOption={false}
                    options={
                      matchList?.data?.map((user) => ({
                        label: `${user.matchName}`,
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
                    <Option value="Bookmaker">Bookmaker</Option>
                    <Option value="Fancy">Fancy</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Bet List"
                  name="betlist"
                  rules={[
                    { required: true, message: "Please select a market" },
                  ]}>
                  <Select placeholder="Select Bet List" allowClear>
                    <Option value="Bookmaker">Bookmaker</Option>
                    <Option value="Fancy">Fancy</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      {/* Optional additional UI for bet list if needed */}
      <Card className="sport_detail ledger_data" />
    </>
  );
};

export default DeleteBet;
