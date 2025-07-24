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
import TransactionTable from "../TransactionTable";
import { useEffect, useState } from "react";
import {
  useCreateTransactionMutation,
  useLazyFilterbyClientQuery,
  useLazyUserListQuery,
} from "../../../../store/service/supermasteAccountStatementServices";
import moment from "moment";
import { useGetUserSeacrhMutation } from "../../../../store/service/SportDetailServices";

const dateFormat = "YYYY/MM/DD";

const AgentTransactions = () => {
  const { name, id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [userTranstionData, setUserTranstionData] = useState([]);
  var curr = new Date();
  const time = moment(curr).format("YYYY-MM-DD");

  const [clientId, setClientId] = useState("");

  const [startDate, setStartDate] = useState(time);
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  const nav = useNavigate();

  const handleBackbtn = () => {
    nav(-1);
  };

  const { Option } = Select;

  // const [getClient, { data: result }] = useGetUserSeacrhMutation();
  const [getClient, result] = useLazyFilterbyClientQuery();

  const [createTran, { data: createTranstions, error, isLoading }] =
    useCreateTransactionMutation();
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

  const onFinish = (values) => {
    const createTranstions = {
      userId: values?.client,
      collection: values?.collection,
      amount: Number(values?.amount),
      paymenttype: values?.payment_type,
      remarks: values?.remark,
    };
    createTran(createTranstions);
    form?.resetFields();
  };

  const [userList, resultData] = useLazyUserListQuery();

  const onSelectDate = (date, dateString) => {
    setStartDate(dateString);
  };

  useEffect(() => {
    getClient({
      userType: id,
    });
  }, [id]);

  useEffect(() => {
    if (createTranstions?.status === true) {
      openNotification(createTranstions?.message);
      form?.resetFields();
    } else if (createTranstions?.status === false || error?.data?.message) {
      openNotificationError(createTranstions?.message || error?.data?.message);
    }
  }, [createTranstions, error]);

  // useEffect(() => {
  //   if (result?.data?.data !== undefined) {
  //     const useData = JSON.parse(result?.data?.data?.cashtransection);
  //     setUserTranstionData(useData?.results);
  //   }
  // }, [result?.data]);

  useEffect(() => {
    form?.resetFields();
    setClientId("");
    // userList({
    //   userType: userType,
    //   userName: "",
    // });
  }, [pathname]);

  console.log("result?.data?.data", result?.data?.data);

  return (
    <>
      {contextHolder}
      <Card
        className="sport_detail ledger_data cash_data"
        title={`${name} Transactions`}
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="my_ledger">
          <Form
            className="form_data mt-16 cash_data"
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
            <Row>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="client"
                  name="client"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please select Client",
                    },
                  ]}>
                  <Select
                    placeholder="Select Client"
                    onSearch={(value) => {
                      if (value) getClient({ userType: id });
                    }}
                    value={clientId}
                    allowClear
                    onSelect={(value) => setClientId(value)}
                    options={
                      result?.data?.data?.map((user) => ({
                        label: `${user.userName} (${user.userId})`,
                        value: user.userId,
                      })) || []
                    }
                    showSearch></Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Collection"
                  name="collection"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please select Collection",
                    },
                  ]}>
                  <Select defaultValue="Select Cash A/C" allowClear>
                    <Option value="CASH">Cash A/C</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Date"
                  name="Date"
                  // required
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select date",
                  //   },
                  // ]}
                >
                  <DatePicker
                    required
                    onChange={onSelectDate}
                    className="transations_date"
                    // defaultValue={moment()}
                    format={dateFormat}
                    defaultValue={dayjs(startDate)}
                  />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Amount"
                  name="amount"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Enter Amount",
                    },
                  ]}>
                  <Input type="number" placeholder="Enter Amount" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Payment Type"
                  name="payment_type"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Select One",
                    },
                  ]}>
                  <Select placeholder="Payment Type" allowClear>
                    <Option value="Diya">PAYMENT - DIYA</Option>
                    <Option value="Liya">PAYMENT - LIYA</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Remark"
                  name="remark"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Enter Remark",
                    },
                  ]}>
                  <Input type="text" placeholder="Remarks" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  label="Ledger Type"
                  name="ledger_type"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please Select One",
                    },
                  ]}>
                  <Select placeholder="All" allowClear>
                    <Option value="All">All</Option>
                    <Option value="Diamond">Diamond Casino</Option>
                    <Option value="International">International Casino</Option>
                    <Option value="Settle">Settle</Option>
                    <Option value="Cricket">Cricket</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <Card className="sport_detail ledger_data">
        {/* {userTranstionData?.length != 0  && ( */}
        <TransactionTable
          clientId={clientId}
          balanceData={result?.data?.data?.lenadenabalance}
          data={userTranstionData}
        />
        {/* )} */}
      </Card>
    </>
  );
};

export default AgentTransactions;
