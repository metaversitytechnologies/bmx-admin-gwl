import { Card, Col, DatePicker, Empty, Pagination, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./AccountOperations.scss";
import moment from "moment";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useAccountOprationQuery } from "../../../../store/service/userlistService";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const { RangePicker } = DatePicker;

const AccountOperations = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateData, setDateData] = useState([timeBefore, time]);
  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccountOprationQuery(
    {
      index: 0,
      noOfRecords: 500,
      userId: id || "anku121",
      startDate: dateData[0],
      endDate: dateData[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "createdon",
      key: "createdon",
    },
    {
      title: "Operation",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Done By",
      dataIndex: "actionby",
      key: "actionby",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "5%",
    },
  ];

  const dataSource = data?.data?.data?.map((curElm) => {
    console.log(curElm, "DSfsfsd");
    return {
      createdon: curElm?.createdon,
      action: curElm?.action,
      actionby: curElm?.actionby,
      description: curElm?.description,
    };
  });

  const headerField = ["Date", "Operation", "Done By", "Description"];

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
            title={`List Of All Transactions (0)`}
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div className="">
              <Row>
                <Col xs={24} md={24} lg={8} xl={8}>
                  <RangePicker
                    className="acc_datepicker"
                    defaultValue={[dayjs(timeBefore), dayjs(time)]}
                    onChange={onChange}
                  />
                </Col>
                <Col xs={24} md={24} lg={12} xl={12}>
                  <div style={{ marginTop: "12px" }}>
                    <div className="gx-bg-flex1 gx-justify-content-center gx-flex-nowrap gx-px-1 ">
                      <div className=" gx-px-2 gx-py-2 gx-bg-dark">All</div>
                      <div className=" gx-px-2 gx-py-2 gx-bg-primary">
                        P&amp;L
                      </div>
                      <div className=" gx-px-2 gx-py-2 gx-bg-primary">
                        Account
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="table_section statement_tabs_data">
              <div className="table_section">
                <Table
                  className="live_table agent_master"
                  bordered
                  columns={columns}
                  dataSource={data?.data?.data || []}
                  loading={isLoading || isFetching}></Table>
              </div>
            </div>

            {/* <div className="table_section statement_tabs_data">
            <table className="">
              <tr>
                <th>Date</th>
                <th>Operation</th>
                <th>Done By</th>
                <th>Description</th>
              </tr>
              {data?.map((res) => {
                return (
                  <tr key={res?.key}>
                    <td>{res?.Date}</td>
                    <td>{res?.Description}</td>
                    <td>{res?.PrevBal}</td>
                    <td className="text_success">{res?.CR}</td>
                   
                  </tr>
                );
              })}
            </table>
              {
                data?.length == 0?<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:<div className="pagination_cus">
                <Pagination  className="pagination_main ledger_pagination"  defaultCurrent={1} total={5} />
              </div>
              }
          </div> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountOperations;
