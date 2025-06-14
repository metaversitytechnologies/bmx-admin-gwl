import { BiUserCircle } from "react-icons/bi";
import CardItem from "../../common/carditem/CardItem";

const data = [
  {
    image: <BiUserCircle />,
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super",
    size: "14",
    userType: 0,
  },
  {
    image: <BiUserCircle />,
    name: "Dr/Cr Entry Master",
    path: "/client/txn-master",
    size: "14",
    userType: 1,
  },
  {
    image: <BiUserCircle />,
    name: "Dr/Cr Entry Agent",
    path: "/client/txn-agent",
    size: "14",
    userType: 2,
  },
  // {
  //   image: <BiUserCircle />,
  //   name: "Dr/Cr Entry Client",
  //   path:"/client/txn-client",
  //   size:"14",
  //   userType:3
  // },
];

const CashTransanction = () => {
  const userTypeMatch = {
    0: [1, 2, 3],
    1: [2, 3],
    2: [3],
    5: [0, 1, 2, 3],
  };
  const uType = 5;
  return (
    <>
      <CardItem
        data={data.filter((res) =>
          userTypeMatch[uType]?.includes(res?.userType)
        )}
      />
    </>
  );
};

export default CashTransanction;
