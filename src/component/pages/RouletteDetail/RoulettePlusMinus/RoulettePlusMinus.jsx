import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RoulettePlusMinus.scss";
import { useEffect, useState } from "react";
import { Spin } from "antd";
// import { useCasinoBetListNewQuery } from "../../../../store/service/CasinoServices"; // Comment out or remove this import

const RoulettePlusMinus = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { state } = useLocation();
  const { id } = useParams();

  // Dummy Data for plusMinusNew
  const plusMinusNew = {
    data: {
      subadmin1: {
        groupName: "madmin",
        supermaster2: {
          groupName: "supermaster",
          master3: {
            groupName: "master",
            agent4: {
              groupName: "agent",
              users: {
                clientA: {
                  totalAmount: 1000,
                  totalComm: 50,
                  dealer: {
                    totalComm: 10,
                    netAmount: 90,
                    shareAmount: 5,
                    finalAmount: 85,
                  },
                  master: {
                    totalComm: 8,
                    netAmount: 80,
                    shareAmount: 4,
                    finalAmount: 76,
                  },
                  superMaster: {
                    totalComm: 6,
                    netAmount: 70,
                    shareAmount: 3,
                    finalAmount: 67,
                  },
                  subAdmin: {
                    totalComm: 4,
                    netAmount: 60,
                    shareAmount: 2,
                    finalAmount: 58,
                  },
                },
                clientB: {
                  totalAmount: 1500,
                  totalComm: 75,
                  dealer: {
                    totalComm: 15,
                    netAmount: 135,
                    shareAmount: 7,
                    finalAmount: 128,
                  },
                  master: {
                    totalComm: 12,
                    netAmount: 120,
                    shareAmount: 6,
                    finalAmount: 114,
                  },
                  superMaster: {
                    totalComm: 9,
                    netAmount: 105,
                    shareAmount: 5,
                    finalAmount: 100,
                  },
                  subAdmin: {
                    totalComm: 6,
                    netAmount: 90,
                    shareAmount: 3,
                    finalAmount: 87,
                  },
                },
              },
              total: {
                totalAmount: 2500,
                totalComm: 125,
                dealer: {
                  totalComm: 25,
                  netAmount: 225,
                  shareAmount: 12,
                  finalAmount: 213,
                },
                master: {
                  totalComm: 20,
                  netAmount: 200,
                  shareAmount: 10,
                  finalAmount: 190,
                },
                superMaster: {
                  totalComm: 15,
                  netAmount: 175,
                  shareAmount: 8,
                  finalAmount: 167,
                },
                subAdmin: {
                  totalComm: 10,
                  netAmount: 150,
                  shareAmount: 5,
                  finalAmount: 145,
                },
              },
            },
          },
        },
        total: {
          totalAmount: 2500,
          totalComm: 125,
          dealer: {
            totalComm: 25,
            netAmount: 225,
            shareAmount: 12,
            finalAmount: 213,
          },
          master: {
            totalComm: 20,
            netAmount: 200,
            shareAmount: 10,
            finalAmount: 190,
          },
          superMaster: {
            totalComm: 15,
            netAmount: 175,
            shareAmount: 8,
            finalAmount: 167,
          },
          subAdmin: {
            totalComm: 10,
            netAmount: 150,
            shareAmount: 5,
            finalAmount: 145,
          },
        },
      },
    },
  };
  const isLoading = false; // Set isLoading to false as we are using dummy data

 

  const uType = 5; // You might want to get this from localStorage or a global state in a real application

  return (
    <>
      <div className="main_live_section list_supers">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name"
            >
              <p>
                {uType == 5
                  ? "madmin"
                  : uType == 0
                  ? "Super Master "
                  : uType == 1
                  ? "Master "
                  : uType == 2
                  ? "Agent "
                  : ""}{" "}
                Company Report
              </p>{" "}
              <p style={{ fontSize: "16px" }}>
                {state?.isAuraDetails} {state?.rouletteDate}{" "}
              </p>
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <div>
          <div
            className="table_section"
            style={{ overflowX: "auto", position: "relative" }}
          >
            <table className="plus-table plus_minus_sec">
              <tbody>
                {plusMinusNew?.data &&
                  Object.keys(plusMinusNew?.data).map((item, id) => (
                    <RecursiveTable
                      key={id}
                      data={plusMinusNew?.data[item]}
                      title={item}
                    />
                  ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="plus_spin">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoulettePlusMinus;

const RecursiveTable = ({ data, title }) => {
  const [arrayState, setArrayState] = useState([]);

  // Use a dummy userType for demonstration, or keep localStorage if it's consistently available
  const uType = localStorage.getItem("userType") || "5"; 

  useEffect(() => {
    let returnArr = [];

    if (data?.groupName === "subadmin") {
      returnArr.push(
        <tr className="sub_color">
          <td>&nbsp;</td>
          <td style={{ whiteSpace: "nowrap" }}>madmin</td>
          <td colSpan={34}>
            <strong>{title}</strong>
          </td>
        </tr>
      );
    } else if (data?.groupName === "supermaster") {
      returnArr.push(
        <tr className="master_color">
          <td colSpan={2}>&nbsp;</td>
          <td style={{ whiteSpace: "nowrap" }}>MASTER </td>
          <td colSpan={32}>
            <strong>{title}</strong>
          </td>
        </tr>
      );
    } else if (data?.groupName === "master") {
      returnArr.push(
        <tr className="super_color">
          <td colSpan={3}>&nbsp;</td> <td>SUPER </td>
          <td colSpan={31}>
            <strong>{title}</strong>
          </td>
        </tr>
      );
    } else if (data?.groupName === "agent") {
      returnArr.push(
        <tr className="agent_color">
          <td colSpan={4}>&nbsp;</td> <td>Agent </td>
          <td colSpan={29}>
            <strong>{title}</strong>
          </td>
        </tr>
      );
    }
    if (data) {
      Object.keys(data).forEach((item) => {
        if (!["groupName", "total", "users"].includes(item)) {
          returnArr = [
            ...returnArr,
            <RecursiveTable data={data[item]} title={item} />,
          ];
        } else if (item === "users") {
          const clientRows = Object.keys(data[item]).map((userKey) => (
            <>
              <tr className="border_tr">
                <td>
                  <strong>{userKey}</strong>
                </td>

                <td
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                >
                  <strong>{data[item][userKey].totalAmount?.toFixed(2)}</strong>
                </td>

                <td
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                >
                  {data[item][userKey]?.totalComm?.toFixed(2)}
                </td>

                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                >
                  <strong>
                    {data[item][userKey]?.dealer?.totalComm?.toFixed(2)}
                  </strong>
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                >
                  {data[item][userKey]?.dealer?.netAmount?.toFixed(2)}
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                >
                  {data[item][userKey]?.dealer?.shareAmount?.toFixed(2)}
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 || uType == 2
                      ? ""
                      : "d_none"
                  }
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                >
                  <strong>
                    {data[item][userKey]?.dealer?.finalAmount?.toFixed(2)}
                  </strong>
                </td>

                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                  }
                >
                  <strong>
                    {data[item][userKey]?.master?.totalComm?.toFixed(2)}
                  </strong>
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                  }
                >
                  {data[item][userKey]?.master?.netAmount?.toFixed(2)}
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                  }
                >
                  {data[item][userKey]?.master?.shareAmount?.toFixed(2)}
                </td>
                <td
                  className={
                    uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                  }
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                >
                  <strong>
                    {data[item][userKey]?.master?.finalAmount?.toFixed(2)}
                  </strong>
                </td>
                <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                  <strong>
                    {data[item][userKey]?.superMaster?.totalComm?.toFixed(2)}
                  </strong>
                </td>
                <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                  {data[item][userKey]?.superMaster?.netAmount?.toFixed(2)}
                </td>
                <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                  {data[item][userKey]?.superMaster?.shareAmount?.toFixed(2)}
                </td>
                <td
                  className={uType == 5 || uType == 0 ? "" : "d_none"}
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                >
                  <strong>
                    {data[item][userKey]?.superMaster?.finalAmount?.toFixed(2)}
                  </strong>
                </td>
                <td className={uType != 5 ? "d_none" : ""}>
                  <strong>
                    {data[item][userKey]?.subAdmin?.totalComm?.toFixed(2)}
                  </strong>
                </td>
                <td className={uType != 5 ? "d_none" : ""}>
                  {data[item][userKey]?.subAdmin?.netAmount?.toFixed(2)}
                </td>
                <td className={uType != 5 ? "d_none" : ""}>
                  {data[item][userKey]?.subAdmin?.shareAmount?.toFixed(2)}
                </td>
                <td
                  className={uType != 5 ? "d_none" : ""}
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: "rgb(174, 174, 174)",
                  }}
                >
                  <strong>
                    {data[item][userKey]?.subAdmin?.finalAmount?.toFixed(2)}
                  </strong>
                </td>
              </tr>
            </>
          ));
          const dynamicHeader = (
            <tr style={{ textAlign: "center", color: "#545454" }}>
              <th
                colSpan={2}
                className={`
                  ${data?.groupName === "agent" ? "agentBackgroundColor" : ""}
                  ${data?.groupName === "master" ? "masterBackgroundColor" : ""}
                  ${data?.groupName === "supermaster" ? "superBackgroundColor" : ""}
                  ${data?.groupName === "subadmin" ? "subBackgroundColor" : ""}
                `}
              >
                {" "}
                {title}
              </th>
              <th
                className={`sub_agent_heading ${
                  uType == 0 || uType == 1 || uType == 2 || uType == 5
                    ? ""
                    : "d_none"
                }`}
              >
                CLIENT PLUS MINUS
              </th>
              <th
                className={`sub_agent_heading ${
                  uType == 0 || uType == 1 || uType == 2 || uType == 5
                    ? ""
                    : "d_none"
                }`}
                colSpan={4}
              >
                AGENT PLUS MINUS
              </th>
              <th
                className={`sub_agent_heading ${
                  uType == 0 || uType == 1 || uType == 5 ? "" : "d_none"
                }`}
                colSpan={4}
              >
                SUPER PLUS MINUS
              </th>
              <th
                className={`sub_agent_heading ${
                  uType == 0 || uType == 5 ? "" : "d_none"
                }`}
                colSpan={4}
              >
                MASTER PLUS MINUS
              </th>
              <th
                className={`sub_agent_heading ${uType != 5 ? "d_none" : ""}`}
                colSpan={4}
              >
                SUBADMIN PLUS MINUS
              </th>
            </tr>
          );

          const dynamicSubHeader = (
            <tr style={{ textAlign: "center" }} className="border_tr">
              <td>
                <strong>CLIENT</strong>
              </td>

              <td
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                <strong>CASINO AMT</strong>
              </td>

              <td
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                <strong>CASINO COM </strong>
              </td>

              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>CASINO COM</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>NET AMT</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>SHR AMT</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                <strong>FINAL</strong>
              </td>

              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>CASINO COM</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>NET AMT</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                <strong>SHR AMT</strong>
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                <strong>FINAL</strong>
              </td>

              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                <strong>CASINO COM</strong>
              </td>
              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                <strong>NET AMT</strong>
              </td>
              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                <strong>SHR AMT</strong>
              </td>
              <td
                className={uType == 5 || uType == 0 ? "" : "d_none"}
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                <strong>FINAL</strong>
              </td>

              <td className={uType != 5 ? "d_none" : ""}>
                <strong>CASINO COM</strong>
              </td>
              <td className={uType != 5 ? "d_none" : ""}>
                <strong>NET AMT</strong>
              </td>
              <td className={uType != 5 ? "d_none" : ""}>
                <strong>SHR AMT</strong>
              </td>
              <td
                className={uType != 5 ? "d_none" : ""}
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                <strong>FINAL</strong>
              </td>
            </tr>
          );
          returnArr = [
            ...returnArr,
            dynamicHeader,
            dynamicSubHeader,
            ...clientRows,
          ];
        }
      });
      if (data?.total) {
        const totalRows = (
          <>
            <tr className="border_tr">
              <td>&nbsp;</td>
            </tr>
            <tr className="border_tr">
              <td>
                <strong>{data.groupName} .TOTAL</strong>
              </td>

              <td
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                {data?.total?.totalAmount?.toFixed(2)}
              </td>

              <td
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                {data?.total?.totalComm?.toFixed(2)}
              </td>

              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                {data?.total?.dealer?.totalComm?.toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                {data?.total?.dealer?.netAmount?.toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
              >
                {data?.total?.dealer?.shareAmount?.toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 || uType == 2
                    ? ""
                    : "d_none"
                }
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                {data?.total?.dealer?.finalAmount?.toFixed(2)}
              </td>

              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                {(data?.total?.master?.totalComm).toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                {data?.total?.master?.netAmount?.toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
              >
                {data?.total?.master?.shareAmount?.toFixed(2)}
              </td>
              <td
                className={
                  uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
                }
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                {data?.total?.master?.finalAmount?.toFixed(2)}
              </td>

              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                {data?.total?.superMaster?.totalComm?.toFixed(2)}
              </td>
              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                {data?.total?.superMaster?.netAmount?.toFixed(2)}
              </td>
              <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
                {data?.total?.superMaster?.shareAmount?.toFixed(2)}
              </td>
              <td
                className={uType == 5 || uType == 0 ? "" : "d_none"}
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                {data?.total?.superMaster?.finalAmount?.toFixed(2)}
              </td>

              <td className={uType != 5 ? "d_none" : ""}>
                {data?.total?.subAdmin?.totalComm?.toFixed(2)}
              </td>
              <td className={uType != 5 ? "d_none" : ""}>
                {data?.total?.subAdmin?.netAmount?.toFixed(2)}
              </td>
              <td className={uType != 5 ? "d_none" : ""}>
                {data?.total?.subAdmin?.shareAmount?.toFixed(2)}
              </td>
              <td
                className={uType != 5 ? "d_none" : ""}
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "rgb(174, 174, 174)",
                }}
              >
                {data?.total?.subAdmin?.finalAmount?.toFixed(2)}
              </td>
            </tr>
          </>
        );
        returnArr = [...returnArr, totalRows];
      }
    }
    setArrayState(returnArr);
  }, [data, uType]); // Added uType to dependency array

  return arrayState;
};