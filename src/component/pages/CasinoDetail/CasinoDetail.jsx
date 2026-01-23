import "./CasinoDetail.scss";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

const CasinoDetail = () => {
  const navigate = useNavigate();

  const handleBackbtn = () => {
    navigate("/");
  };

  const [rouletteKey, setRouletteKey] = useState();

  const handleDroupDown = (val) => {
    setRouletteKey(val);
  };

  const data = [
    {
      key: "1",
      name: "Roulette 04-07-2023",
      plusminu: 24,
    },
    {
      key: "2",
      name: "Roulette 04-07-2023",
      plusminu: -4,
    },
  ];

  const items = [
    {
      label: (
        <Link
          to={`/Casino/rouletteKey/plus-minus-type`}
          className="title_section">
          Aura Plus Minus
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="title_section" to="/Casino/rouletteKey/all-games">
          Display Game
        </Link>
      ),
      key: "1",
    },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [casinoName , setCasinoName] = useState("")

  const handleCasinoName = (event) => {
    setCasinoName(event)
  };

  console.log(casinoName)

  const handleBookbtn = () =>{
    console.log(casinoName)
    if(casinoName === "roulette" ){
      navigate("/Casino/roulette-book")
    }
  }


  return (
    <>
      <Card
        className="sport_detail roulette"
        title="Casino Detail"
        extra={
          <>
            <button onClick={handleBackbtn}>Back</button>
          </>
        }>
        <div className=" m-12">
          <Form
            className="casino_from"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Row>
              <Col lg={9} xs={24} xl={9} md={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}>
                  <Select 
                    placeholder="Select Casino" onChange={handleCasinoName}>
                    <Option value="dusKaDam">Dus Ka Dum</Option>
                    <Option value="roulette">Roulette</Option>
                    <Option value="andarBahar">Ander Bahar</Option>
                    <Option value="andharBahar2">Ander Bahar 2</Option>
                    <Option value="lucky7b">Lucky 7B</Option>
                    <Option value="amarAkbarAnthony">Amar Akbar Anthony</Option>
                    <Option value="teenpatti">Teenpatti T20</Option>
                    <Option value="dragonTiger">Dragon Tiger</Option>
                    <Option value="dragonTiger2">Dragon Tiger 2</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={9} xs={24} xl={9} md={24}>
                <Form.Item>
                  <RangePicker
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={6} xs={24} xl={6} md={24}>
                <div className="casino_button">
                  <Form.Item className="book_btn">
                    <Button onClick={handleBookbtn} type="primary">Book</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>

          {/* <RangePicker bordered={false} /> */}
        </div>
        <div className="table_section">
          <table className="">
            <tr>
              <th width="15%"></th>
              <th width="65%">Name</th>
              <th className="text-right" width="20%">
                Plus Minu
              </th>
            </tr>
            {data?.map((res) => {
              return (
                <tr key={res?.key}>
                  <td className="roulette_droupdown" width="15%">
                    <Dropdown
                      className="table_dropdown"
                      menu={{
                        items,
                      }}
                      trigger={["hover"]}>
                      <a onClick={() => handleDroupDown(res?.key)}>
                        <Space>
                          <CaretDownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </td>
                  <td width="65%">{res?.name}</td>
                  <td
                    className={`text-right ${
                      res?.plusminu > 0
                        ? "text_success"
                        : res?.plusminu < 0
                        ? "text_danger"
                        : ""
                    }`}
                    width="20%">
                    {res?.plusminu}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        {/* <Divider /> */}
        {/* <Pagination className="pagination_main ledger_pagination" defaultCurrent={1} total={50} /> */}
      </Card>
    </>
  );
};

export default CasinoDetail;
