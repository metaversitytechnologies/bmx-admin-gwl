import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
} from "antd";

import {
  CalendarDays,
  CreditCard,
  IndianRupee,
  Layers,
  MessageSquareText,
  Search,
  UserRound,
  Wallet,
} from "lucide-react";
import TransactionTable from "../TransactionTable";
import {
  useCreateLedgerMutation,
  useGetLedgerDetailsMutation,
  useLazyFilterbyClientQuery,
} from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode, convertCodeReverse } from "../../../../store/constant";
import { openNotification, openNotificationError } from "../../../../App";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const AgentTransactions = () => {
  const { name, id, userId } = useParams();
  const { pathname } = useLocation();
  const nav = useNavigate();

  const [, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [isPolling, setIsPolling] = useState(false);

  const [getClient, result] = useLazyFilterbyClientQuery();
  const [trigger, { data: ledgerDetails }] = useGetLedgerDetailsMutation();
  const [createTran, { data: createTranstions, error, isLoading }] =
    useCreateLedgerMutation();

  /** Handlers */
  const handleBackbtn = () => nav(-1);

  const onSelectDate = (_, dateString) => setStartDate(dateString);

  const onFinish = (values) => {
    const payload = {
      userId: convertCodeReverse(values?.client),
      collection: values?.collection,
      amount: Number(values?.amount),
      paymentType: values?.payment_type,
      remark: values?.remark,
    };

    createTran(payload);
    form.resetFields();
  };

  /** Effects */
  useEffect(() => {
    getClient({ userType: id });
  }, [id, getClient]);

  useEffect(() => {
    if (createTranstions?.status) {
      openNotification(createTranstions?.message);
      setIsPolling(true);

      const timeoutId = setTimeout(async () => {
        await trigger({
          userId: userId
            ? convertCodeReverse(userId)
            : convertCodeReverse(clientId),
          transactiontype: "All",
        });
        setIsPolling(false);
      }, 2000);

      form.resetFields();

      return () => clearTimeout(timeoutId);
    } else if (createTranstions?.status === false || error?.data?.message) {
      openNotificationError(createTranstions?.message || error?.data?.message);
    }
  }, [createTranstions, error, trigger, form]);

  useEffect(() => {
    if (userId) {
      trigger({ userId: convertCodeReverse(userId), transactiontype: "All" });
    }
  }, [userId, trigger]);

  useEffect(() => {
    form.resetFields();
    setClientId("");
  }, [pathname, form]);

  useEffect(() => {
    if (result?.data?.data?.length && userId) {
      const matchedClient = result.data.data.find(
        (user) => String(user.userId) === String(userId)
      );

      if (matchedClient) {
        form.setFieldsValue({ client: convertCode(matchedClient.userId) });
        setClientId(matchedClient.userId);
        trigger({
          userId: matchedClient.userId,
          transactiontype: "All",
        });
      }
    }
  }, [result, userId, trigger, form]);

  return (
    <div className="main_live_section list_supers admin-details-panel agent-transactions-panel">
      {isPolling && <CustomLoading />}
      {contextHolder}
      <AppPageHeader
        icon={<Wallet size={20} strokeWidth={1.8} />}
        title={`${name?.replace("-", " ")} Transactions`}
        subtitle="Record and manage agent cash transactions"
        onBack={handleBackbtn}
      />
      <Card className="sport_detail ledger_data cash_data">
        <div className="my_ledger">
          <Form
            className="form_data cash_data atx-form"
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              collection: "CA1 CASH",
              ledger_type: "All",
            }}
            autoComplete="off">
            <div className="atx-form-grid">
              <Form.Item
                label="Client"
                className="atx-decorated-field"
                required>
                <div className="atx-control atx-select-control">
                  <span className="atx-control-icon" aria-hidden="true">
                    <UserRound size={18} strokeWidth={1.9} />
                  </span>
                  <Form.Item
                    name="client"
                    rules={[
                      { required: true, message: "Please select Client" },
                    ]}
                    noStyle>
                    <Select
                      placeholder="Select Client"
                      showSearch
                      value={clientId}
                      allowClear
                      onSearch={(value) => value && getClient({ userType: id })}
                      onSelect={(value) => {
                        setClientId(value);
                        trigger({
                          userId: convertCodeReverse(value),
                          transactiontype: "All",
                        });
                      }}
                      options={
                        result?.data?.data?.map((user) => ({
                          label: `${user.userName} (${convertCode(
                            user.userId
                          )})`,
                          value: convertCode(user.userId),
                        })) || []
                      }
                    />
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item
                label="Collection"
                className="atx-decorated-field"
                required>
                <div className="atx-control atx-select-control">
                  <span className="atx-control-icon" aria-hidden="true">
                    <CreditCard size={18} strokeWidth={1.9} />
                  </span>
                  <Form.Item
                    name="collection"
                    initialValue="CA1 CASH"
                    rules={[
                      { required: true, message: "Please select Collection" },
                    ]}
                    noStyle>
                    <Select defaultValue="CA1 CASH" allowClear>
                      <Option value="CA1 CASH">Cash A/C</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item label="Date" className="atx-decorated-field">
                <div className="atx-control atx-date-control">
                  <span className="atx-control-icon" aria-hidden="true">
                    <CalendarDays size={18} strokeWidth={1.9} />
                  </span>
                  <Form.Item name="Date" noStyle>
                    <DatePicker
                      required
                      onChange={onSelectDate}
                      className="transations_date"
                      format={dateFormat}
                      defaultValue={dayjs(startDate)}
                    />
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Enter Amount" }]}>
                <Input
                  className="atx-plain-input"
                  type="number"
                  placeholder="Enter Amount"
                  prefix={<IndianRupee size={17} strokeWidth={1.9} />}
                />
              </Form.Item>

              <Form.Item
                label="Payment Type"
                className="atx-decorated-field"
                required>
                <div className="atx-control atx-select-control">
                  <span className="atx-control-icon" aria-hidden="true">
                    <CreditCard size={18} strokeWidth={1.9} />
                  </span>
                  <Form.Item
                    name="payment_type"
                    rules={[
                      { required: true, message: "Please Select One" },
                    ]}
                    noStyle>
                    <Select placeholder="Payment Type" allowClear>
                      <Option value="payment - dena">PAYMENT - DIYA</Option>
                      <Option value="payment - lena">PAYMENT - LIYA</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ required: true, message: "Enter Remark" }]}>
                <Input
                  className="atx-plain-input"
                  type="text"
                  placeholder="Remarks"
                  prefix={<MessageSquareText size={17} strokeWidth={1.9} />}
                />
              </Form.Item>

              <Form.Item
                label="Ledger Type"
                className="atx-decorated-field"
                required>
                <div className="atx-control atx-select-control">
                  <span className="atx-control-icon" aria-hidden="true">
                    <Layers size={18} strokeWidth={1.9} />
                  </span>
                  <Form.Item
                    name="ledger_type"
                    rules={[
                      { required: true, message: "Please Select One" },
                    ]}
                    noStyle>
                    <Select placeholder="All" allowClear>
                      <Option value="All">All</Option>
                      <Option value="Diamond">Diamond Casino</Option>
                      <Option value="International">International Casino</Option>
                      <Option value="Settle">Settle</Option>
                      <Option value="Cricket">Cricket</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item className="atx-submit-item">
                <Button
                  className="approved-primary-button atx-submit-button"
                  loading={isLoading}
                  type="primary"
                  htmlType="submit">
                  <Search size={17} strokeWidth={2} />
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Card>

      <div className="sport_detail ledger_data">
        {ledgerDetails && (
          <TransactionTable
            trigger={trigger}
            clientId={clientId}
            data={ledgerDetails?.data}
          />
        )}
      </div>
    </div>
  );
};

export default AgentTransactions;
