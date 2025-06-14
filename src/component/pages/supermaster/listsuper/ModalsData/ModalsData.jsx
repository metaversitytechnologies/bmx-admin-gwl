import { Spin } from "antd";
import "./ModalsData.scss";

const ModalsData = ({ partnershipDetails, loading }) => {
  const uType = localStorage.getItem("userType") || 5;

  // Static data fallback
  const defaultPartnershipDetails = {
    uplinepartership: 10,
    subadminpartnership: 20,
    supermastepartnership: 25,
    masterpartership: 30,
    delearpartership: 15,

    subadminoddsloss: 2,
    supermasteroddsloss: 1.5,
    masteroddsloss: 1.2,
    agentoddsloss: 1,
    oddsloss: 0.8,

    subadminfancyloss: 1.8,
    supermasterfancyloss: 1.4,
    masterfancyloss: 1.1,
    agentfancyloss: 0.9,
    fancyloss: 0.7,
  };

  const details = partnershipDetails || defaultPartnershipDetails;

  return (
    <>
      <div className="ant-spin-nested-loading">
        {loading ? (
          <div className="spin_icon">
            <Spin size="large" />
          </div>
        ) : null}

        <div className="partnership">
          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Match Share</p>
            </div>
            <div className="partnership_data">
              <table>
                <tr>
                  <th>Up Line</th>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ? "" : "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>Super</th>
                  <th>Agent</th>
                </tr>
                <tr>
                  <td>{details.uplinepartership}</td>
                  <td className={uType != 5 && "d_none"}>{details.subadminpartnership}</td>
                  <td className={(uType == 0 || uType == 5) ? "" : "d_none"}>{details.supermastepartnership}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>{details.masterpartership}</td>
                  <td>{details.delearpartership}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Match Commission</p>
            </div>
            <div className="partnership_data">
              <table>
                <tr>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ? "" : "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>Super</th>
                  <th>Agent</th>
                  <th>Client</th>
                </tr>
                <tr>
                  <td className={uType != 5 && "d_none"}>{details.subadminoddsloss}</td>
                  <td className={(uType == 0 || uType == 5) ? "" : "d_none"}>{details.supermasteroddsloss}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>{details.masteroddsloss}</td>
                  <td>{details.agentoddsloss}</td>
                  <td>{details.oddsloss}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="sub_partnership">
            <div className="partnership_name">
              <p>Session Commission</p>
            </div>
            <div className="partnership_data">
              <table>
                <tr>
                  <th className={uType != 5 && "d_none"}>Sub Admin</th>
                  <th className={(uType == 0 || uType == 5) ? "" : "d_none"}>Master</th>
                  <th className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>Super</th>
                  <th>Agent</th>
                  <th>Client</th>
                </tr>
                <tr>
                  <td className={uType != 5 && "d_none"}>{details.subadminfancyloss}</td>
                  <td className={(uType == 0 || uType == 5) ? "" : "d_none"}>{details.supermasterfancyloss}</td>
                  <td className={(uType == 0 || uType == 5 || uType == 1) ? "" : "d_none"}>{details.masterfancyloss}</td>
                  <td>{details.agentfancyloss}</td>
                  <td>{details.fancyloss}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default ModalsData;
