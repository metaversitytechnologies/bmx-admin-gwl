import { Button, Pagination, Select, Table } from "antd";
import {
  CalendarDays,
  ChartColumn,
  ChevronDown,
  FileText,
  RefreshCcw,
} from "lucide-react";

const SettingTable = () => {
  const dataSource = [];
  const totalEntries = dataSource.length;

  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Sport",
      dataIndex: "Sport",
      key: "Sport",
    },
    {
      title: "Open Date",
      dataIndex: "OpenDate",
      key: "OpenDate",
    },
    {
      title: "Declared",
      dataIndex: "Declared",
      key: "Declared",
    },
    {
      title: "Won By",
      dataIndex: "Won By",
      key: "debit",
    },
    {
      title: "Profit/Loss",
      dataIndex: "Profit",
      key: "Profit",
      render: (value) => {
        if (value === undefined || value === null || value === "") return value;
        const numericValue = Number(value);
        const tone = numericValue >= 0 ? "is-profit" : "is-loss";

        return <span className={`settings-report-profit ${tone}`}>{value}</span>;
      },
    },
  ];

  return (
    <section className="settings-report-card">
      <header className="settings-report-header">
        <div className="settings-report-title">
          <span>
            <ChartColumn size={18} strokeWidth={2} />
          </span>
          <div>
            <h2>Report Overview</h2>
            <p>View and download all system reports</p>
          </div>
        </div>

        <Button className="settings-report-date" htmlType="button">
          <CalendarDays size={15} strokeWidth={2} />
          <span>Date Range</span>
          <ChevronDown size={15} strokeWidth={2} />
        </Button>
      </header>

      <div className="settings-report-table-wrap">
        
        <Table
          className="setting_table settings-report-table"
          rowClassName="c_pointer"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
          locale={{
            emptyText: (
              <div className="settings-report-empty">
                <span className="settings-report-empty-icon">
                  <FileText size={42} strokeWidth={1.4} />
                </span>
                <strong>No reports found</strong>
                <p>There are no reports available for the selected filters.</p>
                <Button
                  className="approved-primary-button settings-report-refresh"
                  icon={<RefreshCcw size={15} strokeWidth={2} />}>
                  Refresh
                </Button>
              </div>
            ),
          }}
        />
      </div>

      <footer className="settings-report-pagination">
        <p>
          Showing <strong>{totalEntries ? 1 : 0}</strong> to{" "}
          <strong>{Math.min(10, totalEntries)}</strong> of{" "}
          <strong>{totalEntries}</strong> entries
        </p>
        <div className="settings-report-pagination-controls">
          <Select
            value="10"
            suffixIcon={<ChevronDown size={15} strokeWidth={2} />}
            options={[{ value: "10", label: "10 / page" }]}
          />
          <Pagination
            current={1}
            total={Math.max(totalEntries, 1)}
            pageSize={10}
            showSizeChanger={false}
          />
        </div>
      </footer>
    </section>
  );
};

export default SettingTable;
