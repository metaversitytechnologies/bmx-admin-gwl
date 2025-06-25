import { Card, Col, DatePicker, Divider, Empty, Pagination, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const { RangePicker } = DatePicker;

const data = [];



const CasinoProfitAndLoss = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };
  //   const onChange = (key) => {
  //     console.log(key);
  //   };

  const handleTodayProfit = () => {
    nav("/Casino/today-pandl");
  };

  return (
    <>
      <div className="match_slip casino_diamond">
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail "
            title="Diamond Casino Details"
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div>
              <Row className="profit_apply">
                <Col xs={24} xl={6} lg={6} md={24}>
                  <div className="profit_date">
                    <RangePicker />
                  </div>
                </Col>
                <Col
                  xs={4}
                  xl={4}
                  lg={4}
                  md={4}
                  className=" mb-2 btn_apply">
                  <button className="ant-btn-danger ">Apply</button>
                  <button className="apply_btn1">Today P/L</button>
                </Col>
              </Row>
            </div>
            <div className="table_section statement_tabs_data">
              <table className="">
                <tr>
                  <th>Game Id</th>
                  <th>Type</th>
                  <th>Exposer</th>
                  <th>P/L</th>
                  <th>Client P/L</th>
                  <th>Action</th>
                </tr>
                {data?.map((res) => {
                  return (
                    <tr key={res?.key}>
                      <td>{res?.date}</td>
                      <td>{res?.operation}</td>
                      <td>{res?.description}</td>
                    </tr>
                  );
                })}
              </table>
              {data?.length == 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <>
                  <Divider />
                  <div className="pagination_cus">
                    <Pagination
                      className="pagination_main ledger_pagination"
                      defaultCurrent={1}
                      total={5}
                    />
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CasinoProfitAndLoss;
