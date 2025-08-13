import { Card, Empty } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useGetTranstionDeatilsQuery } from "../../../../store/service/SportDetailServices";

const DeletedLenden = () => {
  const nav = useNavigate();
  const handleBackbtn = () => {
    nav(-1);
  };

  const { id } = useParams();

  const { data } = useGetTranstionDeatilsQuery({
    userId: id,
  });

  return (
    <>
      <Card
        className="sport_detail ledger_data rehected_bet"
        title="Deleted Lena Dena"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="table_section" style={{ paddingBottom: "20px" }}>
          <table className="">
            <thead>
              <tr>
                <th>Date</th>
                <th>Post Date</th>
                <th>Collection Name</th>
                <th className="text-right">Debit</th>
                <th className="text-right">Credit</th>
                <th className="text-right">Balance</th>
                <th>Payment Type</th>
                <th>Remark</th>
                <th>Done By</th>
                <th>Deleted By</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 ? (
                data.data.map((res) => (
                  <tr key={res?.key}>
                    <td>{moment(res?.date).format("YYYY-MM-DD, h:mm a")}</td>
                    <td>{moment(res?.date).format("YYYY-MM-DD, h:mm a")}</td>
                    <td>{res?.collectionName}</td>
                    <td className="text-right">{res?.debit}</td>
                    <td className="text-right">{res?.credit}</td>
                    <td className="text-right">{res?.balance}</td>
                    <td>{res?.paymentType}</td>
                    <td>{res?.remarks}</td>
                    <td>{res?.doneBy}</td>
                    <td>{res?.deletedBy}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default DeletedLenden;
