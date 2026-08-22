import { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  Pagination,
  Space,
} from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import { SearchOutlined } from "@ant-design/icons";
import { Columns3, Eye, MoreVertical, Plus, Search } from "lucide-react";
import PropTypes from "prop-types";
import ModalsData from "../pages/supermaster/listsuper/ModalsData/ModalsData";

import moment from "moment";
import Deposit from "./Deposit";
import {
  useGetUserActiveDeactiveMutation,
  useSuperuserListMutation,
  useUserBetLockMutation,
  useUserCasinoLockMutation,
} from "../../store/service/supermasteAccountStatementServices";
import {
  useGetGenerateMutation,
  usePartnershipMutation,
} from "../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../App";
import Exposure from "./Exposure";
import CustomLoading from "./CustomLoading/CustomLoading";
import { convertCode, convertCodeReverse, isNsg } from "../../store/constant";

const routeFromUSerType = {
  6: "/user-list/Mini-Admin/5",
  5: "/user-list/Master/4",
  4: "/user-list/Super/3",
  3: "/user-list/Agent/2",
  2: "/user-list/Client/1",
};

const routeDeadFromUSerType = {
  6: "/dead-user-list/Mini-Admin/5",
  5: "/dead-user-list/Master/4",
  4: "/dead-user-list/Super/3",
  3: "/dead-user-list/Agent/2",
  2: "/dead-user-list/Client/1",
};

