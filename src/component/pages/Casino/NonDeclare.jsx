import { Card, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCasinoBetListQuery } from "../../../store/service/CasinoServices";
import { render } from "react-dom";

const NonDeclare = () => {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    fromDate: moment().format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const { data } = useGetCasinoBetListQuery({
    tableId: id,
    fromDate: formState?.fromDate,
    toDate: formState?.toDate,
    userId: "",
    isGameCompleted: false,
    sportId: 5015,
  });

  console.log(data, "datadatadatadatadata");

  const columns = [
    {
      title: "Client",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "RoundId",
      dataIndex: "marketId",
      key: "marketId",
    },
    {
      title: "Player",
      dataIndex: "selectionName",
      key: "selectionName",
    },
    {
      title: "Winner",
      dataIndex: "won",
      key: "won",
      render: () => <span className="gx-text-green">Not Declear</span>,
    },
    {
      title: "Stake",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
    },
    {
      title: "Loss",
      dataIndex: "loss",
      key: "loss",
    },
  ];
  return (
    <div className="match_slip NonDeclare">
      <Card
        className="sport_detail team_name"
        title={`NonDeclare Bets - [${data?.data?.length || 0}]`}
        style={{
          margin: 0,
          width: "100%",
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}>
        <Table bordered columns={columns} dataSource={data?.data || []}></Table>
      </Card>
    </div>
  );
};

export default NonDeclare;
