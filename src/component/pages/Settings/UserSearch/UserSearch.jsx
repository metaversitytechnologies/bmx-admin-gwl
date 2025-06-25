import { Button, Card, Col, Input, Row } from "antd";
import { HiOutlineUserCircle } from "react-icons/hi";

const UserSearch = () => {
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
                  <Input placeholder="Enter" className="user_search_inp" />
                </Col>
                <Col xs={24} md={24} lg={2} xl={2}>
                  <Button type="primary" className="show_btn_user">
                    Show
                  </Button>
                </Col>
              </Row>
            </div>

            <Row style={{ gap: "15px", paddingLeft: "10px" }}>
              <Col xs={11} md={10} lg={5} className="hhh">
                <div className="gx-text-white gx-px-2 gx-bg-flex gx-justify-content-center gx-py-2">
                  <div>
                    <HiOutlineUserCircle
                      style={{
                        fontSize: "62px",
                      }}
                    />
                  </div>
                  <div className="gx-px-2 gx-fs-xl gx-font-weight-heavy">
                    King (MA5873)
                    <br />
                    <div className="gx-fs-lg gx-font-weight-normal gx-mt-2">
                      Master
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={11} md={10} lg={5} className="hhh">
                <div className="gx-text-white gx-px-2 gx-bg-flex gx-justify-content-center gx-py-2">
                  <div>
                    <HiOutlineUserCircle
                      style={{
                        fontSize: "62px",
                      }}
                    />
                  </div>
                  <div className="gx-px-2 gx-fs-xl gx-font-weight-heavy">
                    Ddddemo (SA6800)
                    <br />
                    <div className="gx-fs-lg gx-font-weight-normal gx-mt-2">
                      superagent
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
