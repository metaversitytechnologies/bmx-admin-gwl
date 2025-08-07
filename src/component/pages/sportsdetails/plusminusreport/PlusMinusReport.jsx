import React, { useEffect, useState } from "react";
import { Checkbox, Col, notification, Row, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PlusMinusReport.scss";
import { useGetSessionPlusMinusQuery } from "../../../../store/service/SportDetailServices";

const column = [
  {
    title: "Session",
    dataIndex: "sessionName",
    key: 1,
  },
  {
    title: "Declare",
    dataIndex: "declare",
    key: 2,
  },
];

const clintColumns = [
  {
    title: "Child",
    dataIndex: "userId",
    key: 1,
  },
];

const PlusMinusReport = () => {
  const { id, inplay } = useParams();
  const [first, setFirst] = useState([]);
  const [secondUserid, setSecondUserid] = useState([]);
  const [thirdUserid, setThirdUserid] = useState([]);
  const [showOdds, setShowOdds] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { state } = useLocation();
  const [parentKey, setParentKey] = useState("");
  const nav = useNavigate();

  const { data } = useGetSessionPlusMinusQuery({
    matchId: "34516084",
    matchCompleted: inplay === 1 ? false : true,
    oddsAndSessionBoth: true,
  });

  const handleBackClick = () => {
    nav(-1);
  };

  const handleShowBtn = () => {
    if (!showOdds && first.length === 0) {
      api.error({
        message: "Please select at least one fancy or odds",
        closeIcon: false,
        placement: "top",
      });
    } else if (secondUserid.length === 0 && thirdUserid.length === 0) {
      api.error({
        message: "Please select at least one client.",
        closeIcon: false,
        placement: "top",
      });
    } else {
      nav(`/Events/${id}/plus-minus-report`, {
        state: {
          first,
          state,
          thirdUserid,
          matchCompleted: inplay === 1 ? false : true,
        },
      });
    }
  };

  const onChange = (e) => {
    setShowOdds(e.target.checked);
  };

  useEffect(() => {
    const allData = data;
    setParentKey(allData?.data?.userDetail);

    if (allData?.data?.sessionDetail?.length) {
      setFirst(allData?.data?.sessionDetail.map((i) => i.sessionId));
    }

    if (allData?.data?.userDetail?.length) {
      setThirdUserid(allData?.data?.userDetail.map((i) => i.userId));
    }
  }, [data]);

  const filteredMarkets = data?.data?.sessionDetail.filter(
    (i) => !["match odds", "bookmaker"].includes(i.sessionName?.toLowerCase())
  );

  return (
    <>
      {contextHolder}
      <div className="main_live_section mr-10">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              {state?.dataNameee || "Match Name"}
            </div>
            <div className="show_btn back_show">
              <button onClick={handleShowBtn}>Show</button>
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>

          <div className="table_section plus_minus_page">
            <table className="match_table ">
              <thead>
                <tr>
                  <th></th>
                  <th>Match</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="30px">
                    <Checkbox
                      className="table_check"
                      defaultChecked
                      checked={showOdds}
                      onChange={onChange}
                    />
                  </td>
                  <td>Odds</td>
                </tr>
              </tbody>
            </table>

            <Row className="de_table">
              <Col lg={12} xs={24}>
                <Table
                  className="session_table table1"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setFirst(selectedRows.map((i) => i?.sessionId));
                    },
                    selectedRowKeys: first,
                  }}
                  rowKey="sessionId"
                  bordered
                  columns={column}
                  pagination={false}
                  dataSource={filteredMarkets}
                />
              </Col>

              {/* <Col lg={12} xs={24}>
                <Table
                  className="session_table table2"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSecondUserid(selectedRows.map((i) => i.userid));
                    },
                    selectedRowKeys: secondUserid,
                  }}
                  rowKey="userid"
                  bordered
                  columns={columns}
                  pagination={false}
                  dataSource={staticData.data.users.parent}
                />
              </Col> */}

              <Col lg={12} xs={24}>
                <Table
                  className="session_table"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setThirdUserid(selectedRows?.map((i) => i.userId));
                    },
                    selectedRowKeys: thirdUserid,
                  }}
                  rowKey="userId"
                  bordered
                  columns={clintColumns}
                  pagination={false}
                  dataSource={data?.data?.userDetail}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusMinusReport;
