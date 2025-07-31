import { Button, Card, Col, Input, Row } from "antd";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useGetUserSeacrhMutation } from "../../../../store/service/SportDetailServices";
import { useState } from "react";

const userType = {
  6: "Admin",
  5: "Mini Admin",
  4: "Master",
  3: "Super",
  2: "Agent",
  1: "Client",
};

const UserSearch = () => {
  const [userName, setUserName] = useState("");
  const [getUserDetails, { data: userData }] = useGetUserSeacrhMutation();

  const handleChange = (e) => {
    setUserName(e.target.value);
    const { value } = e.target;
    setUserName(value);
  };

  const handleShow = () => {
    getUserDetails({
      userId: userName,
    });
  };

  return (
    <>
      <div className="match_slip user_search">
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail acc_name"
            title={`User Search`}
            extra={<button>Back</button>}>
            <div className="user_section">
              <Row>
                <Col xs={24} md={24} lg={1} xl={1}></Col>
                <Col xs={24} md={24} lg={8} xl={8}>
                  <Input
                    placeholder="Enter"
                    className="user_search_inp"
                    value={userName}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={24} md={24} lg={2} xl={2}>
                  <Button
                    type="primary"
                    className="show_btn_user"
                    onClick={handleShow}>
                    Show
                  </Button>
                </Col>
              </Row>
            </div>

            <Row style={{ gap: "15px", paddingLeft: "10px" }}>
              {userData?.data?.map((item) => {
                return (
                  <Col
                    xs={11}
                    md={10}
                    lg={5}
                    className="hhh"
                    key={item?.userId}>
                    <div className="gx-text-white gx-px-2 gx-bg-flex gx-justify-content-center gx-py-2">
                      <div>
                        <HiOutlineUserCircle
                          style={{
                            fontSize: "62px",
                          }}
                        />
                      </div>
                      <div className="gx-px-2 gx-fs-xl gx-font-weight-heavy">
                        {item?.userName} ({item?.userId})
                        <br />
                        <div className="gx-fs-lg gx-font-weight-normal gx-mt-2">
                          {userType?.[item?.userType]}
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
