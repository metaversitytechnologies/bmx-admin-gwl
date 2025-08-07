import {
    Button,
    Col,
    Form,
    Input,
    Row, 
  } from "antd";
  
  import { useEffect } from "react";
  import { openNotification, openNotificationError } from "../../../App";
  
  const LedgerPopUp = ({ userData, modalsName, handleClose }) => {
   
  
    const [form] = Form.useForm();
  
  
      

    return (
      <>
        <div className="my_ledger" style={{paddingBottom: "3px"}}>
          {/* <Form
            className="form_data mt-16 cash_data"
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
            <Row>
              <Col md={24} xs={24}>
                <Form.Item
                  label="Client"
                  name="client"
                  >
                  <Input disabled defaultValue={userData?.userId} value={userData?.userId} type="text" placeholder="Client Name" />
                
                </Form.Item>
              </Col>
              {/* <Col md={24} xs={24}>
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
              </Col> */}
              {/* <Col md={24} xs={24}>
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
                    // onChange =
                    // {onSelectDate}
                    className="transations_date"
                    // defaultValue={moment()}
                    format={dateFormat}
                    // defaultValue={dayjs(startDate)}
                  />
                </Form.Item>
              </Col> */}
              <Col md={24} xs={24}>
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
              {/* <Col md={24} xs={24}>
                <Form.Item
                  label="Payment Type"
                  name="payment_type"
                  >
                  <Select defaultValue={modalsName == "Lena" ?"Liya":"Diya" } placeholder="Payment Type" allowClear>
                    <Option value="Diya">PAYMENT - DIYA</Option>
                    <Option value="Liya">PAYMENT - LIYA</Option>
                  </Select>
                </Form.Item>
              </Col> */}
              <Col md={24} xs={24}>
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
  
              {/* <Col md={24} xs={24}>
                <Form.Item
                  label="Transaction Password"
                  name="password"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Enter Transaction Password",
                    },
                  ]}>
                  <Input type="password" placeholder="Remarks" />
                </Form.Item>
              </Col> */}
            </Row>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form> */}
        </div>
      </>
    );
  };
  
  export default LedgerPopUp;
  