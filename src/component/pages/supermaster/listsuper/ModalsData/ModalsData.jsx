import { Modal, Spin } from "antd";
import "./ModalsData.scss";

const getColumnClass = (role, uType) => {
  // switch (role) {
  //   case "Sub Admin":
  //     return uType != 5 ? "d_none" : "";
  //   case "Master":
  //     return uType == 0 || uType == 5 ? "" : "d_none";
  //   case "SuperAgent":
  //     return uType == 0 || uType == 5 || uType == 1 ? "" : "d_none";
  //   default:
  //     return "";
  // }
};

const PartnershipTable = ({ title, dataKeys = [], details, uType }) => (
  <div className="sub_partnership">
    <div className="partnership_name">
      <p>{title}</p>
    </div>
    <div className="partnership_data">
      <table>
        <thead>
          <tr>
            {dataKeys.map(({ label }) => (
              <th key={label} className={getColumnClass(label, uType)}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {dataKeys.map(({ label, key }) => (
              <td key={label} className={getColumnClass(label, uType)}>
                {details[key] ?? ""}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ModalsData = ({
  partnershipDetails,
  loading,
  isModalOpen,
  handleCancel,
  userIds,
}) => {
  const uType = parseInt(localStorage.getItem("userType") || "5", 10);

  const defaultPartnershipDetails = {
    uplinepartership: 10,
    subadminpartnership: 20,
    supermasterpartnership: 25,
    masterpartnership: 30,
    dealerpartnership: 15,

    subadminoddsloss: 2,
    supermasteroddsloss: 1.5,
    masteroddsloss: 1.2,
    dealeroddsloss: 1,
    oddsloss: 0.8,

    subadminfancyloss: 1.8,
    supermasterfancyloss: 1.4,
    masterfancyloss: 1.1,
    dealerfancyloss: 0.9,
    fancyloss: 0.7,

    subadmincasinopartnership: 18,
    supermastercasinopartnership: 14,
    mastercasinopartnership: 11,
    dealercasinopartnership: 9,

    subadmincasinocommssion: 2.1,
    supermastercasinocommssion: 1.8,
    mastercasinocommssion: 1.5,
    dealercasinocommssion: 1.2,
    casinocommssion: 1,
  };

  const details = partnershipDetails || defaultPartnershipDetails;

  const tableConfigs = [
    {
      title: "Match Share",
      dataKeys: [
        { label: "Sub Admin", key: "subadminpartnership" },
        { label: "Master", key: "supermasterpartnership" },
        { label: "SuperAgent", key: "masterpartnership" },
        { label: "Agent", key: "dealerpartnership" },
        { label: "Client", key: "" },
      ],
    },
    {
      title: "Match Commission",
      dataKeys: [
        { label: "Sub Admin", key: "subadminoddsloss" },
        { label: "Master", key: "supermasteroddsloss" },
        { label: "SuperAgent", key: "masteroddsloss" },
        { label: "Agent", key: "dealeroddsloss" },
        { label: "Client", key: "oddsloss" },
      ],
    },
    {
      title: "Session Commission",
      dataKeys: [
        { label: "Sub Admin", key: "subadminfancyloss" },
        { label: "Master", key: "supermasterfancyloss" },
        { label: "SuperAgent", key: "masterfancyloss" },
        { label: "Agent", key: "dealerfancyloss" },
        { label: "Client", key: "fancyloss" },
      ],
    },
    {
      title: "Casino Share",
      dataKeys: [
        { label: "Sub Admin", key: "subadmincasinopartnership" },
        { label: "Master", key: "supermastercasinopartnership" },
        { label: "SuperAgent", key: "mastercasinopartnership" },
        { label: "Agent", key: "dealercasinopartnership" },
        { label: "Client", key: "" },
      ],
    },
    {
      title: "Casino Commission",
      dataKeys: [
        { label: "Sub Admin", key: "subadmincasinocommssion" },
        { label: "Master", key: "supermastercasinocommssion" },
        { label: "SuperAgent", key: "mastercasinocommssion" },
        { label: "Agent", key: "dealercasinocommssion" },
        { label: "Client", key: "casinocommssion" },
      ],
    },
  ];

  return (
    <Modal
      className="partnership"
      width={718}
      title={`PARTNERSHIP DETAILS - ${userIds}`}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className="ant-spin-nested-loading">
        {loading && (
          <div className="spin_icon">
            <Spin size="large" />
          </div>
        )}
        <div className="partnership">
          {tableConfigs.map((table) => (
            <PartnershipTable
              key={table.title}
              title={table.title}
              dataKeys={table.dataKeys}
              details={details}
              uType={uType}
            />
          ))}
        </div>
        <br />
      </div>
    </Modal>
  );
};

export default ModalsData;
