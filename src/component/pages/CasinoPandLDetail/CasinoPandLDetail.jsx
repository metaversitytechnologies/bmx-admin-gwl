import { Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { useGetCompletdCasinoQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import LinkButton from "../../common/LinkButton";

const CasinoPandLDetail = () => {
  const fromDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const toDate = dayjs().format("YYYY-MM-DD");

  const { data, isLoading, isFetching } = useGetCompletdCasinoQuery({
    fromDate,
    toDate,
  });

  const totalPnl =
    data?.data?.reduce(
      (acc, item) => (item?.casinoId === null ? acc + item.pnl : acc),
      0
    ) || 0;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => (value ? dayjs(value).format("DD MMM YYYY") : ""),
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (text, record) => {
        const formattedDate = record?.date
          ? dayjs(record.date).format("DD-MM-YYYY")
          : "";

        return (
          <>
            {record?.casinoId && `${formattedDate} `}
            {text}
          </>
        );
      },
    },
    {
      title: "P/L",
      dataIndex: "pnl",
      key: "pnl",
      render: (value) => (
        <span style={{ color: value > 0 ? "green" : "red" }}>
          {value?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <div className="">
            {!record?.isTotal ? (
              record.casinoId ? (
                <>
                  <LinkButton
                    to={`/display-games/${record.casinoId}/${record.eventName}/${record.date}`}
                    label="Show Games"
                  />
                  <LinkButton
                    to={`/Casino/AndarBahar/plus-minus-type/${record?.date}/${record?.casinoId}`}
                    label="PL"
                  />
                </>
              ) : (
                <LinkButton
                  to={`/plusminuscasinodeatils/${record.date}`}
                  label="PL"
                />
              )
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="match_slip">
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail team_name"
        title="Casino PandL Detail"
        extra={<button>Back</button>}>
        <div
          style={{
            padding: "20px",
          }}>

          <div
            className="summary_strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gap: "0",
              marginBottom: "20px",
              padding: "14px 16px",
              background: "#f1f3f5",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}>
            <div
              className="summary_item"
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                className="summary_label"
                style={{
                  fontSize: "12px",
                  color: "#8a8a8a",
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}>
                P/L
              </span>
              <span
                className={`summary_value ${totalPnl > 0 ? "positive" : "negative"
                  }`}
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: totalPnl > 0 ? "#2fb344" : "#f03e3e",
                }}>
                {totalPnl?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <Table
              columns={columns}
              dataSource={[
                {
                  eventName: "Total",
                  date: "",
                  pnl: totalPnl,
                  isTotal: true,
                },
                ...(data?.data ? [...data.data].reverse() : []),
              ]}
              rowKey={(record, index) => index}
              loading={{
                spinning: isLoading || isFetching,
                indicator: <CustomLoading />,
              }}
              pagination={{ pageSize: 20 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CasinoPandLDetail;
