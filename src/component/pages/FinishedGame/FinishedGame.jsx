import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { Trophy } from "lucide-react";
import { useGetCompletedSportQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";
import FinishedGameFilters from "./FinishedGameFilters";
import FinishedGameDesktopTable from "./FinishedGameDesktopTable";
import FinishedGameMobileList from "./FinishedGameMobileList";
import FinishedGamePagination from "./FinishedGamePagination";
import FinishedGameError from "./FinishedGameError";

const FinishedGame = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [, setDateData] = useState([timeBefore, time]);
  const [dataNameee, setDataNameee] = useState("");
  const [dropdownStates, setDropdownStates] = useState([]);

  const [indexData, setIndexData] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(50);

  const nav = useNavigate();

  const {
    data,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useGetCompletedSportQuery({
    index: indexData,
    noOfRecords: 100,
  });

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/0`, { state: { dataNameee } });
  };

  const handleBackbtn = () => {
    nav(-1);
  };

  const onChange = (_, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    const initialStates = new Array(
      data?.data?.completedMatchList?.length || 0
    ).fill(false);
    setDropdownStates(initialStates);
  }, [data]);

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates].map((_, i) =>
      i === index ? !dropdownStates[i] : false
    );
    setDropdownStates(updatedDropdownStates);
  };

  const closeAllDropdowns = () => {
    setDropdownStates(false);
  };

  const matches = data?.data?.completedMatchList || [];
  const rows = matches.map((match, globalIndex) => ({ match, globalIndex }));
  const total = (data?.data?.totalPages || 0) * paginationTotal;

  return (
    <div className="main_live_section list_supers admin-details-panel finished-game-panel">
      <div className="_match">
        <AppPageHeader
          icon={<Trophy size={20} strokeWidth={1.8} />}
          title="Completed Games Detail"
          subtitle="Review completed fixtures, results and profit/loss"
          onBack={handleBackbtn}
        />
      </div>
      <div className="table_section sport_detail m-0 admin-details-table-shell finished-game-table-shell">
        <FinishedGameFilters
          defaultValue={[dayjs(timeBefore), dayjs(time)]}
          onDateChange={onChange}
          recordCount={matches.length}
        />

        {isError ? (
          <FinishedGameError onRetry={refetch} />
        ) : (
          <>
            <div style={{ position: "relative" }}>
              {(isFetching || isLoading) && <CustomLoading />}
              <FinishedGameDesktopTable
                rows={rows}
                dropdownStates={dropdownStates}
                toggleDropdown={toggleDropdown}
                closeAllDropdowns={closeAllDropdowns}
                onSelectMatch={setDataNameee}
                onPlusMinus={handlePlusMinus}
                onNavigate={nav}
              />
              <FinishedGameMobileList
                rows={rows}
                dropdownStates={dropdownStates}
                toggleDropdown={toggleDropdown}
                closeAllDropdowns={closeAllDropdowns}
                onSelectMatch={setDataNameee}
                onPlusMinus={handlePlusMinus}
                onNavigate={nav}
              />
            </div>

            <FinishedGamePagination
              currentPage={indexData + 1}
              pageSize={paginationTotal}
              total={total}
              onPageChange={(page) => setIndexData(page - 1)}
              onPageSizeChange={setPaginationTotal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FinishedGame;
