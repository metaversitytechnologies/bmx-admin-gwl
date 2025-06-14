import "./RouletteDetail.scss";
import { Card, DatePicker, Empty, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

const { RangePicker } = DatePicker;

const RouletteDetail = ({ isAura, Id }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [rouletteDate, setRouletteDate] = useState();
  const [isAuraDetails, setIsAuraDetails] = useState();

  const navigate = useNavigate();

  const handleBackbtn = () => {
    navigate(-1);
  };

  const handleDroupDown = (val) => {
    setRouletteDate(val);
    setIsAuraDetails(isAura);
  };

  const handlePlusMinus = () => {
    navigate(`/casino/${Id}/plus-minus-type`, {
      state: { rouletteDate, isAuraDetails },
    });
  };

  const handleDisplayGame = () => {
    navigate(`/casino/${Id}/all-games`, {
      state: { rouletteDate, isAuraDetails },
    });
  };

  const items = [
    {
      label: (
        <p onClick={handlePlusMinus} className="title_section">
          {`${isAura} Plus Minus`}
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p onClick={handleDisplayGame} className="title_section">
          Display Game
        </p>
      ),
      key: "1",
    },
  ];

  const onChange = (data, dateString) => {
    setDateData(dateString);
  };

  const handleScroll = () => {
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !dropdownStates[index];
    setDropdownStates(updatedDropdownStates);
  };

  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element?.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  // ✅ Static Data
  const rouletteData = {
    data: [
      {
        key: 1,
        name: "Player 1",
        date: "2025-06-10",
        comm: 100.25,
        commDiya: 50.5,
        commLiyaShareWise: 30.25,
        commDiyaShareWise: 20.75,
        netPnl: 500,
      },
      {
        key: 2,
        name: "Player 2",
        date: "2025-06-11",
        comm: 120.0,
        commDiya: 70.0,
        commLiyaShareWise: null,
        commDiyaShareWise: null,
        netPnl: -100,
      },
    ],
  };

  return (
    <Card
      className="sport_detail roulette"
      title={`${isAura} Details`}
      extra={
        <>
          <button onClick={() => {}}>Book</button>
          <button onClick={handleBackbtn}>Back</button>
        </>
      }
    >
      <div className="date_picker m-12">
        <RangePicker
          style={{ marginBottom: "10px" }}
          defaultValue={[dayjs(timeBefore), dayjs(time)]}
          onChange={onChange}
          bordered={false}
        />
      </div>

      <div ref={myElementRef} className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th style={{ width: "4%" }}></th>
              <th>Name</th>
              <th className="text-right">Comm Liya</th>
              <th className="text-right">Comm Diya</th>
              <th className="text-right">Comm Liya Share Wise</th>
              <th className="text-right">Comm Diya Share Wise</th>
              <th className="text-right">Pnl</th>
            </tr>
          </thead>
          <tbody>
            {rouletteData?.data?.map((res, id) => (
              <tr key={res?.key}>
                <td style={{ cursor: "pointer" }}>
                  <Dropdown
                    className="table_dropdown sport_droupdown"
                    open={dropdownStates[id]}
                    onOpenChange={() => toggleDropdown(id)}
                    menu={{ items, className: "sport_list" }}
                    trigger={["click", "contextMenu"]}
                  >
                    <a onClick={() => handleDroupDown(res?.date)}>
                      <Space>
                        <CaretDownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </td>
                <td>{res?.name} {res?.date}</td>
                <td className="text-right">{res?.comm?.toFixed(2)}</td>
                <td className="text-right">{res?.commDiya?.toFixed(2) || 0}</td>
                <td className="text-right">
                  {res?.commLiyaShareWise == null ? "NA" : res?.commLiyaShareWise?.toFixed(2)}
                </td>
                <td className="text-right">
                  {res?.commDiyaShareWise == null ? "NA" : res?.commDiyaShareWise?.toFixed(2)}
                </td>
                <td
                  className={`text-right ${
                    res?.netPnl - res?.comm < 0 ? "text_danger" : "text_success"
                  }`}
                >
                  {(res?.netPnl - res?.comm)?.toFixed(2)}
                </td>
              </tr>
            ))}

            {(rouletteData?.data === undefined || rouletteData?.data?.length === 0) && (
              <tr>
                <td colSpan={9}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RouletteDetail;
