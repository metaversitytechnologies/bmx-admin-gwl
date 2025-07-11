import { useEffect, useRef, useState } from "react";
import { Button, Divider, Dropdown, Form, Input, Menu, Pagination, Space, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import { SearchOutlined, CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import ModalsData from "../pages/supermaster/listsuper/ModalsData/ModalsData";

import moment from "moment";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { useSuperuserListMutation, useUpDateStatusMutation } from "../../store/service/supermasteAccountStatementServices";
import { usePartnershipMutation } from "../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../App";
import { SlEye } from "react-icons/sl";

const routeFromUSerType = {
  4: "/user-list/Super/3",
  3: "/user-list/Agent/2",
  2: "/user-list/Client/1",
};

const UserListTable = ({ userType, Listname, setParentUserIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [currentUserBalance, setCurrentUserBalance] = useState(0);
  const [currentParentUserId, setCurrentParentUserId] = useState(null);
  const [selectedUserIdForActions, setSelectedUserIdForActions] =
    useState(null);
  const [paginationTotal, setPaginationTotal] = useState(10);
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIdForPartnership, setUserIdForPartnership] = useState("");

  const [isBetLocked, setIsBetLocked] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openResetPassModal, setOpenResetPassModal] = useState(false);
  const [clientUserType, setClientUserType] = useState(""); // Renamed for clarity

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { parentId: parentIdFromParams } = useParams();
  const myElementRef = useRef(null);

  const localUserId = localStorage.getItem("userId");
  const localUserType = localStorage.getItem("userType");

  // API Hooks
  const [ getSuperuserList, { data: superuserListData, isLoading, isFetching }] = useSuperuserListMutation();
  const [updateStatus, { data: updateStatusResult, error: updateStatusError }] = useUpDateStatusMutation();
  const [ getPartnershipData, { data: partnershipDetail, isLoading: loadingPartnership }] = usePartnershipMutation();

  // --- Handlers for Modals and Dropdowns ---

  const handleShowPartnershipModal = (userId) => {
    setUserIdForPartnership(userId);
    getPartnershipData({ userId });
    setIsModalOpen(true);
  };

  const handleClosePartnershipModal = () => {
    setIsModalOpen(false);
    resetDropdownStates();
  };

  const handleShowWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
    resetDropdownStates();
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    resetDropdownStates();
  };

  const handleShowDepositModal = () => {
    setIsDepositModalOpen(true);
    resetDropdownStates();
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
    resetDropdownStates();
  };

  const handleToggleAccountStatus = (res) => {
    // updateStatus({ userId: res?.userId, isLock: res?.isActive });
  };

  const handleBlockBetting = (res) => {
    // updateStatus({ userId: res?.userId, isLock: res?.isActive });
  };

  const handleBlockCasino = () => {
    resetDropdownStates();
    // Logic for blocking casino, potentially open a CasinoLockModals
    // setCasinoLockModals(true);
  };

  const handleUpdateLimits = () => {
    resetDropdownStates();
    navigate(`/client/limitplusminus-super/${selectedUserIdForActions}`, {
      state: clientUserType,
    });
  };

  const handleEditUserData = (userId, active, userName, balance) => {
    setSelectedUserIdForActions(userId);
    setActiveStatus(active);
    setCurrentUserBalance(balance);
    setCurrentUserName(userName);
  };

  const handleParentIdChange = (
    id,
    balance,
    userId,
    parentUserID,
    betStatus,
    accountStatus,
    userType
  ) => {
    setCurrentParentUserId(id);
    setCurrentUserBalance(balance);
    setSelectedUserIdForActions(userId);
    setParentUserIds(parentUserID);
    setIsBetLocked(betStatus);
    setIsAccountLocked(accountStatus);
    setClientUserType(userType);
  };

  // State for managing individual dropdown visibility
  const [dropdownOpenStates, setDropdownOpenStates] = useState([]);

  const resetDropdownStates = () => {
    const updatedDropdownStates = dropdownOpenStates.map(() => false);
    setDropdownOpenStates(updatedDropdownStates);
    setIsOverlayOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownOpenStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownOpenStates(updatedDropdownStates);
    setIsOverlayOpen(updatedDropdownStates[index]); 
  };

  const handleScroll = () => {
    resetDropdownStates();
  };

  // --- Effects ---

  useEffect(() => {
    if (partnershipDetail?.data) {
      setPartnershipDetails(partnershipDetail.data);
    }
  }, [partnershipDetail?.data]);

  useEffect(() => {
    if (updateStatusError?.status === 400) {
      openNotificationError(updateStatusError?.data?.message);
    }
  }, [updateStatusError]);

  useEffect(() => {
    getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: "",
    });
  }, [
    parentIdFromParams,
    userType,
    paginationTotal,
    indexData,
    getSuperuserList,
  ]);

  useEffect(() => {
    if (updateStatusResult?.status) {
      openNotification(updateStatusResult?.message);
      getSuperuserList({
        userType: userType,
        parentId: parentIdFromParams || "",
        noOfRecords: paginationTotal,
        index: indexData,
        userToSearch: "",
      });
    }
  }, [updateStatusResult?.status, updateStatusResult?.message]);

  useEffect(() => {
    // Initialize dropdown states based on the number of users
    if (superuserListData?.data?.userListV2) {
      setDropdownOpenStates(
        new Array(superuserListData.data.userListV2.length).fill(false)
      );
    }
  }, [superuserListData?.data?.userListV2]);

  useEffect(() => {
    const element = myElementRef.current;
    if (element) {
      window.addEventListener("scroll", handleScroll);
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        window.removeEventListener("scroll", handleScroll);
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // --- Form Submission ---

  const onSearchFinish = (values) => {
    getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || null,
      noOfRecords: paginationTotal,
      index: indexData,
      userId: values?.username,
    });
    
  };

  // --- Dropdown Menu Items ---
  const getActionMenuItems = (res) => [
    {
      label: <div onClick={handleShowDepositModal}>Deposit</div>,
      key: "0",
    },
    {
      label: <div onClick={handleShowWithdrawModal}>Withdraw</div>,
      key: "1",
    },
    {
      label: (
        <div onClick={() => handleToggleAccountStatus(res)}>
          {res?.isActive ? "InActive" : "Active"}
        </div>
      ),
      key: "2",
    },
    {
      label: <div onClick={handleBlockBetting(res)}>Block Betting</div>,
      key: "3",
    },
    {
      label: <div onClick={handleBlockCasino}>Block Casino</div>,
      key: "4",
    },
    {
      label: (
        <Link
          style={{ fontWeight: 700 }}
          onClick={resetDropdownStates}
          to={`${Listname === "Master"
              ? `/client/update-super/${res?.userId}`
              : Listname === "Super"
                ? `/client/update-agent/${res?.userId}`
                : Listname === "Agent"
                  ? `/client/update-dealer/${res?.userId}`
                  : `/client/update-client/${res?.userId}`
            }`}>
          Edit
        </Link>
      ),
      key: "5",
    },
    {
      label: (
        <Link style={{ fontWeight: 700 }} onClick={resetDropdownStates} to={`/account-statement/${res?.userId}`}>
          Statement
        </Link>
      ),
      key: "6",
    },
    {
      label: (
        <Link style={{ fontWeight: 700 }} onClick={resetDropdownStates} to={`/client/account-operations/${res?.userId}`}>
          Account Operations
        </Link>
      ),
      key: "7",
    },
    {
      label: (
        <Link style={{ fontWeight: 700 }} onClick={resetDropdownStates} to={`/client/login-report/${res?.userId}`}>
          Login Report
        </Link>
      ),
      key: "8",
    },
    {
      label: (
        <Link onClick={resetDropdownStates} className={userType === "1" ? "d_none" : ""} to={`${routeFromUSerType[userType]}/${res?.userId}`}>
          Downline
        </Link>
      ),
      key: "9",
    },
    {
      label: (
        <Link
          onClick={() => {
            setOpenResetPassModal(!openResetPassModal);
            resetDropdownStates();
          }}
          to="#">
          Reset Password
        </Link>
      ),
      key: "10",
    },
  ];

  return (
    <>
      {isOverlayOpen && <div className="overlay_layout"></div>}
      <div>
        {showSearchDropdown && (<div className="over_view" onClick={() => setShowSearchDropdown(false)}></div>)}
        <div className="sport_detail m-0 ant-spin-nested-loading">
          <div
            ref={myElementRef}
            className="table_section statement_tabs_data ant-spin-nested-loading"
            style={{
              overflow: `${isLoading || isFetching ? "hidden" : "scroll"}`,
            }}>
            {(isLoading || isFetching) && (
              <div className="spin_icon user_spin">
                <Spin size="large" />
              </div>
            )}
            <table className={`live_table ${parentIdFromParams && "mt-0"}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>
                    <div className="main_search_droup" style={{position:"relative"}}>
                      <p>Code</p>
                      {showSearchDropdown && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={form}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onSearchFinish}
                            autoComplete="off">
                            <Form.Item name="username"><Input /></Form.Item>
                            <div className="agent_search_deatil">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{
                                    width: "86px",
                                    marginRight: "8px",
                                  }}>
                                  <SearchOutlined /> Search
                                </Button>
                              </Form.Item>
                              <Form.Item>
                                <Button
                                  onClick={() => form.resetFields()}
                                  className="ant_reset_btn"
                                  style={{ width: "86px" }}>
                                  Reset
                                </Button>
                              </Form.Item>
                            </div>
                          </Form>
                        </Menu>
                      )}
                      <p className="search_code">
                        <Space>
                          <SearchOutlined
                            onClick={() =>
                              setShowSearchDropdown(!showSearchDropdown)
                            }
                          />
                        </Space>
                      </p>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>
                    {localUserType == 5
                      ? "Sub Admin"
                      : localUserType == 0
                        ? "Master"
                        : localUserType == 1
                          ? "Super"
                          : localUserType == 2
                            ? "Agent"
                            : ""}
                  </th>
                  <th>Contact</th>
                  <th>D.O.J </th>
                  <th>Share%</th>
                  <th>PWD</th>
                  <th colSpan={3} className="text-center">
                    {Listname} Comm %
                  </th>
                  <th className="text-right">C.Chips</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {superuserListData?.data?.userListV2?.map((res, id) => (
                  <tr key={id}>
                    <td>
                      <div
                        onClick={() => handleShowPartnershipModal(res?.userId)}
                        className="plus_btn">
                        <PlusOutlined />
                      </div>
                    </td>
                    <td
                      onClick={() =>
                        handleParentIdChange(
                          res?.id,
                          res?.availablebalance,
                          res?.userid,
                          res?.parent,
                          res?.betlock,
                          res?.accountlock,
                          res?.usertype
                        )
                      }>
                      <Dropdown
                        className="droup_menu"
                        open={dropdownOpenStates[id]}
                        onOpenChange={() => toggleDropdown(id)}
                        menu={{
                          items: getActionMenuItems(res),
                          className: "menu_data",
                        }}
                        trigger={["click", "contextMenu"]}>
                        <div
                          className="droup_link"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleEditUserData(
                              res?.userid,
                              res?.active,
                              res?.username,
                              res?.availablebalance
                            )
                          }>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </div>
                      </Dropdown>
                    </td>
                    <td>{res?.userId}</td>
                    <td>
                      <span className="gx-text-blue gx-pointer gx-text-nowrap">
                        <SlEye /> {res?.userName}
                      </span>
                    </td>
                    <td>{res?.parentId}</td>
                    <td>{res?.contact}</td>
                    <td>{moment(res?.createdOn).format("YYYY-MM-DD")}</td>
                    <td>{res?.partnerShip}</td>
                    <td>*******</td>
                    <td>
                      {res?.matchCommission === 0 &&
                        res?.sessionCommission === 0
                        ? "NOC"
                        : "bbb"}
                    </td>
                    <td>{Number(res?.matchCommission)?.toFixed(2)}</td>
                    <td>{Number(res?.sessionCommission)?.toFixed(2)}</td>
                    <td className="text-right">{res?.balance?.toFixed()}</td>
                    <td>{res?.isActive ? "Active" : "InActive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Divider />
          <div className="pagination_cus">
            <Pagination
              className="pagination_main ledger_pagination"
              onShowSizeChange={(c, s) => setPaginationTotal(s)}
              total={
                superuserListData?.data?.totalPages &&
                superuserListData.data.totalPages * paginationTotal
              }
              defaultPageSize={10}
              pageSizeOptions={[10, 50, 100, 150, 200, 250]}
              onChange={(e) => setIndexData(e - 1)}
            />
          </div>

          <ModalsData
            loading={loadingPartnership}
            partnershipDetails={partnershipDetails}
            isModalOpen={isModalOpen}
            handleCancel={handleClosePartnershipModal}
            userIds={userIdForPartnership}
          />
        </div>

        <Deposit
          handleClose={handleCloseDepositModal}
          data={selectedUserIdForActions}
          userIdData={selectedUserIdForActions}
          isDepositeModalOpen={isDepositModalOpen}
          handleDepositeOk={handleCloseDepositModal}
          handleDepositeCancel={handleCloseDepositModal}
        />

        <Withdraw
          userIdData={selectedUserIdForActions}
          handleClose={handleCloseWithdrawModal}
          data={selectedUserIdForActions}
          WithdrawnModal={isWithdrawModalOpen}
          handleDepositeOk={handleCloseWithdrawModal}
          handleDepositeCancel={handleCloseWithdrawModal}
        />

        <ResetPassword
          isDepositeModalOpen={openResetPassModal} // This prop name seems mismatched (Deposit vs. ResetPassword)
          setOpenResetPass={setOpenResetPassModal}
        />
        {/* BetlockModal and CasinoLockModals would be rendered here if needed */}
        {/* <BetlockModal /> */}
        {/* <CasinoLockModals /> */}
      </div>
    </>
  );
};

export default UserListTable;
