import { Card, Select } from "antd";
import "./style.scss";

const FancyBets = () => {
  return (
    <>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail matched_bets"
      >
        <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
          Match Bets - 2
          <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
            <span className=" gx-font-weight-semi-bold OddsType">OddsType</span>
            <Select
              style={{ width: 150 }}
              defaultValue="All OddsType"
              options={[
                {
                  value: "All OddsType",
                  label: "All OddsType",
                },
                {
                  value: "Bookmaker",
                  label: "Bookmaker",
                },
              ]}
            />
          </div>
          <button
            type="button"
            className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
            <span className="ml-1 px-1">PDF</span>
          </button>
        </div>

        <div className="table_section">
          <table className="">
            <tr>
              <th>Rate</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Odds Type</th>
              <th>Team</th>
              <th>Client</th>
              <th>Agent</th>
              <th>Date</th>
              <th>Loss</th>
              <th>Profit</th>
            </tr>

            <tr className="matchdtailsNoBack">
              <td>48</td>
              <td>100</td>
              <td>Khaai</td>
              <td>bookmaker</td>
              <td>SRI LANKA</td>
              <td>C154403 client2</td>
              <td>agemas (A10285)</td>
              <td>25 Jul 12:45:22 PM</td>
              <td> 57.00</td>
              <td>100.00</td>
            </tr>
            <tr className="matchdtailsYesBackground">
              <td>48</td>
              <td>100</td>
              <td>Khaai</td>
              <td>bookmaker</td>
              <td>SRI LANKA</td>
              <td>C154403 client2</td>
              <td>agemas (A10285)</td>
              <td>25 Jul 12:45:22 PM</td>
              <td> 57.00</td>
              <td>100.00</td>
            </tr>
          </table>
        </div>
      </Card>
      <br />
      <br />
    </>
  );
};

export default FancyBets;