const UserListTable = ({
  userType,
  Listname,
  setParentUserIds,
  forDeadClient,
  actionSlot,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedUserIdForActions, setSelectedUserIdForActions] =
    useState(null);
  const [paginationTotal, setPaginationTotal] = useState(25);
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIdForPartnership, setUserIdForPartnership] = useState("");
  const [depositData, setDepositData] = useState({});

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openResetPassModal, setOpenResetPassModal] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const [userToSearch, setUserToSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState(null);
  const [codeForm] = Form.useForm();
  const [nameForm] = Form.useForm();
  const [toolbarForm] = Form.useForm();
  const { parentId: parentIdFromParams, userTyep } = useParams();
  const myElementRef = useRef(null);
  const codeRef = useRef(null);
  const nameRef = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    // Reset search value
    setUserToSearch("");

    // Reset both search forms
    codeForm.resetFields();
    nameForm.resetFields();
    toolbarForm.resetFields();

    setActiveSearch(null);
    setShowSearchDropdown(false);
  }, [pathname, codeForm, nameForm, toolbarForm]);

  const [getSuperuserList, { data: superuserListData, isLoading, isFetching }] =
    useSuperuserListMutation();
  const [getBetLock] = useUserBetLockMutation();
  const [getUserActiveDeactive] = useGetUserActiveDeactiveMutation();
  const [getCasinoLock] = useUserCasinoLockMutation();
  const [
    getPartnershipData,
    { data: partnershipDetail, isLoading: loadingPartnership },
  ] = usePartnershipMutation();

  const [userDetailsData, setUserDetailsData] = useState();
  const fetchData = async (userId) => {
    const res = await getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: convertCodeReverse(userToSearch) || userId,
      forDeadClient: forDeadClient,
    }).unwrap();
    if (res?.status) {
      setActiveSearch(null);
      setShowSearchDropdown(false);
      setUserDetailsData(res?.data?.userListV2);
    } else {
      setUserDetailsData([]);
    }
  };

  const handleShowPartnershipModal = (userId) => {
    setUserIdForPartnership(userId);
    getPartnershipData({ userId });
    setIsModalOpen(true);
  };

  const handleClosePartnershipModal = () => {
    setIsModalOpen(false);
    resetDropdownStates();
  };

  const handleShowDepositModal = (data, isDeposit) => {
    setIsDepositModalOpen(true);
    resetDropdownStates();
    setDepositData({ ...data, isDeposit });
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
    resetDropdownStates();
  };

  const handleToggleAccountStatus = async (res) => {
    const result = await getUserActiveDeactive({
      activate: !res?.isActive,
      userIdList: [res?.userId],
    }).unwrap();
    if (result?.status) {
      openNotification(result?.message);
      fetchData();
      resetDropdownStates();
    } else {
      openNotificationError(result?.message);
    }
  };

  const handleBlockBetting = async (res) => {
    const result = await getBetLock({
      userId: res?.userId,
      isLock: !res?.betLock,
    }).unwrap();
    if (result?.status) {
      openNotification(result?.message);
      fetchData();
      resetDropdownStates();
    } else {
      openNotificationError(result?.message);
    }
  };

  const handleBlockCasino = async (res) => {
    const result = await getCasinoLock({
      userId: res?.userId,
      isLock: !res?.casinoLock,
    }).unwrap();
    if (result?.status) {
      openNotification(result?.message);
      fetchData();
      resetDropdownStates();
    } else {
      openNotificationError(result?.message);
    }
  };

  const handleEditUserData = (userId) => {
    setSelectedUserIdForActions(userId);
  };

  const handleParentIdChange = (userId, parentUserID) => {
    setSelectedUserIdForActions(userId);
    setParentUserIds(parentUserID);
  };

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

  useEffect(() => {
    if (partnershipDetail?.data) {
      setPartnershipDetails(partnershipDetail.data);
    }
  }, [partnershipDetail?.data]);

  useEffect(() => {
    fetchData();
  }, [
    parentIdFromParams,
    userType,
    paginationTotal,
    indexData,
    userToSearch,
    forDeadClient,
  ]);

  useEffect(() => {
    if (userDetailsData) {
      setDropdownOpenStates(new Array(userDetailsData.length).fill(false));
    }
  }, [userDetailsData]);

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

  const totalPages = superuserListData?.data?.totalPages || 1;
  const currentPage = superuserListData?.data?.currentPage || 0;
  const totalAdmins = totalPages * paginationTotal;
  const visibleAdmins = userDetailsData?.length || 0;
  const firstEntry = visibleAdmins ? currentPage * paginationTotal + 1 : 0;
  const lastEntry = currentPage * paginationTotal + visibleAdmins;

  const onSearchFinish = (values) => {
    setUserToSearch(values?.username);
    fetchData(convertCodeReverse(values?.username));
  };

  const handleResetData = async () => {
    codeForm.resetFields();
    nameForm.resetFields();
    toolbarForm.resetFields();
    setUserToSearch();
    const res = await getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: "",
      forDeadClient: forDeadClient,
    }).unwrap();
    if (res?.status) {
      setActiveSearch(null);
      setShowSearchDropdown(false);
      setUserDetailsData(res?.data?.userListV2);
    } else {
      setUserDetailsData([]);
    }
  };

  const [resetPassword, { data: resetPassData }] = useGetGenerateMutation();

  const handleResetPass = (res) => {
    resetPassword();
    setUserId(res?.userId);
  };

  const getActionMenuItems = (res) => {
    const isDeadClient = forDeadClient;

    return [
      // Deposit
      !isDeadClient && {
        label: (
          <div onClick={() => handleShowDepositModal(res, true)}>Deposit</div>
        ),
        key: "0",
      },

      // Withdraw
      !isDeadClient && {
        label: (
          <div onClick={() => handleShowDepositModal(res, false)}>Withdraw</div>
        ),
        key: "1",
      },

      // Toggle Active/Inactive
      {
        label: (
          <div onClick={() => handleToggleAccountStatus(res)}>
            {res?.isActive ? "InActive" : "Active"}
          </div>
        ),
        key: "2",
      },

      // Block/Unblock Betting
      !isDeadClient && {
        label: (
          <div onClick={() => handleBlockBetting(res)}>
            {res?.betLock ? "UnBlock Betting" : "Block Betting"}
          </div>
        ),
        key: "3",
      },

      // Block/Unblock Casino
      !isDeadClient && {
        label: (
          <div onClick={() => handleBlockCasino(res)}>
            {res?.casinoLock ? "UnBlock Casino" : "Block Casino"}
          </div>
        ),
        key: "4",
      },

      // Edit Client
      !isDeadClient && {
        label: (
          <Link
            style={{ fontWeight: 700 }}
            onClick={resetDropdownStates}
            to={`/client/update-client/${userType}/${res?.userId}`}>
            Edit
          </Link>
        ),
        key: "5",
      },

      // Account Statement
      {
        label: (
          <Link
            style={{ fontWeight: 700 }}
            onClick={resetDropdownStates}
            to={`/account-statement/${res?.userId}`}>
            Statement
          </Link>
        ),
        key: "6",
      },

      // Account Operations
      {
        label: (
          <Link
            style={{ fontWeight: 700 }}
            onClick={resetDropdownStates}
            to={`/account-operation/${res?.userId}`}>
            Account Operations
          </Link>
        ),
        key: "7",
      },

      // Login Report
      {
        label: (
          <Link
            style={{ fontWeight: 700 }}
            onClick={resetDropdownStates}
            to={`/client/login-report/${res?.userId}`}>
            Login Report
          </Link>
        ),
        key: "8",
      },

      // Downline
      {
        label: (
          <Link
            onClick={resetDropdownStates}
            className={userType === "1" ? "d_none" : ""}
            to={`${
              forDeadClient
                ? routeDeadFromUSerType?.[userType]
                : routeFromUSerType[userType]
            }/${res?.userId}`}>
            Downline
          </Link>
        ),
        key: "9",
      },

      // Reset Password
      !isDeadClient && {
        label: (
          <Link
            onClick={() => {
              setOpenResetPassModal(!openResetPassModal);
              resetDropdownStates();
              handleResetPass(res);
            }}
            to="#">
            Reset Password
          </Link>
        ),
        key: "10",
      },
    ].filter(Boolean); // Remove any false/null entries
  };

  const nav = useNavigate();

  const handleExposure = (useId) => {
    setOpenExp(true);
    setUserId(useId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (codeRef.current && codeRef.current.contains(event.target)) ||
        (nameRef.current && nameRef.current.contains(event.target))
      ) {
        return; // inside click → do nothing
      }
      setActiveSearch(null); // outside click → close
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOverlayOpen && <div className="overlay_layout"></div>}
      <div>
        {showSearchDropdown && (
          <div
            className="over_view"
            onClick={() => setShowSearchDropdown(false)}></div>
        )}
        <div
          className="sport_detail m-0 ant-spin-nested-loading"
          style={{ position: "relative" }}>
          <div className="admin-details-toolbar">
            <div className="admin-details-toolbar-left">
              <Form
                form={toolbarForm}
                onFinish={onSearchFinish}
                className="admin-details-search-form"
                autoComplete="off">
                <Form.Item name="username">
                  <Input
                    prefix={<Search size={15} strokeWidth={1.8} />}
                    placeholder="Search by name, code, contact..."
                    allowClear
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="admin-details-toolbar-right">
              <button
                type="button"
                className="admin-details-tool-button"
                disabled>
                <Columns3 size={15} strokeWidth={1.8} />
                Columns
              </button>
              {actionSlot}
            </div>
          </div>

          <div
            ref={myElementRef}
            className="table_section statement_tabs_data ant-spin-nested-loading admin-details-table-scroll"
            style={{
              overflow: `${isLoading || isFetching ? "hidden" : "scroll"}`,
            }}>
            {(isLoading || isFetching) && <CustomLoading />}
            <table
              className={`live_table admin-details-table ${
                forDeadClient ? "mt-0" : ""
              }`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <div
                      className="main_search_droup"
                      style={{ position: "relative" }}
                      ref={codeRef}>
                      <p>Code</p>
                      {activeSearch === "code" && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={codeForm}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onSearchFinish}
                            autoComplete="off">
                            <Form.Item name="username">
                              <Input />
                            </Form.Item>
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
                                  type="button"
                                  onClick={() => handleResetData()}
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
                              setActiveSearch(
                                activeSearch === "code" ? null : "code",
                              )
                            }
                          />
                        </Space>
                      </p>
                    </div>
                  </th>
                  <th>
                    <div
                      className="main_search_droup"
                      style={{ position: "relative" }}
                      ref={nameRef}>
                      <p>Name</p>
                      {activeSearch === "name" && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={nameForm}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onSearchFinish}
                            autoComplete="off">
                            <Form.Item name="username">
                              <Input />
                            </Form.Item>
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
                                  type="button"
                                  onClick={() => handleResetData()}
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
                              setActiveSearch(
                                activeSearch === "name" ? null : "name",
                              )
                            }
                          />
                        </Space>
                      </p>
                    </div>
                  </th>
                  <th>
                    {userType == 7
                      ? "SuperAdmin"
                      : userType == 6
                        ? "SuperAdmin"
                        : userType == 5
                          ? "Admin"
                          : userType == 4
                            ? "madmin"
                            : userType == 3
                              ? "Master"
                              : userType == 2
                                ? "Super"
                                : "Agent"}
                  </th>
                  <th>Contact</th>
                  <th>D.O.J </th>
                  <th>Share%</th>
                  <th>PWD</th>
                  {userType == 1 && (
                    <th style={{ textAlign: "right" }}>Exposure</th>
                  )}
                  <th colSpan={3} className="text-center">
                    {Listname} Comm %
                  </th>
                  <th className="text-right">C.Chips</th>
                  <th>Status</th>
                  <th className="admin-details-sticky-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {userDetailsData?.length > 0 ? (
                  userDetailsData?.map((res, id) => (
                    <tr key={id}>
                      <td>
                        <div className="admin-details-serial-cell">
                          <span className="admin-details-row-index">
                            {firstEntry + id}
                          </span>
                          <div
                            onClick={() =>
                              handleShowPartnershipModal(res?.userId)
                            }
                            className="plus_btn admin-details-row-add">
                            <Plus size={14} strokeWidth={2} />
                          </div>
                        </div>
                      </td>
                      <td className="admin-details-code">
                        {convertCode(res?.userId)}
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            if (userTyep != 1) {
                              nav(
                                `${
                                  forDeadClient
                                    ? routeDeadFromUSerType?.[userType]
                                    : routeFromUSerType[userType]
                                }/${res?.userId}`,
                              );
                              setIndexData(0);
                              setPaginationTotal(25);
                            } else if (res?.liability !== 0) {
                              handleExposure(res?.userId);
                            }
                          }}
                          className={`${"gx-text-blue gx-pointer"} admin-details-name gx-text-nowrap`}>
                          <Eye size={13} strokeWidth={1.9} /> {res?.userName}
                        </span>
                      </td>
                      <td className="admin-details-parent">
                        {res?.parentName} ({convertCode(res?.parentId)})
                      </td>
                      <td>{res?.contact}</td>
                      <td>{moment(res?.createdOn).format("DD-MM-YYYY")}</td>
                      <td className="admin-details-number">
                        {res?.partnerShip}
                      </td>
                      <td className="admin-details-password">
                        {isNsg ? "*******" : res?.password}
                      </td>
                      {userType == 1 && (
                        <td className="admin-details-number text-right">
                          <span
                            onClick={() => {
                              !forDeadClient &&
                                res?.liability !== 0 &&
                                handleExposure(res?.userId);
                            }}
                            style={{
                              border: "1px solid #fff",
                              fontWeight: 600,
                              color: res?.liability !== 0 ? "#1890ff" : "#000",
                              cursor: "pointer",
                            }}>
                            {/* <Tag color="#f50"> */}
                            {res?.liability === 0
                              ? "0"
                              : res?.liability?.toFixed(2) || 0}
                            {/* </Tag> */}
                          </span>
                        </td>
                      )}
                      <td>
                        {res?.matchCommission === 0 &&
                        res?.sessionCommission === 0
                          ? "NOC"
                          : "BBB"}
                      </td>
                      <td className="admin-details-number">
                        {Number(res?.matchCommission)?.toFixed(2)}
                      </td>
                      <td className="admin-details-number">
                        {Number(res?.sessionCommission)?.toFixed(2)}
                      </td>
                      <td className="text-right admin-details-number">
                        {userType == 1
                          ? (
                              Number(res?.balance) +
                              Number(res?.balanceWithPnl) -
                              Number(res?.liability?.toFixed(2) || 0)
                            )?.toFixed()
                          : (
                              Number(res?.balance) + Number(res?.balanceWithPnl)
                            )?.toFixed()}
                      </td>
                      <td>
                        <span
                          className={`admin-details-status ${
                            res?.isActive
                              ? "admin-details-status-active"
                              : "admin-details-status-inactive"
                          }`}>
                          <span />
                          {res?.isActive ? "Active" : "InActive"}
                        </span>
                      </td>
                      <td className="admin-details-sticky-action">
                        <Dropdown
                          className="droup_menu"
                          open={dropdownOpenStates[id]}
                          onOpenChange={() => {
                            toggleDropdown(id);
                          }}
                          menu={{
                            items: getActionMenuItems(res),
                            className: "menu_data",
                          }}
                          trigger={["click", "contextMenu"]}>
                          <button
                            type="button"
                            className={`admin-details-more-action ${
                              dropdownOpenStates[id]
                                ? "admin-details-more-action-open"
                                : ""
                            }`}
                            onClick={() => {
                              handleParentIdChange(res?.userid, res?.parent);
                              handleEditUserData(res?.userid);
                            }}>
                            <MoreVertical size={16} strokeWidth={2} />
                          </button>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={userType == 1 ? 15 : 14}>
                      <Empty />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Divider />
          <div className="pagination_cus admin-details-pagination">
            <div className="admin-details-page-info">
              Showing {firstEntry} to {lastEntry} of {totalAdmins} entries
            </div>
            <Pagination
              current={currentPage + 1}
              total={totalPages * paginationTotal}
              pageSize={paginationTotal}
              onChange={(page) => setIndexData(page - 1)}
              showSizeChanger
              pageSizeOptions={["25", "50", "100", "150", "200", "250"]}
              onShowSizeChange={(current, size) => {
                setPaginationTotal(size);
                setIndexData(0);
              }}
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
          data={depositData}
          userIdData={selectedUserIdForActions}
          isDepositeModalOpen={isDepositModalOpen}
          handleDepositeOk={handleCloseDepositModal}
          handleDepositeCancel={handleCloseDepositModal}
          fetchData={fetchData}
          userType={userType}
        />
        <Exposure openExp={openExp} setOpenExp={setOpenExp} userId={userId} />

        <ResetPassword
          isDepositeModalOpen={openResetPassModal}
          setOpenResetPass={setOpenResetPassModal}
          data={resetPassData?.data}
          userId={userId}
          userType={userType}
        />
      </div>
    </>
  );
};

UserListTable.propTypes = {
  userType: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  Listname: PropTypes.string,
  setParentUserIds: PropTypes.func.isRequired,
  forDeadClient: PropTypes.bool,
  actionSlot: PropTypes.node,
};

export default UserListTable;
