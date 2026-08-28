import { useEffect, useState } from "react";
import { Col, notification, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { useCasiniPlayerListQuery } from "../../../../store/service/SportDetailServices";
import { convertCode } from "../../../../store/constant";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const column = [
  {
    title: "Game Name",
    dataIndex: "sessionName",
    key: 1,
  },
];

const clintColumns = [
  {
    title: "User",
    dataIndex: "userId",
    key: 1,
    render:(text)=>(
      <span>{convertCode(text)}</span>
    )
  },
];

const CasinoPLMinus = () => {
  const { date } = useParams();
  const [first, setFirst] = useState([]);
  const [thirdUserid, setThirdUserid] = useState([]);
  const [api, contextHolder] = notification.useNotification(); // ✅ Fixed
  const nav = useNavigate();

  const { data } = useCasiniPlayerListQuery({ date });

  const handleBackClick = () => {
    nav(-1);
  };

  const handleShowBtn = () => {
    if (!thirdUserid.length || !first.length) {
      api.warning({
        message: "Please select at least one user and one game session.",
      });
      return;
    }

    nav(`/casino/110/plus-minus-type`, {
      state: { thirdUserid, first, date },
    });
  };

  useEffect(() => {
    const allData = data;

    if (allData?.data?.sessionDetail?.length) {
      setFirst(allData.data.sessionDetail.map((i) => i.sessionId));
    }

    if (allData?.data?.userDetail?.length) {
      setThirdUserid(allData.data.userDetail.map((i) => i.userId));
    }
  }, [data]);

  return (
    <>
      {contextHolder} {/* ✅ Render notification context holder */}
      <div className="main_live_section mr-10 list_supers admin-details-panel casino-pl-minus-panel">
        <div className="_match">
          <AppPageHeader
            icon={<BarChart3 size={20} strokeWidth={1.8} />}
            title={`Casino PandL Detail: ${date}`}
            subtitle="Select users and game sessions to view profit and loss"
            actions={<button onClick={handleShowBtn}>Show</button>}
            onBack={handleBackClick}
          />

          <div className="table_section plus_minus_page">
            <Row className="de_table" gutter={[32]}>
              <Col lg={12} xs={24}>
                <Table
                  className="session_table"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setThirdUserid(selectedRows.map((i) => i.userId));
                    },
                    selectedRowKeys: thirdUserid,
                  }}
                  rowKey="userId"
                  bordered
                  columns={clintColumns}
                  pagination={false}
                  dataSource={data?.data?.userDetail ?? []}
                />
              </Col>
              <Col lg={12} xs={24}>
                <Table
                  className="session_table table1"
                  rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setFirst(selectedRows.map((i) => i.sessionId));
                    },
                    selectedRowKeys: first,
                  }}
                  rowKey="sessionId"
                  bordered
                  columns={column}
                  pagination={false}
                  dataSource={data?.data?.sessionDetail ?? []}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoPLMinus;
