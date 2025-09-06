import {
  Button,
  Empty,
  Form,
  Input,
  Menu,
  notification,
  Pagination,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  useLazyDepositAndWithdrawQuery,
  useSuperuserListMutation,
} from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode, convertCodeReverse } from "../../../../store/constant";
import { openNotification, openNotificationError } from "../../../../App";

const AddSuperLimites = () => {
  const [codeForm] = Form.useForm();
  const [nameForm] = Form.useForm();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const [activeSearchColumn, setActiveSearchColumn] = useState(null);

  const [userToSearch, setUserToSearch] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [getSuperuserList] = useSuperuserListMutation();
  const [triggerDeposit] = useLazyDepositAndWithdrawQuery();

  const [userDetailsData, setUserDetailsData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    currentPage: 0,
  });

  const codeRef = useRef(null);
  const nameRef = useRef(null);

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

  // 🔹 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (codeRef.current && codeRef.current.contains(event.target)) ||
        (nameRef.current && nameRef.current.contains(event.target))
      ) {
        return; // inside click → do nothing
      }
      setActiveSearchColumn(null); // outside click → close
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      });
  };

  const onSearchFinish = (values) => {
    setUserToSearch(values?.username?.trim() || "");
    setIndexData(0);
    setActiveSearchColumn(null);
  };

  const handleResetData = async () => {
    codeForm.resetFields();
    nameForm.resetFields();
    setUserToSearch("");
    setIndexData(0);
    fetchData("");
    setActiveSearchColumn(null);
  };

  return (
    <>
      {contextHolder}
      <div
        className="table_section mwt sport_detail"
        style={{ paddingBottom: "12px" }}>
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <table className="live_table limit_update">
            <thead>
              <tr>
                {/* Code column */}
                <th>
                  <div
                    className="main_search_droup"
                    style={{ position: "relative" }}
                    ref={codeRef}>
                    <p>Code</p>
                    {activeSearchColumn === "code" && (
                      <Menu className="menu_item">
                        <Form
                          name="code"
                          form={codeForm}
                          onFinish={onSearchFinish}
                          autoComplete="off"
                          onSubmitCapture={(e) => e.preventDefault()}>
                          <Form.Item name="username">
                            <Input placeholder="Enter code" />
                          </Form.Item>
                          <div className="agent_search_deatil">
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "86px", marginRight: "8px" }}>
                                <SearchOutlined /> Search
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="button"
                                onClick={handleResetData}
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
                            setActiveSearchColumn(
                              activeSearchColumn === "code" ? null : "code"
                            )
                          }
                        />
                      </Space>
                    </p>
                  </div>
                </th>

                {/* Name column */}
                <th>
                  <div
                    className="main_search_droup"
                    style={{ position: "relative" }}
                    ref={nameRef}>
                    <p>Name</p>
                    {activeSearchColumn === "name" && (
                      <Menu
                        className="menu_item"
                        style={{ right: 0, left: "unset" }}>
                        <Form
                          name="name"
                          form={nameForm}
                          onFinish={onSearchFinish}
                          autoComplete="off"
                          onSubmitCapture={(e) => e.preventDefault()}>
                          <Form.Item name="username">
                            <Input placeholder="Enter name" />
                          </Form.Item>
                          <div className="agent_search_deatil">
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "86px", marginRight: "8px" }}>
                                <SearchOutlined /> Search
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="button"
                                onClick={handleResetData}
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
                            setActiveSearchColumn(
                              activeSearchColumn === "name" ? null : "name"
                            )
                          }
                        />
                      </Space>
                    </p>
                  </div>
                </th>

                <th>C. Chips</th>
                <th>Add / Minus Limit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetailsData?.length > 0 ? (
                userDetailsData.map((user, key) => (
                  <tr key={key}>
                    <td>{convertCode(user?.userId)}</td>
                    <td>{user?.userName}</td>
                    <td>{user?.balance + user?.balanceWithPnl}</td>
                    <td>
                      <Form.Item>
                        <Input
                          type="number"
                          value={inputValues[user.userId] || ""}
                          onChange={(e) =>
                            handleInputChange(user.userId, e.target.value)
                          }
                          style={{
                            width: "110px",
                            padding: "6px",
                            background: "#fff",
                          }}
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <div className="minus_btn">
                        <Button
                          className="add"
                          onClick={() => handleLimitAction(user, true)}>
                          Add
                        </Button>
                        <Button
                          className="minus"
                          onClick={() => handleLimitAction(user, false)}>
                          Minus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Pagination
              current={paginationInfo.currentPage + 1}
              total={paginationInfo.totalPages * paginationTotal}
              pageSize={paginationTotal}
              showSizeChanger
              pageSizeOptions={["25", "50", "100", "200", "300", "500"]}
              onChange={(page) => setIndexData(page - 1)}
              onShowSizeChange={(current, size) => {
                setPaginationTotal(size);
                setIndexData(0);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSuperLimites;
