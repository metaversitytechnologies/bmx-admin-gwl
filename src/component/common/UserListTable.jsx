import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  SearchOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalsData from "../pages/supermaster/listsuper/ModalsData/ModalsData";

import moment from "moment";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import BetlockModal from "./BetlockModal";
import {
  useSuperuserListMutation,
  useUpDateStatusMutation,
} from "../../store/service/supermasteAccountStatementServices";
import { usePartnershipMutation } from "../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../App";
import CasinoLockModals from "./CasinoLockModals";
import { SlEye } from "react-icons/sl";

const routeFromUSerType = {
  0: "/client/list-agent/",
  1: "/client/list-dealer/",
  2: "/client/list-clent/",
};

const UserListTable = ({
  userType,
  Listname,
  parentUserids,
  setParentUserIds,
  UserId,
}) => {
  // console.log(Listname, "sdcdsdas")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState();
  const [isDepositeModalOpen, SetisDepositeModalOpen] = useState(false);
  const [WithdrawnModal, SetWithdrawnModal] = useState(false);
  const [betLockModals, setBetLockModals] = useState(false);
  const [casinoLockModals, setCasinoLockModals] = useState(false);
  const [balance, setBalance] = useState();
  const [parentUserId, setParentUserId] = useState();
  const [dataVal, setDataVal] = useState();
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [partnershipDetails, setPartnershipDetails] = useState({});
  const [userIds, setUserIds] = useState("");

  const [betStatus, setBetStatus] = useState(false);
  const [lientDataState, setClientDataState] = useState(false);
  const [accStatus, setAccStatus] = useState(false);
  const [droupSearch, setDroupSearch] = useState(false);
  const [userName, setUserName] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);
  const [layoutOpen, setLayoutOpen] = useState(false);

  const [form] = Form.useForm();

  const [partnerShipData, { data: partnerShipDetail, isLoading: loading }] =
    usePartnershipMutation();

  const showModal = (val) => {
    setUserIds(val);
    const partnerShipDetail = {
      userId: val,
    };
    partnerShipData(partnerShipDetail);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setPartnershipDetails(partnerShipDetail?.data);
  }, [partnerShipDetail?.data]);

  const showWithdrawnModal = () => {
    SetWithdrawnModal(true);
    setDropdownStates([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDropdownStates([]);
  };
  const handleDepositeOk = () => {
    SetisDepositeModalOpen(false);
    setDropdownStates([]);
  };
  const handleDepositeCancel = () => {
    SetisDepositeModalOpen(false);
    setDropdownStates([]);
  };
  const showDepositModal = () => {
    SetisDepositeModalOpen(true);
    setDropdownStates([]);
  };

  const { id } = useParams();

  //API CALL
  // const [getData, { data: results, isLoading, isFetching, isError }] =
  //   useSuperuserListMutation();

  const [activeData, { data: Activestatus, error }] = useUpDateStatusMutation();

  // useEffect(() => {
  //   setParentUserIds(results?.data?.users[0]?.parent);
  // }, [parentUserids, results?.data?.users[0]?.parent]);

  const handleActive = () => {
    setDropdownStates([]);
    activeData({
      userId: dataVal,
    });
  };

  useEffect(() => {
    if (error?.status === 400) {
      openNotificationError(error?.data?.message);
    }
  }, [error]);

  // useEffect(() => {
  //   getData({
  //     userType: userType,
  //     parentUserId: id || null,
  //     noOfRecords: paginationTotal,
  //     index: indexData,
  //     userId: "",
  //   });
  // }, [id, userType, paginationTotal, indexData, Activestatus?.status]);

  const [userIdData, setUserIdData] = useState("");
  const [clientUserType, setClientUserType] = useState("");

  const handleParentId = (
    val,
    bal,
    user,
    parentUserID,
    betStatus,
    accStatus,
    userType
  ) => {
    setParentUserId(val);
    setBalance(bal);
    setUserIdData(user);
    setParentUserIds(parentUserID);
    setBetStatus(betStatus);
    setAccStatus(accStatus);
    setClientUserType(userType);
  };

  const handleEditData = (val, active, userName, balanc) => {
    setDataVal(val);
    setActiveStatus(active);
    setUserBalance(balanc);
    setUserName(userName);
  };

  const userId = localStorage.getItem("userId");

  const handleBlockBettting = () => {
    setDropdownStates([]);
    setBetLockModals(true);
  };
  const handleBlockCasino = () => {
    setDropdownStates([]);
    setCasinoLockModals(true);
  };

  const nav = useNavigate();

  const handleUpdateLimites = (data) => {
    console.log(dataVal, "sdfsdfs");
    setDropdownStates([]);
    nav(`/client/limitplusminus-super/${dataVal}`, { state: clientUserType });
  };

  const items = [
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={showDepositModal}>Deposit</div>,
      key: "0",
    },
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={showWithdrawnModal}>Withdrawn</div>,
      key: "1",
    },
    // {
    //   // className: `${parentUserids == userId ? "" : "d_none"}`,
    //   label: (
    //     <div onClick={handleActive}>{`${
    //       activeStatus === true ? "inActive" : "Active"
    //     }`}</div>
    //   ),
    //   key: "2",
    // },
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={handleBlockBettting}>Block Betting</div>,
      key: "3",
    },
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: <div onClick={handleBlockCasino}>Block Casino</div>,
      key: "4",
    },
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: (
        <Link
          onClick={() => {
            setDropdownStates([]);
          }}
          to={`${
            Listname === "Master"
              ? `/client/update-super/${dataVal}`
              : Listname === "Super"
              ? `/client/update-agent/${dataVal}`
              : Listname === "Agent"
              ? `/client/update-dealer/${dataVal}`
              : `/client/update-client/${dataVal}`
          }`}>
          Edit
        </Link>
      ),
      key: "5",
    },
    {
      // className: `${parentUserids == userId ? "" : "d_none"}`,
      label: (
        <div onClick={() => handleUpdateLimites(dataVal)}>Update Limit</div>
      ),
      key: "6",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/account-statement/${dataVal}`}>
          Statement
        </Link>
      ),
      key: "7",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/client/account-operations/${dataVal}`}>
          Account Operations
        </Link>
      ),
      key: "8",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          to={`/client/login-report/${dataVal}`}>
          Login Report
        </Link>
      ),
      key: "9",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates([])}
          className={userType == 3 ? "d_none" : ""}
          to={routeFromUSerType[userType] + parentUserId}>
          Downline
        </Link>
      ),
      key: "10",
    },
  ];

  useEffect(() => {
    if (Activestatus?.status === true) {
      openNotification(Activestatus?.message);
    }
  }, [Activestatus?.status]);

  const onFinish = (values) => {
    getData({
      userType: userType,
      parentUserId: id || null,
      noOfRecords: paginationTotal,
      index: indexData,
      userId: values?.username,
    });
    // if (results?.status === true) {
    //   form.resetFields();
    //   setDroupSearch(false);
    // }
  };

  const uType = localStorage.getItem("userType");

  // useEffect(() => {
  //   const initialStates = new Array(results?.data?.user?.length).fill(false);
  //   setDropdownStates(initialStates);
  // }, [results?.data?.user]);

  const handleScroll = () => {
    setLayoutOpen(false);
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownStates(updatedDropdownStates);
    setLayoutOpen(false);
  };
  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  const data = [
    {
      userid: "demo01",
      username: "Demo",
      parent: "subDemo",
      mobile: 9988998898,
      dateOfJoining: "10-06-2024",
      partnerShip: 90,
      password: "123321",
      matchCommission: 0,
      sessionCommission: 0,
      balancePlusPnl: 1000,
      creditref: 20,
      active: true,
    },
    {
      userid: "demo02",
      username: "Alpha",
      parent: "subAlpha",
      mobile: 9988998899,
      dateOfJoining: "11-06-2024",
      partnerShip: 85,
      password: "alpha123",
      matchCommission: 1,
      sessionCommission: 0.5,
      balancePlusPnl: 1500,
      creditref: 30,
      active: true,
    },
    {
      userid: "demo03",
      username: "Beta",
      parent: "subBeta",
      mobile: 9988998800,
      dateOfJoining: "12-06-2024",
      partnerShip: 80,
      password: "beta321",
      matchCommission: 2,
      sessionCommission: 1,
      balancePlusPnl: 900,
      creditref: 25,
      active: false,
    },
    {
      userid: "demo04",
      username: "Gamma",
      parent: "subGamma",
      mobile: 9988998700,
      dateOfJoining: "13-06-2024",
      partnerShip: 75,
      password: "gamma321",
      matchCommission: 1.5,
      sessionCommission: 0.7,
      balancePlusPnl: 2000,
      creditref: 40,
      active: true,
    },
    {
      userid: "demo05",
      username: "Delta",
      parent: "subDelta",
      mobile: 9988998600,
      dateOfJoining: "14-06-2024",
      partnerShip: 70,
      password: "delta123",
      matchCommission: 1.2,
      sessionCommission: 0.8,
      balancePlusPnl: 800,
      creditref: 10,
      active: false,
    },
    {
      userid: "demo06",
      username: "Epsilon",
      parent: "subEpsilon",
      mobile: 9988998500,
      dateOfJoining: "15-06-2024",
      partnerShip: 95,
      password: "epsi321",
      matchCommission: 0.5,
      sessionCommission: 0.2,
      balancePlusPnl: 1200,
      creditref: 50,
      active: true,
    },
    {
      userid: "demo07",
      username: "Zeta",
      parent: "subZeta",
      mobile: 9988998400,
      dateOfJoining: "16-06-2024",
      partnerShip: 88,
      password: "zeta123",
      matchCommission: 1.3,
      sessionCommission: 0.4,
      balancePlusPnl: 1100,
      creditref: 35,
      active: true,
    },
    {
      userid: "demo08",
      username: "Eta",
      parent: "subEta",
      mobile: 9988998300,
      dateOfJoining: "17-06-2024",
      partnerShip: 77,
      password: "eta456",
      matchCommission: 1.1,
      sessionCommission: 0.6,
      balancePlusPnl: 950,
      creditref: 22,
      active: false,
    },
    {
      userid: "demo09",
      username: "Theta",
      parent: "subTheta",
      mobile: 9988998200,
      dateOfJoining: "18-06-2024",
      partnerShip: 82,
      password: "theta789",
      matchCommission: 2.1,
      sessionCommission: 1.1,
      balancePlusPnl: 1750,
      creditref: 28,
      active: true,
    },
    {
      userid: "demo10",
      username: "Iota",
      parent: "subIota",
      mobile: 9988998100,
      dateOfJoining: "19-06-2024",
      partnerShip: 93,
      password: "iota000",
      matchCommission: 0.8,
      sessionCommission: 0.3,
      balancePlusPnl: 1400,
      creditref: 33,
      active: true,
    },
    {
      userid: "demo11",
      username: "Kappa",
      parent: "subKappa",
      mobile: 9988998000,
      dateOfJoining: "20-06-2024",
      partnerShip: 78,
      password: "kappa999",
      matchCommission: 1.4,
      sessionCommission: 0.9,
      balancePlusPnl: 1250,
      creditref: 27,
      active: false,
    },
  ];

  return (
    <>
      {layoutOpen && <div className="overlay_layout"></div>}
      <div>
        {droupSearch && (
          <div
            className="over_view"
            onClick={() => setDroupSearch(false)}></div>
        )}
        <div className="sport_detail m-0 ant-spin-nested-loading">
          {
            <div
              ref={myElementRef}
              className="table_section statement_tabs_data ant-spin-nested-loading"
              // style={{
              //   overflow: `${isLoading || isFetching ? "hidden" : "scroll"}`,
              // }}
            >
              {/* {isLoading || isFetching ? (
                <div className="spin_icon user_spin">
                  <Spin size="large" />
                </div>
              ) : (
                ""
              )} */}
              <table className={`live_table ${id && "mt-0"}`}>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>
                    <div className="main_search_droup">
                      <p>Code</p>
                      {droupSearch && (
                        <Menu className="menu_item">
                          <Form
                            name="code"
                            form={form}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onFinish}
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
                            onClick={() => setDroupSearch(!droupSearch)}
                          />
                        </Space>
                      </p>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>
                    {uType == 5
                      ? "Sub Admin"
                      : uType == 0
                      ? "Master"
                      : uType == 1
                      ? "Super"
                      : uType == 2
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
                  <th className="text-right">Credit Reference</th>
                  <th>Status</th>
                </tr>
                {/* <tr>
                  <th>Type</th>
                  <th>Match</th>
                  <th>SSN</th>
                </tr> */}

                {data?.map((res, id) => {
                  return (
                    <tr key={id}>
                      <td>
                        <div
                          onClick={() => showModal(res?.userid)}
                          className="plus_btn">
                          <PlusOutlined />
                        </div>
                      </td>
                      <td
                        onClick={() =>
                          handleParentId(
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
                          open={dropdownStates[id]}
                          onOpenChange={() => toggleDropdown(id)}
                          menu={{ items, className: "menu_data" }}
                          trigger={["click", "contextMenu"]}>
                          <div
                            className="droup_link"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleEditData(
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
                      <td>{res?.userid}</td>
                      <td>
                        <span className="gx-text-blue gx-pointer gx-text-nowrap">
                         <SlEye /> {res?.username}
                        </span>
                      </td>
                      <td>{res?.parent}</td>
                      <td>{res?.mobile}</td>
                      <td>
                        {moment(res?.dateOfJoining).format(
                          "YYYY-MM-DD, h:mm A"
                        )}
                      </td>
                      <td>{res?.partnerShip}</td>
                      <td>{res?.password}</td>
                      <td>
                        {res?.matchCommission == 0 &&
                        res?.sessionCommission == 0
                          ? "No Comm"
                          : "bbb"}
                      </td>
                      <td>{Number(res?.matchCommission)?.toFixed(2)}</td>
                      <td>{Number(res?.sessionCommission)?.toFixed(2)}</td>
                      <td className="text-right">
                        {userType == 3
                          ? Number(res?.balancePlusPnl)?.toFixed(2)
                          : Number(res?.availablebalance)?.toFixed(2)}
                      </td>
                      <td className="text-right">
                        {Number(res?.creditref)?.toFixed(2)}
                      </td>
                      <td>{res?.active === true ? "Active" : "InActive"}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          }

          {/* {results?.data?.users === undefined || isError ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <> */}
          <Divider />
          <div className="pagination_cus">
            {/* <Pagination
                  className="pagination_main ledger_pagination"
                  onShowSizeChange={(c, s) => setPaginationTotal(s)}
                  total={
                    results?.data?.totalPages &&
                    results?.data?.totalPages * paginationTotal
                  }
                  defaultPageSize={50}
                  pageSizeOptions={[50, 100, 150, 200, 250]}
                  onChange={(e) => setIndexData(e - 1)}
                /> */}
          </div>
          {/* </>
          )} */}
          <Modal
            className="partnership"
            title={`Partnership Info - ${userIds}`}
            open={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: "none" } }}>
            <ModalsData
              loading={loading}
              partnershipDetails={partnershipDetails}
            />
          </Modal>
        </div>

        <Modal
          className="modal_deposit"
          destroyOnClose
          title={<h1>Deposit Chips</h1>}
          open={isDepositeModalOpen}
          onOk={handleDepositeOk}
          onCancel={handleDepositeCancel}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}>
          <Deposit
            handleClose={() => SetisDepositeModalOpen(false)}
            setClientDataState={setClientDataState}
            data={dataVal}
            userIdData={userIdData}
          />
        </Modal>

        <Modal
          className="modal_deposit"
          destroyOnClose
          title={
            <h1>
              <span>Withdraw Chips</span>
            </h1>
          }
          open={WithdrawnModal}
          onOk={handleDepositeOk}
          onCancel={() => SetWithdrawnModal(false)}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}>
          <Withdraw
            userIdData={userIdData}
            handleClose={() => SetWithdrawnModal(false)}
            data={dataVal}
            setClientDataState={setClientDataState}
          />
        </Modal>

        <Modal
          className="modal_deposit"
          destroyOnClose
          title={
            <h1>
              <span>Betting Lock</span>
            </h1>
          }
          open={betLockModals}
          // onOk={handleBetLockOk}
          onCancel={() => setBetLockModals(false)}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}>
          <BetlockModal
            userIdData={userIdData}
            setBetStatus={setBetStatus}
            betStatus={betStatus}
            setAccStatus={setAccStatus}
            accStatus={accStatus}
            handleClose={() => setBetLockModals(false)}
            paginationTotal={paginationTotal}
            index={indexData}
            id={id}
            userType={userType}
            // getData={getData}
          />
        </Modal>

        <Modal
          className="modal_deposit"
          destroyOnClose
          title={
            <h1>
              <span style={{ fontSize: "18px" }}>Casino Allowed</span>
            </h1>
          }
          open={casinoLockModals}
          // onOk={handleBetLockOk}
          onCancel={() => setCasinoLockModals(false)}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}>
          <CasinoLockModals
            userIdData={userIdData}
            handleClose={() => setCasinoLockModals(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default UserListTable;
