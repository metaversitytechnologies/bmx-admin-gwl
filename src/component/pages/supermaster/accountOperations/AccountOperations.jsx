import { Card, Col, DatePicker, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./AccountOperations.scss";
import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";
import { useAccOprationQuery } from "../../../../store/service/userlistService";

const { RangePicker } = DatePicker;

const AccountOperations = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [detailType, setDetailsType] = useState("ALL");
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccOprationQuery(
    {
      userId: id ? id : userId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
    },
    {
      title: "Done By",
      dataIndex: "doneBy",
      key: "doneBy",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}
      <div className="match_slip account_match_slip">
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail acc_name"
            title={`List Of All Transactions (${data?.data?.length || 0})`}
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div className="">
              <Row>
                <Col xs={24} md={24} lg={8} xl={8}>
                  <RangePicker
                    style={{ margin: 0 }}
                    className="acc_datepicker"
                    defaultValue={[dayjs(timeBefore), dayjs(time)]}
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </div>

            <div className="table_section statement_tabs_data">
              <div className="table_section">
                <Table
                  className="live_table agent_master"
                  bordered
                  columns={columns}
                  dataSource={data?.data || []}
                  loading={isLoading || isFetching}></Table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountOperations;
