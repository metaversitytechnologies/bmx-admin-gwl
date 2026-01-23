import "./DusKaDumDetail.scss";
import { Card, DatePicker, Divider, Empty, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const { confirm } = Modal;
const showConfirm = () => {
  confirm({
    title: "Confirm Changes",
    icon: <QuestionCircleOutlined />,
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const { RangePicker } = DatePicker;

const data = [
  
];


const DusKaDumDetail = () => {
  const navigate = useNavigate();

  const handleBackbtn = () => {
    navigate(-1);
  };

  return (
    <>
      <Card
        className="sport_detail _details"
        title="Dus Ka Dum Detail"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="date_picker m-12">
          <RangePicker
            style={{
              marginBottom: "10px",
              width: "100%",
              borderRadius: "20px",
            }}
          />
        </div>
        <div className="table_section" style={{marginBottom:"12px"}}>
          <table className="">
            <tr>
              <th></th>
              <th>Name</th>
              <th className="text-right">Plus Minu</th>
            </tr>
            {data?.map((res) => {
              return (
                <tr key={res?.key}>
                  <td></td>
                  <td>{res?.name}</td>
                  <td className="text-right">{res?.plusminu}</td>
                </tr>
              );
            })}
          </table>
          {
            data?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        </div>
        {/* <Divider />
        <Pagination className="pagination_main ledger_pagination"  defaultCurrent={1} total={50} /> */}
      </Card>
    </>
  );
};

export default DusKaDumDetail;
