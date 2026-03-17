import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Modal,
  Table,
  message,
} from "antd";
import { ReloadOutlined, TrophyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  useGetMatkaBetDetailsMutation,
  useGetMatkaPnlMutation,
} from "../../../store/service/MatkaServices";
import "./CompletedMatka.scss";

const { RangePicker } = DatePicker;

const CompletedMatka = () => {
  const nav = useNavigate();
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "days"),
    dayjs(),
  ]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMatka, setSelectedMatka] = useState(null);
  const [detailData, setDetailData] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const [getMatkaPnl] = useGetMatkaPnlMutation();
  const [getMatkaBetDetails] = useGetMatkaBetDetailsMutation();

  useEffect(() => {
    fetchMatkaPnl();
  }, []);

  const totalPnl = useMemo(
    () =>
      tableData.reduce((sum, item) => sum + Number(item?.pnl || 0), 0),
    [tableData]
  );

  const getPnlColorStyle = (value) => {
    if (value == null || value === undefined) return { color: "#000" };
    if (Number(value) > 0) return { color: "#2fb344" };
    if (Number(value) < 0) return { color: "#f03e3e" };
    return { color: "#000" };
  };

  const fetchMatkaPnl = async () => {
    if (!dateRange?.[0] || !dateRange?.[1]) {
      message.warning("Please select date range");
      return;
    }

    setLoading(true);
    try {
      const response = await getMatkaPnl({
        fromDate: dateRange[0].format("YYYY-MM-DD"),
        toDate: dateRange[1].format("YYYY-MM-DD"),
      }).unwrap();

      if (response?.status && Array.isArray(response?.data)) {
        const filteredData = response.data.filter(
          (item) => item?.eventName !== item?.date
        );
        setTableData(filteredData);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching Matka P/L:", error);
      message.error("Failed to fetch Matka P/L data");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMatkaNameClick = async (record) => {
    setSelectedMatka(record);
    setDetailModalVisible(true);
    setDetailLoading(true);

    try {
      const response = await getMatkaBetDetails({
        matkaName: record?.eventName,
        date: dayjs(record?.date).format("DD-MM-YYYY"),
      }).unwrap();

      if (response?.status && Array.isArray(response?.data)) {
        setDetailData(response.data);
      } else {
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching matka bet details:", error);
      message.error("Failed to fetch bet details");
      setDetailData([]);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setDetailModalVisible(false);
    setSelectedMatka(null);
    setDetailData([]);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (name, record) => (
        <button
          type="button"
          className="completed-matka__name-button"
          onClick={() => handleMatkaNameClick(record)}>
          {name || "-"}-(
          {record?.date ? dayjs(record.date).format("DD-MM-YYYY") : "-"})
        </button>
      ),
    },
    {
      title: "Winner",
      dataIndex: "casinoId",
      key: "casinoId",
      render: (winner) =>
        winner ? (
          <span className="completed-matka__winner">
            <TrophyOutlined />
            <span>{winner}</span>
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "My Share P/L",
      dataIndex: "pnl",
      key: "mySharePnl",
      render: (pnl) => (
        <span className="completed-matka__pnl" style={getPnlColorStyle(pnl)}>
          {pnl != null ? Number(pnl).toFixed(2) : "-"}
        </span>
      ),
    },
    {
      title: "Total P/L",
      dataIndex: "pnl",
      key: "totalPnl",
      render: (pnl) => (
        <span className="completed-matka__pnl" style={getPnlColorStyle(pnl)}>
          {pnl != null ? Number(pnl).toFixed(2) : "-"}
        </span>
      ),
    },
  ];

  const detailColumns = [
    {
      title: "Sr.",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Matka Name",
      dataIndex: "matkaName",
      key: "matkaName",
      render: (text) => text || "-",
    },
    {
      title: "Client Name",
      dataIndex: "userId",
      key: "userId",
      render: (text) => text || "-",
    },
    {
      title: "Game Type",
      dataIndex: "marketName",
      key: "marketName",
      render: (text) => text || "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (amount != null ? amount : "-"),
    },
    {
      title: "Market Type",
      dataIndex: "back",
      key: "back",
      render: (back) => (back != null ? (back ? "Back" : "Lay") : "-"),
    },
    {
      title: "Bet Number",
      dataIndex: "nation",
      key: "nation",
      render: (nation) => (nation != null ? nation : "-"),
    },
    {
      title: "Result",
      dataIndex: "declared",
      key: "declared",
      render: (declared) => (declared && declared !== "null" ? declared : "-"),
    },
    {
      title: "P&L",
      dataIndex: "netPnl",
      key: "netPnl",
      render: (netPnl) => (
        <span className="completed-matka__pnl" style={getPnlColorStyle(netPnl)}>
          {netPnl != null ? Number(netPnl).toFixed(2) : "-"}
        </span>
      ),
    },
    {
      title: "Created",
      dataIndex: "betTime",
      key: "betTime",
      render: (betTime) =>
        betTime ? dayjs(betTime).format("DD-MM-YYYY HH:mm:ss") : "-",
    },
  ];

  return (
    <div className="completed-matka">
      <Card
        className="sport_detail completed-matka__card"
        title="COMPLETED MATKA"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div className="completed-matka__toolbar">
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            format="DD-MM-YYYY"
            className="completed-matka__range"
            allowClear={false}
          />
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchMatkaPnl}
            loading={loading}>
            Refresh
          </Button>
        </div>

        <div className="completed-matka__summary">
          <span className="completed-matka__summary-label">P/L</span>
          <span
            className={`completed-matka__summary-value ${
              totalPnl >= 0 ? "is-profit" : "is-loss"
            }`}>
            {totalPnl.toFixed(2)}
          </span>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={loading}
            rowKey={(record) =>
              `${record?.eventName}-${record?.date}-${record?.casinoId || "null"}`
            }
            pagination={{
              pageSize: 50,
              showTotal: (total) => `Total ${total} records`,
            }}
            locale={{ emptyText: "No Matka P/L data found" }}
          />
        </div>
      </Card>

      <Modal
        title={
          <div className="completed-matka__modal-title">
            {selectedMatka?.eventName || "Matka"}-
            ({dayjs(selectedMatka?.date).format("DD-MM-YYYY")})
          </div>
        }
        open={detailModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        className="completed-matka__modal">
        <Table
          columns={detailColumns}
          dataSource={detailData}
          loading={detailLoading}
          rowKey={(record) =>
            `${record?.marketId}-${record?.betTime}-${record?.userId}`
          }
          pagination={false}
          locale={{ emptyText: "Not found" }}
          bordered
          scroll={{ x: 1000 }}
        />
      </Modal>
    </div>
  );
};

export default CompletedMatka;
