import { Table } from "antd";

const getCardImage = (nat) => {
  const cardMap = {
    "Card A": "1.jpg",
    "Card 2": "2.jpg",
    "Card 3": "3.jpg",
    "Card 4": "4.jpg",
    "Card 5": "5.jpg",
    "Card 6": "6.jpg",
    "Card 7": "7.jpg",
    "Card 8": "8.jpg",
    "Card 9": "9.jpg",
    "Card 10": "10.jpg",
    "Card J": "11.jpg",
    "Card Q": "12.jpg",
    "Card K": "13.jpg",
  };

  return cardMap[nat] || null;
};

const AAA = ({ odds }) => {
  const filteredOdds = (odds || []).filter(
    (item) => item.sid !== "21" && item.sid !== "22"
  );

  const columns = [
    {
      title: "Player Name",
      dataIndex: "nation",
      key: "nation",
      render: (text, record) => {
        const image = getCardImage(record.nation);
        return (
          <div >
            {image ? (
              <>
                <img
                  src={`/Images/casino/${image}`}
                  alt={record.nation}
                  style={{ width: 30, height: 45, display: "block" }}
                />
                <p style={{ fontWeight: 700 }}>{record?.pnl}</p>
              </>
            ) : (
              <div>
                <p>{record?.nation}</p>
                <p style={{ fontWeight: 700 }}>{record?.pnl}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "b1",
      key: "b1",
    },
  ];

  return (
    <Table
      pagination={false}
      bordered
      columns={columns}
      dataSource={filteredOdds || []}
      rowKey="sid"
    />
  );
};

export default AAA;
