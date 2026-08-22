import { Form } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useLazyDepositAndWithdrawQuery,
  useSuperuserListMutation,
} from "../../../../store/service/supermasteAccountStatementServices";
import { convertCodeReverse } from "../../../../store/constant";
import { openNotification, openNotificationError } from "../../../../App";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
// import LimitStats from "./LimitStats";
import LimitToolbar from "./LimitToolbar";
import LimitTable from "./LimitTable";
import LimitMobileList from "./LimitMobileList";
import TablePagination from "./TablePagination";

const AddSuperLimites = () => {
  const [searchForm] = Form.useForm();
  const { id } = useParams();

  const [userToSearch, setUserToSearch] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [getSuperuserList, { isLoading, isFetching }] =
    useSuperuserListMutation();
  const [triggerDeposit] = useLazyDepositAndWithdrawQuery();

  const [userDetailsData, setUserDetailsData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    currentPage: 0,
  });
  const [actionState, setActionState] = useState(null);

  const fetchData = async (searchValue = userToSearch) => {
    const res = await getSuperuserList({
      userType: id,
      parentId: "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: convertCodeReverse(searchValue) || "",
    }).unwrap();
    if (res?.status) {
      setUserDetailsData(res?.data?.userListV2 || []);
      setPaginationInfo({
        totalPages: res?.data?.totalPages || 1,
        currentPage: res?.data?.currentPage || 0,
      });
    } else {
      setUserDetailsData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, indexData, paginationTotal, userToSearch]);

  const handleInputChange = (userId, value) => {
    setInputValues((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const handleLimitAction = (user, isAdd) => {
    const amount = Number(inputValues[user.userId]);
    if (!amount || amount <= 0) {
      openNotificationError("Enter valid amount");
      return;
    }

    const payload = {
      userId: user.userId,
      limit: amount,
      limitPlus: isAdd,
      limitInCash: false,
    };

    setActionState({ userId: user.userId, type: isAdd ? "add" : "minus" });

    triggerDeposit(payload)
      .unwrap()
      .then((res) => {
        if (res?.status) {
          openNotification(
            `${isAdd ? "Added" : "Deducted"} ${amount} to ${user.userName}`
          );
          fetchData();
          setInputValues((prev) => ({ ...prev, [user.userId]: "" }));
        } else {
          openNotificationError(res?.message);
        }
      })
      .catch(() => {
        openNotificationError("Transaction failed");
      })
      .finally(() => {
        setActionState(null);
      });
  };

  const onSearchFinish = (values) => {
    setUserToSearch(values?.username?.trim() || "");
    setIndexData(0);
  };

  const handleResetData = () => {
    searchForm.resetFields();
    setUserToSearch("");
    setIndexData(0);
  };

  // const totalAdmins = (paginationInfo.totalPages || 1) * paginationTotal;
  // const totalChips = (userDetailsData || []).reduce(
  //   (sum, user) =>
  //     sum + (Number(user?.balance) || 0) + (Number(user?.balanceWithPnl) || 0),
  //   0
  // );

  const visibleCount = userDetailsData?.length || 0;
  const firstEntry = visibleCount
    ? paginationInfo.currentPage * paginationTotal + 1
    : 0;
  const lastEntry = paginationInfo.currentPage * paginationTotal + visibleCount;
  const totalEntries = paginationInfo.totalPages * paginationTotal;

  return (
    <>
      {/* <LimitStats totalAdmins={totalAdmins} totalChips={totalChips} /> */}

      <LimitToolbar
        form={searchForm}
        onSearch={onSearchFinish}
        onClear={handleResetData}
      />

      <div
        className="update-limit-table-shell"
        style={{ position: "relative" }}
        aria-busy={isLoading || isFetching}>
        {(isLoading || isFetching) && <CustomLoading />}
        <LimitTable
          data={userDetailsData}
          inputValues={inputValues}
          onInputChange={handleInputChange}
          onAction={handleLimitAction}
          actionState={actionState}
        />
        <LimitMobileList
          data={userDetailsData}
          inputValues={inputValues}
          onInputChange={handleInputChange}
          onAction={handleLimitAction}
          actionState={actionState}
        />
      </div>

      <TablePagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
        pageSize={paginationTotal}
        firstEntry={firstEntry}
        lastEntry={lastEntry}
        totalEntries={totalEntries}
        onPageChange={setIndexData}
        onPageSizeChange={(size) => {
          setPaginationTotal(size);
          setIndexData(0);
        }}
      />
    </>
  );
};

export default AddSuperLimites;
