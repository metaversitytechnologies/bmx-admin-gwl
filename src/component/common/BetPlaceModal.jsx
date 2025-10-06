import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import "./style.scss";
import { useEffect, useState } from "react";
import { useLazyFilterbyClientQuery } from "../../store/service/supermasteAccountStatementServices";
import { useGetBetPlaceDataMutation } from "../../store/service/SportDetailServices";
import { UAParser } from "ua-parser-js";
import moment from "moment";

const BetPlaceModal = ({
  opneModal,
  setOpenModal,
  placeBetData,
  setPlaceBetData,
  initialFormState,
  ip,
}) => {
  const dateFormat = "YYYY/MM/DD HH:mm:ss";
  const [getClient, result] = useLazyFilterbyClientQuery();
  const [trigger, { data: placeValue, isLoading, error }] =
    useGetBetPlaceDataMutation();

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getClient({ userType: 1 });
  }, [getClient]);

  useEffect(() => {
    if (!opneModal) {
      setPlaceBetData(initialFormState);
      setSubmitted(false);
    }
  }, [opneModal]);

  const onSelectDate = (date, dateString) => {
    setPlaceBetData((prev) => ({ ...prev, date: dateString }));
  };

  const handleAmountClick = (value) => {
    setPlaceBetData((prev) => ({ ...prev, amount: value }));
  };

  const isBack = placeBetData?.isFancy
    ? placeBetData?.mode === "Yes"
    : placeBetData?.mode === "Lagai";

  console.log("isBackisBack", isBack);

  const getDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    return {
      userAgent: navigator.userAgent,
      browser: result.browser.name || "Unknown",
      browser_version: result.browser.version || "Unknown",
      os: result.os.name || "Unknown",
      os_version: result.os.version || "Unknown",
      device: result.device.vendor
        ? `${result.device.vendor} ${result.device.model}`
        : result.os.name || "Desktop",
      deviceType: result.device.type || "desktop",
      orientation:
        window.innerWidth > window.innerHeight ? "landscape" : "portrait",
    };
  };
  const handleSubmit = async () => {
    setSubmitted(true);

    if (
      !placeBetData.amount ||
      !placeBetData.userId ||
      !placeBetData.date ||
      !placeBetData.odds
    ) {
      return;
    }

    try {
      const deviceInfo = getDeviceInfo();

      const response = await trigger({
        isFancy: placeBetData?.isFancy,
        isBack: isBack,
        odds: placeBetData?.odds,
        marketName: placeBetData?.marketName,
        selectionId: placeBetData?.sid,
        priceValue: placeBetData?.priceValue,
        marketId: placeBetData?.mid,
        name: placeBetData?.nation,
        matchId: placeBetData?.matchId,
        userIp: ip,
        mode: placeBetData?.mode,
        placeTime: moment(placeBetData?.date).format("YYYY-MM-DD HH:mm:ss:SSS"),
        deviceInfo,
        stake: placeBetData?.amount,
        userId: placeBetData?.userId,
      }).unwrap();

      // ✅ Success message
      if (response?.message) {
        message.success(response.message);
      } else {
        message.success("Bet placed successfully!");
      }

      setOpenModal(false);
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        "Something went wrong. Please try again.";
      message.error(errorMsg);
    }
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

  console.log("placeValueplaceValueplaceValue", placeValue, error);

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
        <Col xs={12}>
          <div className="text-center betplace_heading">
            <h3>Team</h3>
            <p>{placeBetData?.nation}</p>
          </div>
        </Col>
        {/* <Col xs={8}>
          <div className="text-center betplace_heading">
            <h3>Rate</h3>
            <p>{placeBetData?.odds}</p>
          </div>
        </Col> */}
        <Col xs={12}>
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
              <Col lg={6} xs={12}>
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

              <Col lg={6} xs={12}>
                <Form.Item
                  label="Rate"
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
                    placeholder="Enter Rate"
                    value={placeBetData.odds}
                    onChange={(value) =>
                      setPlaceBetData((prev) => ({ ...prev, odds: value }))
                    }
                  />
                </Form.Item>
              </Col>

              {/* User Select */}
              <Col lg={6} xs={24}>
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
              <Col lg={6} xs={24}>
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
                <Button
                  type="primary"
                  loading={isLoading}
                  onClick={handleSubmit}>
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
