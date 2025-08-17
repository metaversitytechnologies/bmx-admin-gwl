import { useState } from "react";
import { Modal, Table } from "antd";
import AccountModals from "../AccountModals";
import moment from "moment";

const AllStatement = ({ dateData, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Date ",
      dataIndex: "date",
      key: "date",
      render: (value) => moment(value).format("DD MMM hh:mm:ss A"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      dataIndex: "closing",
      key: "closing",
      render: (text) => {
        return {
          children: <p>{text}</p>,
        };
      },
    },
  ];

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
            className="live_table statemt_account agent_master1"
            bordered
            rowClassName="c_pointer"
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       handelAccountModals(event, record?.marketid, record?.remark);
            //     },
            //   };
            // }}
            loading={isLoading}
            columns={columns}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={dateData || []}></Table>
        </div>
      </div>
      {/* {marketId != "" && (
        <Modal
          title="Bet List"
          className="bet_list"
          open={isModalOpen1}
          onCancel={handleCancel}
          footer={null}>
          <AccountModals marketId={marketId} remark={remark} id={id} />
        </Modal>
      )} */}
    </>
  );
};

export default AllStatement;
