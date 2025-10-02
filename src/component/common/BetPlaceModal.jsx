import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import "./style.scss";
import { useEffect, useState } from "react";
import { useLazyFilterbyClientQuery } from "../../store/service/supermasteAccountStatementServices";

const BetPlaceModal = ({
  opneModal,
  setOpenModal,
  placeBetData,
  setPlaceBetData,
  initialFormState,
}) => {
  const dateFormat = "YYYY/MM/DD HH:mm:ss";
  const [getClient, result] = useLazyFilterbyClientQuery();

  const [submitted, setSubmitted] = useState(false);

  // Load client list
  useEffect(() => {
    getClient({ userType: 1 });
  }, [getClient]);

  // ✅ Reset form whenever modal is closed
  useEffect(() => {
    if (!opneModal) {
      setPlaceBetData(initialFormState);
      setSubmitted(false);
    }
  }, [opneModal]);

  // Handlers
  const onSelectDate = (date, dateString) => {
    setPlaceBetData((prev) => ({ ...prev, date: dateString }));
  };

  const handleAmountClick = (value) => {
    setPlaceBetData((prev) => ({ ...prev, amount: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!placeBetData.amount || !placeBetData.userId || !placeBetData.date) {
      return; // validation failed
    }
    console.log("Final Bet Data =>", placeBetData);
    setOpenModal(false);
  };

  const getBetClassName = (suffix = "") => {
    const baseClass = placeBetData?.isFancy
      ? placeBetData?.mode === "Yes"
        ? "back-color"
        : "lay-color"
      : placeBetData?.mode === "Lagai"
      ? "back-color"
      : "lay-color";

    return suffix ? `${baseClass}-${suffix}` : baseClass;
  };

  return (
    <Modal
      className="betplace_modal"
      destroyOnClose
      open={opneModal}
      closable={false}
      onCancel={() => setOpenModal(false)}
      footer={null}
      width={600}>
      {/* Header */}
      <Row
        justify="center"
        className={getBetClassName("light")}
        align="middle"
        style={{ height: "100%", padding: "10px 0" }}>
        <Col xs={8}>
          <div className="text-center betplace_heading">
            <h3>Team</h3>
            <p>{placeBetData?.nation}</p>
          </div>
        </Col>
        <Col xs={8}>
          <div className="text-center betplace_heading">
            <h3>Rate</h3>
            <p>{placeBetData?.odds}</p>
          </div>
        </Col>
        <Col xs={8}>
          <div className="text-center betplace_heading">
            <h3>Mode</h3>
            <p>{placeBetData?.mode}</p>
          </div>
        </Col>
      </Row>

      {/* Form */}
      <Row justify="center" className={getBetClassName("")}>
        <Col xs={24} className="text-center">
          <Form className="form_data" layout="vertical" autoComplete="off">
            <Row
              gutter={16}
              justify="center"
              className="super_agent betplace_amount_row">
              {/* Amount */}
              <Col lg={8} xs={24}>
                <Form.Item
                  label="Amount"
                  required
                  validateStatus={
                    submitted && !placeBetData.amount ? "error" : ""
                  }
                  help={
                    submitted && !placeBetData.amount
                      ? "Please enter amount"
                      : ""
                  }>
                  <InputNumber
                    className="number_field"
                    min={0}
                    type="number"
                    placeholder="Stake"
                    value={placeBetData.amount}
                    onChange={(value) =>
                      setPlaceBetData((prev) => ({ ...prev, amount: value }))
                    }
                  />
                </Form.Item>
              </Col>

              {/* User Select */}
              <Col lg={8} xs={24}>
                <Form.Item
                  label="User Name"
                  required
                  validateStatus={
                    submitted && !placeBetData.userId ? "error" : ""
                  }
                  help={
                    submitted && !placeBetData.userId
                      ? "Please select a client"
                      : ""
                  }>
                  <Select
                    placeholder="Select Client"
                    showSearch
                    value={placeBetData.userId || undefined}
                    allowClear
                    onSearch={() => getClient({ userType: 1 })}
                    onSelect={(value) =>
                      setPlaceBetData((prev) => ({ ...prev, userId: value }))
                    }
                    options={
                      result?.data?.data?.map((user) => ({
                        label: `${user.userName} (${user.userId})`,
                        value: user.userId,
                      })) || []
                    }
                  />
                </Form.Item>
              </Col>

              {/* Date & Time */}
              <Col lg={8} xs={24}>
                <Form.Item
                  label="Date & Time"
                  required
                  validateStatus={
                    submitted && !placeBetData.date ? "error" : ""
                  }
                  help={
                    submitted && !placeBetData.date
                      ? "Please select date & time"
                      : ""
                  }>
                  <DatePicker
                    required
                    showTime={{ format: "HH:mm:ss" }}
                    onChange={onSelectDate}
                    className="transations_date"
                    format={dateFormat}
                    clearIcon={false}
                    value={dayjs(placeBetData.date, dateFormat)}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Quick Amount Buttons */}
            <Row
              gutter={[16, 16]}
              justify="center"
              className="betplace_btn_row betplace_amount_row">
              {[
                100, 200, 500, 1000, 2000, 2500, 5000, 10000, 25000, 50000,
                100000, 200000,
              ].map((val) => (
                <Col xs={8} lg={6} key={val}>
                  <Button onClick={() => handleAmountClick(val)}>{val}</Button>
                </Col>
              ))}
            </Row>

            {/* Action Buttons */}
            <Row justify="center" className="betplace_btn_row">
              <Col xs={12}>
                <Button
                  type="primary"
                  danger
                  onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </Col>
              <Col xs={12}>
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default BetPlaceModal;
