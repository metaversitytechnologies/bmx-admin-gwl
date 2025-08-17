import { Button, Card, Col, DatePicker, Row, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { useGetLiveCasinoListQuery } from "../../../store/service/CasinoServices";
import moment from "moment";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const MatchLedgerCasino = () => {
  const { data, isFetching, isLoading } = useGetLiveCasinoListQuery();

  const renderTableRows = () =>
    data?.data?.map((items, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <Link
            to={`/casino/${items?.tableId}`}
            className="gx-text-blue"
            style={{ fontWeight: 400 }}>
            {items?.name}
          </Link>
        </td>
        <td>
          <sapn style={{ fontWeight: 400 }}>
            {moment().format("YYYY-MM-DD hh:mm:ss A")}
          </sapn>
        </td>
        <td>
          <div
            className="gx-justify-content-end"
            style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              style={{
                height: "36px",
                padding: "0px 15px",
                borderRadius: "5px",
                marginRight: "15px",
              }}>
              <Link to={`/casino/${items?.tableId}`}>View</Link>
            </Button>
            <Button type="link" className="Display_Games">
              <Link to={`/display-games/${items?.tableId}/${items?.name}`}>
                Display Games
              </Link>
            </Button>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="match_slip match_ledger">
      <Card
        className="sport_detail team_name"
        title="Match Ledger"
        extra={<button>Back</button>}
        style={{ margin: 0, width: "100%" }}>
        <div className="gx-mt-3">
          <Row className="date_picker gx-px-5" style={{ gap: 16 }}>
            <Col>
              <RangePicker
                style={{ marginBottom: 10, width: 300 }}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: 10 }}>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                className="gx-border-redius0"
                style={{ height: 36, lineHeight: "32px" }}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="live_table login_data_table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>

          {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        </div>
      </Card>
    </div>
  );
};

export default MatchLedgerCasino;
