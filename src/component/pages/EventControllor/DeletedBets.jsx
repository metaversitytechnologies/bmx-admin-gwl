import {
  Card,
  Empty,
  Input,
  Row,
  Pagination,
  Dropdown,
  Space,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { CalendarDays, ChevronDown, Search, Trash2 } from "lucide-react";
import { useGetDeletedMatchesQuery } from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const DeletedBets = () => {
  const nav = useNavigate();

  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(50); // default show 50
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sportDetail } = useGetDeletedMatchesQuery({});

  // ✅ Handle page change
  const handlePageChange = (page, size) => {
    setPageIndex(page - 1); // antd gives 1-based, convert to 0-based
    setPageSize(size);
  };

  // ✅ Slice data on PF side
  const data = sportDetail?.data || [];
  const filteredData = data.filter((match) =>
    (match?.matchName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const getActionMenuItems = (res) => [
    {
      label: (
        <div>
          <Link to={`/delete-session/${res?.matchId}`}>Session Bets</Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div>
          <Link to={`/delete-match/${res?.matchId}`}>Match Bets</Link>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <div className="main_live_section list_supers admin-details-panel deleted-bets-panel">
      <AppPageHeader
        icon={<Trash2 size={20} strokeWidth={1.8} />}
        title="Delete Bets"
        subtitle="Review deleted matches and manage bet removal"
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail deleted-bets-card">
      <div className="deleted-bets-toolbar">
        <Input
          className="deleted-bets-search"
          allowClear
          prefix={<Search size={17} strokeWidth={1.9} />}
          placeholder="Search matches..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPageIndex(0);
          }}
        />
      </div>

      <div className="deleted-bets-mobile-hint">
        ← Swipe to view all columns →
      </div>
      <div className="table_section deleted-bets-table-viewport">
        <table className="ant-spin-nested-loading deleted-bets-table">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>#</th>
              <th className="deleted-bets-name-column">Name</th>
              <th>Date</th>
              <th>Match ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td className="deleted-bets-serial">
                    {id + 1 + pageIndex * pageSize}
                  </td>
                  <td className="deleted-bets-menu-cell">
                    <Dropdown
                      menu={{
                        items: getActionMenuItems(res),
                        className: "menu_data deleted-bets-menu",
                      }}
                      trigger={["click", "contextMenu"]}
                    >
                      <button
                        className="droup_link deleted-bets-dropdown-trigger"
                        type="button"
                        onClick={(event) => event.preventDefault()}
                      >
                        <Space>
                          <ChevronDown size={17} strokeWidth={2.1} />
                        </Space>
                      </button>
                    </Dropdown>
                  </td>
                  <td className="deleted-bets-name-column deleted-bets-name">
                    <span title={res?.matchName}>{res?.matchName}</span>
                  </td>
                  <td className="deleted-bets-date">
                    <span className="deleted-bets-date-icon" aria-hidden="true">
                      <CalendarDays size={15} strokeWidth={2} />
                    </span>
                    <span>{moment(res.openDate).format("DD-MM-YYYY HH:mm:ss")}</span>
                  </td>
                  <td className="deleted-bets-match-id">{res?.matchId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No deleted matches available"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ PF-Side Pagination Section */}
      {filteredData.length > 0 && (
        <Row className="deleted-bets-pagination" justify="end">
          <Pagination
            current={pageIndex + 1} // antd is 1-based
            pageSize={pageSize}
            total={filteredData.length}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["20", "50", "100", "150", "200", "250"]}
          />
        </Row>
      )}
    </Card>
    </div>
  );
};

export default DeletedBets;
