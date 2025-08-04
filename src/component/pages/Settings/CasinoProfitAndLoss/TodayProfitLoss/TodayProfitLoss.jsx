import { Card, Divider, Empty, Pagination } from "antd";
import { useNavigate } from "react-router-dom";



const data = [];

const TodayProfitLoss = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };
  return (
    <>
      <div className="match_slip">
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail "
            title=""
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div>
              <h1 style={{textAlign:"center",color:"#262626" ,padding:"15px", fontSize:"22px", fontWeight:"500"}}>Total : 0.00</h1>
            </div>
            <div className="table_section statement_tabs_data">
              <table className="">
                <tr>
                  <th>Game ID</th>
                  <th>Type</th>
                  <th>Started AT</th>
                  <th>Winner</th>
                  <th>Plus/Minus</th>
                  <th>Action</th>
                </tr>
                {data?.map((res) => {
                  return (
                    <tr key={res?.key}>
                      <td>{res?.date}</td>
                      <td>{res?.operation}</td>
                      <td>{res?.description}</td>
                      <td>{res?.description}</td>
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
                    <Pagination className="pagination_main ledger_pagination" defaultCurrent={1} total={5} />
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

export default TodayProfitLoss;