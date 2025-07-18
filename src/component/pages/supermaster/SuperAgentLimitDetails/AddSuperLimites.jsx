import { Button, Form, Input, notification, Pagination } from "antd";
import { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import {
  useLazyDepositAndWithdrawQuery,
  useSuperuserListMutation,
} from "../../../../store/service/supermasteAccountStatementServices";

const AddSuperLimites = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const [inputValues, setInputValues] = useState({});
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);

  const [getSuperuserList, { data: superuserListData, isLoading }] =
    useSuperuserListMutation();

  const [triggerDeposit] = useLazyDepositAndWithdrawQuery();

  const totalPages = superuserListData?.data?.totalPages || 1;
  const currentPage = superuserListData?.data?.currentPage || 0;

  const fetchData = () => {
    getSuperuserList({
      userType: id,
      parentId: "",
      noOfRecords: paginationTotal,
      index: indexData,
      userToSearch: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, [id, indexData, paginationTotal]);

  const openNotification = (mess) => {
    api.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

  const openNotificationError = (mess) => {
    api.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };

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
        openNotification(
          `${isAdd ? "Added" : "Deducted"} ${amount} to ${user.userName}`
        );
        fetchData(); // Refresh after action
        setInputValues((prev) => ({ ...prev, [user.userId]: "" }));
      })
      .catch((err) => {
        openNotificationError("Transaction failed");
      });
  };

  return (
    <>
      {contextHolder}
      <div
        className="table_section mwt sport_detail"
        style={{ paddingBottom: "12px" }}>
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Form form={form} autoComplete="off">
            <table className="live_table limit_update">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>C. Chips</th>
                  <th>Add / Minus Limit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {superuserListData?.data?.userListV2?.map((user, key) => (
                  <tr key={key}>
                    <td>{user?.userId}</td>
                    <td>{user?.userName}</td>
                    <td>{user?.balance}</td>
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
                          loading={isLoading}
                          onClick={() => handleLimitAction(user, true)}>
                          Add
                        </Button>
                        <Button
                          className="minus"
                          loading={isLoading}
                          onClick={() => handleLimitAction(user, false)}>
                          Minus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Form>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Pagination
              current={currentPage + 1}
              total={totalPages * paginationTotal}
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
