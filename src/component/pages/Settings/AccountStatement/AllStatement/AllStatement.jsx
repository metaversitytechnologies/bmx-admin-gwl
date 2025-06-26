import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useLazyAccountstatementQuery } from "../../../../../store/service/supermasteAccountStatementServices";
import { useDispatch } from "react-redux";
import { setData } from "../../../../../store/global/slice";
import AccountModals from "../AccountModals";
import { useParams } from "react-router-dom";
import DownloadReport from "../../../../common/DownloadReport/DownloadReport";

const AllStatement = ({ clientId, dateData, gameType }) => {
  const [trigger, { data, isFetching, isLoading }] =
    useLazyAccountstatementQuery();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketId, setMarketId] = useState("");
  const [remark, setRemark] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const AccData = {
      index: 0,
      noOfRecords: "200",
      fromDate: dateData[0],
      toDate: dateData[1],
      userid: clientId || id || "",
      type: gameType,
    };
    trigger(AccData);
  }, [data, gameType, clientId, dateData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData(data?.data?.dataList?.length));
  }, [data?.data]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "fromto",
      key: "fromto",
    },

    {
      title: "CR",
      dataIndex: "credit",
      key: "credit",
      render: (text) => {
        return {
          children: <p className="text_success">{text}</p>,
        };
      },
    },

    {
      title: "DR",
      dataIndex: "debit",
      key: "debit",
      render: (text) => {
        return {
          children: <p className="text_danger">{text}</p>,
        };
      },
    },

    {
      title: "Balance",
      dataIndex: "pts",
      key: "pts",
    },
  ];

  const handleCancel = () => {
    setIsModalOpen1(false);
  };

  const handelAccountModals = (e, id, rem) => {
    e.preventDefault();
    setIsModalOpen1(true);
    setMarketId(id);
    setRemark(rem);
  };

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="report_overlay"></div>
      )}

      <div className="table_section statement_tabs_data">
        <div className="table_section">
          <Table
            className="live_table statemt_account agent_master"
            bordered
            rowClassName="c_pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handelAccountModals(event, record?.marketid, record?.remark);
                },
              };
            }}
            loading={isFetching || isLoading}
            columns={columns}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={
              data?.data?.dataList?.map((res) => ({
                ...res,
                commPlus: 0,
                commMinus: 0,
                prevBal: 0,
              })) || []
            }></Table>
        </div>
      </div>
      {marketId != "" && (
        <Modal
          title="Bet List"
          className="bet_list"
          open={isModalOpen1}
          onCancel={handleCancel}
          footer={null}>
          <AccountModals marketId={marketId} remark={remark} id={id} />
        </Modal>
      )}
    </>
  );
};

export default AllStatement;
