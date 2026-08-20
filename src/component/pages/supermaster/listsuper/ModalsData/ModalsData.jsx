import { Modal, Spin } from "antd";

const getColumnClass = (role, uType) => {
  const hiddenRolesByType = {
    7: [], // show all
    6: ["SuperAdmin"],
    5: ["SuperAdmin", "Admin"],
    4: ["SuperAdmin", "Admin", "madmin"],
    3: ["SuperAdmin", "Admin", "madmin", "Master"],
    2: ["SuperAdmin", "Admin", "madmin", "Master", "SuperAgent"],
  };

  const hiddenRoles = hiddenRolesByType[uType] || [];
  return hiddenRoles.includes(role) ? "d_none" : "";
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
  const uType = parseInt(localStorage.getItem("userType"));

  const details = partnershipDetails;

  const tableConfigs = [
    {
      title: "Match Share",
      dataKeys: [
        { label: "SuperAdmin", key: "uplinepartnership" },
        { label: "Admin", key: "adminpartnership" },
        { label: "madmin", key: "subadminpartnership" },
        { label: "Master", key: "supermasterpartnership" },
        { label: "SuperAgent", key: "masterpartnership" },
        { label: "Agent", key: "dealerpartnership" },
        { label: "Client", key: "" },
      ],
    },
    {
      title: "Match Commission",
      dataKeys: [
        { label: "Admin", key: "adminoddsloss" },
        { label: "madmin", key: "subadminoddsloss" },
        { label: "Master", key: "supermasteroddsloss" },
        { label: "SuperAgent", key: "masteroddsloss" },
        { label: "Agent", key: "dealeroddsloss" },
        { label: "Client", key: "oddsloss" },
      ],
    },
    {
      title: "Session Commission",
      dataKeys: [
        { label: "Admin", key: "adminfancyloss" },
        { label: "madmin", key: "subadminfancyloss" },
        { label: "Master", key: "supermasterfancyloss" },
        { label: "SuperAgent", key: "masterfancyloss" },
        { label: "Agent", key: "dealerfancyloss" },
        { label: "Client", key: "fancyloss" },
      ],
    },
    {
      title: "Casino Share",
      dataKeys: [
        { label: "SuperAdmin", key: "uplinecasinopartnership" },
        { label: "Admin", key: "admincasinopartnership" },
        { label: "madmin", key: "subadmincasinopartnership" },
        { label: "Master", key: "supermastercasinopartnership" },
        { label: "SuperAgent", key: "mastercasinopartnership" },
        { label: "Agent", key: "dealercasinopartnership" },
        { label: "Client", key: "" },
      ],
    },
    {
      title: "Casino Commission",
      dataKeys: [
        { label: "Admin", key: "admincasinocommssion" },
        { label: "madmin", key: "subadmincasinocommssion" },
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
      okButtonProps={{ style: { display: "none" } }}>
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
