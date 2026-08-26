import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import SportsDetailsHeader from "./SportsDetailsHeader";
import SportsDateFilter from "./SportsDateFilter";
import SportsDesktopTable from "./SportsDesktopTable";
import SportsMobileList from "./SportsMobileList";
import SportsPagination from "./SportsPagination";

const SportsDetails = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [, setDateData] = useState([timeBefore, time]);
  const [dataNameee, setDataNameee] = useState("");
  const [dropdownStates, setDropdownStates] = useState([]);
  const [activeTabData] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const nav = useNavigate();

  const {
    data: sportDetail,
    isLoading,
    isFetching,
  } = useActiveMatchQuery(activeTabData);

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/1`, { state: { dataNameee } });
  };

  const handleBackbtn = () => {
    nav(-1);
  };

  const onChange = (_, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    const initialStates = new Array(sportDetail?.data?.length || 0).fill(false);
    setDropdownStates(initialStates);
    setCurrentPage(1);
  }, [sportDetail]);

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates].map((_, i) =>
      i === index ? !dropdownStates[i] : false
    );
    setDropdownStates(updatedDropdownStates);
  };

  const closeAllDropdowns = () => {
    setDropdownStates(false);
  };

  const matches = sportDetail?.data || [];
  const total = matches.length;
  const pagedRows = matches
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    .map((match, localIndex) => ({
      match,
      globalIndex: (currentPage - 1) * pageSize + localIndex,
    }));

  return (
    <div className="main_live_section list_supers admin-details-panel sports-details-panel">
      <div className="_match">
        <SportsDetailsHeader onBack={handleBackbtn} />
      </div>
      <div className="table_section sport_detail m-0 admin-details-table-shell sports-details-table-shell">
        <SportsDateFilter
          defaultValue={[dayjs(timeBefore), dayjs(time)]}
          onChange={onChange}
        />

        <div style={{ position: "relative" }}>
          {(isFetching || isLoading) && <CustomLoading />}
          <SportsDesktopTable
            rows={pagedRows}
            dropdownStates={dropdownStates}
            toggleDropdown={toggleDropdown}
            closeAllDropdowns={closeAllDropdowns}
            onSelectMatch={setDataNameee}
            onPlusMinus={handlePlusMinus}
            onNavigate={nav}
          />
          <SportsMobileList
            rows={pagedRows}
            dropdownStates={dropdownStates}
            toggleDropdown={toggleDropdown}
            closeAllDropdowns={closeAllDropdowns}
            onSelectMatch={setDataNameee}
            onPlusMinus={handlePlusMinus}
            onNavigate={nav}
          />
        </div>

        <SportsPagination
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default SportsDetails;
