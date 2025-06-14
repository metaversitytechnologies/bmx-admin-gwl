import React, { useEffect, useState } from "react";
import { Checkbox, Col, notification, Row, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PlusMinusReport.scss";

const column = [
  {
    title: "Session",
    dataIndex: "selectionname",
    key: 1,
  },
  {
    title: "Declare",
    dataIndex: "result",
    key: 2,
  },
];

const columns = [
  {
    title: "Parent",
    dataIndex: "userid",
    key: 1,
  },
];

const clintColumns = [
  {
    title: "Child",
    dataIndex: "userid",
    key: 1,
  },
];

const PlusMinusReport = () => {
  const { id } = useParams();
  const [first, setFirst] = useState([]);
  const [secondUserid, setSecondUserid] = useState([]);
  const [thirdUserid, setThirdUserid] = useState([]);
  const [showOdds, setShowOdds] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { state } = useLocation();
  const [parentKey, setParentKey] = useState("");

  const nav = useNavigate();

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
          secondUserid,
          state,
          thirdUserid,
          parentKey,
          showOdds,
        },
      });
    }
  };

  const onChange = (e) => {
    setShowOdds(e.target.checked);
  };

  // ✅ Static mock data
  const staticData = {
    data: {
      markets: [
        { marketid: "101", selectionname: "Session A", result: "Yes", marketname: "session" },
        { marketid: "102", selectionname: "Session B", result: "No", marketname: "session" },
        { marketid: "103", selectionname: "Match Odds", result: "-", marketname: "match odds" },
      ],
      users: {
        parentKey: "super_123",
        parent: [
          { userid: "parent1" },
          { userid: "parent2" },
        ],
        client: [
          { userid: "client1" },
          { userid: "client2" },
        ],
      },
    },
  };

  useEffect(() => {
    const data = staticData;
    setParentKey(data?.data?.users?.parentKey);

    if (data?.data?.markets?.length) {
      setFirst(data.data.markets.map((i) => i.marketid));
    }

    if (data?.data?.users?.parent?.length) {
      setSecondUserid(data.data.users.parent.map((i) => i.userid));
    }

    if (data?.data?.users?.client?.length) {
      setThirdUserid(data.data.users.client.map((i) => i.userid));
    }
  }, []);

  const filteredMarkets = staticData.data.markets.filter(
    (i) => !["match odds", "bookmaker"].includes(i.marketname?.toLowerCase())
  );

  return (
    <>
      {contextHolder}
      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div style={{ padding: "5px 8px", fontSize: "22px" }} className="team_name">
              {state?.dataNameee || "Match Name"}
            </div>
            <div className="show_btn back_show">
              <button onClick={handleShowBtn}>Show</button>
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>

          <div className="table_section">
            <table className="match_table">
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
                      setFirst(selectedRows.map((i) => i.marketid));
                    },
                    selectedRowKeys: first,
                  }}
                  rowKey="marketid"
                  bordered
                  columns={column}
                  pagination={false}
                  dataSource={filteredMarkets}
                />
              </Col>

              <Col lg={12} xs={24}>
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
              </Col>

              <Col lg={12} xs={24}>
                <Table
                  className="session_table"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setThirdUserid(selectedRows.map((i) => i.userid));
                    },
                    selectedRowKeys: thirdUserid,
                  }}
                  rowKey="userid"
                  bordered
                  columns={clintColumns}
                  pagination={false}
                  dataSource={staticData.data.users.client}
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
