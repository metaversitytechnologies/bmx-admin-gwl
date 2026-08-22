import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { BadgePercent } from "lucide-react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const MatchCommission = ({ commissionType, commiType, data, createName }) => {
  const { id } = useParams();
  const { Option } = Select;

  return (
    <section className="create-admin-card create-admin-commission-card">
      <div className="create-admin-section-heading">
        <span className="create-admin-section-icon">
          <BadgePercent size={16} strokeWidth={1.9} />
        </span>
        <div>
          <h2>{createName} Match Share and Commission</h2>
          <p>Configure match sharing and commission rules</p>
        </div>
      </div>
      <Row className="super_agent sub_super create-admin-grid">
        {id === "2" ? (
          <></>
        ) : (
          <>
            <Col lg={12} xs={24}>
              <Form.Item
                label="My Match Share"
                name="MyMatchShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  value={data?.myPartnership}
                  // defaultChecked={userData && userData?.myMatchCommission}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Match Share(%)"
                name="matchShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Match Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Match share can not be more than" +
                              " " +
                              `${data?.data?.myShare}`,
                          ),
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Col lg={12} xs={24}>
          <Form.Item label="My Comm type" name="MyCommtype" required={false}>
            <Input type="text" disabled />
          </Form.Item>
        </Col>

        <Col lg={12} xs={24}>
          <Form.Item
            name="Commtype"
            label="Comm type"
            required
            rules={[
              {
                required: true,
                message: "Please select commission type",
              },
            ]}>
            <Select
              onChange={commissionType}
              defaultValue="Commision Type"
              allowClear>
              <Option value="nocomm">No Comm</Option>
              <Option value="bbb">Bet by bet</Option>
            </Select>
          </Form.Item>
        </Col>
        {commiType === "bbb" && (
          <>
            <Col lg={12} xs={24}>
              <Form.Item name="My_Match_comm" label="My Match comm(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="Match_comm"
                required
                label="Match comm(%)"
                rules={[
                  {
                    required: true,
                    message: "Please input your match Commission!",
                  },
                ]}>
                <Input placeholder="master Match Commission" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item name="My_sess_comm" label="My Sess comm(%)">
                <InputNumber
                  className="number_field"
                  min={0}
                  step="0.1"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="sess_comm"
                required
                label="Sess Comm(%)"
                rules={[
                  {
                    required: true,
                    message: "Please input your Sess Commission!",
                  },
                ]}>
                <Input placeholder="master Session Commission" />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      {/* <div>
        {
          window.location.pathname.includes("create-client") ? null : <h2 className="match_share">{createName} Casino Share </h2>
        }
       
        <Row className="super_agent sub_super">
        {window.location.pathname.includes("create-client") ? (
          <></>
        ) : (
          <>
            <Col lg={12} xs={24}>
              <Form.Item
                label="My Casino Share(%)"
                name="MyCasinoShare"
                required={false}>
                <InputNumber
                  className="number_field"
                  min={0}
                  defaultChecked={userData && userData?.myCasinoShare}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Casino Share(%)"
                name="casinoShare"
                rules={[
                  {
                    required: true,
                    message: "Invalid Casino Share",
                  },
                  {
                    validator: async (_, values) => {
                      if (
                        data?.data?.myCasinoShare < values &&
                        values != "" &&
                        values != null
                      ) {
                        return Promise.reject(
                          new Error(
                            "Casino share can not be more than" +
                              " " +
                              `${data?.data?.myCasinoShare}`
                          )
                        );
                      }
                    },
                  },
                ]}>
                <InputNumber
                  className="number_field"
                  min={0}
                  step="1"
                  type="number"
                  placeholder="Enter Match Share"
                  onKeyDown={(e) => {
                    if (e.key == ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
      </div> */}
    </section>
  );
};

MatchCommission.propTypes = {
  commissionType: PropTypes.func.isRequired,
  commiType: PropTypes.string,
  data: PropTypes.shape({
    myPartnership: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.shape({
      myShare: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }),
  createName: PropTypes.string,
};

export default MatchCommission;
