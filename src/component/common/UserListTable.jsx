import { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  Pagination,
  Space,
  Spin,
} from "antd";
import { Link, useParams } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import {
  SearchOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
import { SlEye } from "react-icons/sl";

const routeFromUSerType = {
  6: "/user-list/mamin/5",
  5: "/user-list/Master/4",
  4: "/user-list/Super/3",
  3: "/user-list/Agent/2",
  2: "/user-list/Client/1",
};

const UserListTable = ({ userType, Listname, setParentUserIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedUserIdForActions, setSelectedUserIdForActions] =
    useState(null);
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIdForPartnership, setUserIdForPartnership] = useState("");
  const [depositData, setDepositData] = useState({});

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [openResetPassModal, setOpenResetPassModal] = useState(false);

  const [form] = Form.useForm();
  const { parentId: parentIdFromParams } = useParams();
  const myElementRef = useRef(null);

  // API Hooks
  const [getSuperuserList, { data: superuserListData, isLoading, isFetching }] =
    useSuperuserListMutation();
  const [getBetLock] = useUserBetLockMutation();
  const [getUserActiveDeactive] = useGetUserActiveDeactiveMutation();
  const [getCasinoLock] = useUserCasinoLockMutation();
  const [
    getPartnershipData,
    { data: partnershipDetail, isLoading: loadingPartnership },
  ] = usePartnershipMutation();

  const fetchData = () => {
    getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: "",
    });
  };

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
  }, [parentIdFromParams, userType, paginationTotal, indexData]);

  useEffect(() => {
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

  const totalPages = superuserListData?.data?.totalPages || 1;
  const currentPage = superuserListData?.data?.currentPage || 0;

  const onSearchFinish = (values) => {
    getSuperuserList({
      userType: userType,
      parentId: parentIdFromParams || null,
      noOfRecords: paginationTotal,
      index: indexData,
      userId: values?.username,
    });
  };

  const [resetPassword, { data: resetPassData }] = useGetGenerateMutation();

  const handleResetPass = (res) => {
    resetPassword();
    setUserId(res?.userId);
  };

  const getActionMenuItems = (res) => [
    {
      label: (
        <div onClick={() => handleShowDepositModal(res, true)}>Deposit</div>
      ),
      key: "0",
    },
    {
      label: (
        <div onClick={() => handleShowDepositModal(res, false)}>Withdraw</div>
      ),
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
      label: (
        <div onClick={() => handleBlockBetting(res)}>
          {res?.betLock ? "UnBlock Betting" : "Block Betting"}
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div onClick={() => handleBlockCasino(res)}>
          {res?.casinoLock ? "UnBlock Casino" : "Block Casino"}
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          style={{ fontWeight: 700 }}
          onClick={resetDropdownStates}
          to={`${
            Listname === "Master"
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
        <Link
          style={{ fontWeight: 700 }}
          onClick={resetDropdownStates}
          to={`/account-statement/${res?.userId}`}>
          Statement
        </Link>
      ),
      key: "6",
    },
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
    {
      label: (
        <Link
          onClick={resetDropdownStates}
          className={userType === "1" ? "d_none" : ""}
          to={`${routeFromUSerType[userType]}/${res?.userId}`}>
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
            handleResetPass(res);
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
        {showSearchDropdown && (
          <div
            className="over_view"
            onClick={() => setShowSearchDropdown(false)}></div>
        )}
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
                    <div
                      className="main_search_droup"
                      style={{ position: "relative" }}>
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
                        handleParentIdChange(res?.userid, res?.parent)
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
                          onClick={() => handleEditUserData(res?.userid)}>
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
          <div className="pagination_cus" style={{ textAlign: "right" }}>
            <Pagination
              current={currentPage + 1}
              total={totalPages * paginationTotal}
              pageSize={paginationTotal}
              onChange={(page) => setIndexData(page - 1)}
              showSizeChanger
              pageSizeOptions={["50", "100", "150", "200", "250"]}
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
        />

        <ResetPassword
          isDepositeModalOpen={openResetPassModal}
          setOpenResetPass={setOpenResetPassModal}
          data={resetPassData?.data}
          userId={userId}
    
        />
      </div>
    </>
  );
};

export default UserListTable;
