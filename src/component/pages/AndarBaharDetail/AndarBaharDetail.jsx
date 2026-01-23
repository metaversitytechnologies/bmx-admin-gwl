import { Card, DatePicker} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useState } from "react";

// const { confirm } = Modal;
// const showConfirm = () => {
//   confirm({
//     title: "Confirm Changes",
//     icon: <QuestionCircleOutlined />,
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };



const { RangePicker } = DatePicker;



const AndarBaharDetail = () => {
  const navigate = useNavigate();

  const handleBackbtn = () => {
    navigate(-1);
  };

  const [rouletteKey, setRouletteKey] = useState()

  const handleDroupDown = (val)=>{
    setRouletteKey(val)
  }

  const data = [
    {
      key: "1",
      name: "AndarBahar 04-07-2023",
      plusminu: 24,
    },
    {
      key: "2",
      name: "AndarBahar 04-07-2023",
      plusminu: -4,
    }
  ];
  
  const items = [
    {
      label: (
        <Link to={`/Casino/AndarBahar/plus-minus-type`} className="title_section">
         AnderBahar Plus Minus
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="title_section" to="/Casino/AndarBahar/all-games">
         Display Games
        </Link>
      ),
      key: "1",
    }
  ];


  return (
    <>
      <Card
        className="sport_detail roulette"
        title="Andar Bahar Detail"
        extra={
          <>
            <button onClick={handleBackbtn}>Book</button>
            <button onClick={handleBackbtn}>Back</button>
          </>
        }>
        <div className="date_picker m-12">
          <RangePicker
            style={{
              marginBottom: "10px",
              width: "100%",
              borderRadius: "20px",
            }}
          />
        </div>
        <div className="table_section">
          {/* <Table columns={columns} dataSource={data} /> */}
          <table className="">
            <tr>
              <th width="15%"></th>
              <th width="65%">Name</th>
              <th className="text-right" width="20%">
                Plus Minu
              </th>
            </tr>
            {data?.map((res) => {
              return (
                <tr key={res?.key}>
                  <td className="roulette_droupdown" width="15%">
                    <Dropdown
                      className="table_dropdown"
                      menu={{
                        items,
                      }}
                      trigger={["hover"]}>
                      <a onClick={()=>handleDroupDown(res?.key)}>
                        <Space>
                          <CaretDownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </td>
                  <td width="65%">{res?.name}</td>
                  <td className={`text-right ${res?.plusminu > 0 ?"text_success": res?.plusminu<0? "text_danger":""}`} width="20%">
                    {res?.plusminu}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        {/* <Divider /> */}
        {/* <Pagination className="pagination_main" defaultCurrent={1} total={50} /> */}
      </Card>
    </>
  );
};

export default AndarBaharDetail;
