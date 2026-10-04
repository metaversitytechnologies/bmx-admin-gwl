import { useEffect } from "react";
import { Modal } from "antd";
import { Coins, X } from "lucide-react";
import PropTypes from "prop-types";
import { useLazyGetUserLabilatyQuery } from "../../store/service/SportDetailServices";
import ExposureView from "./ExposureView";
import "./Exposure.scss";

const Exposure = ({ openExp, setOpenExp, userId }) => {
  const [trigger, { data: exposureData, isLoading }] = useLazyGetUserLabilatyQuery();

  useEffect(() => {
    if (userId) {
      trigger({ userId: userId });
    }
  }, [userId, trigger]);

  const sessionData = exposureData?.data?.filter((Item) => Item?.marketType === "Fancy");
  const matchData = exposureData?.data?.filter((Item) => Item?.marketType !== "Fancy");

  return (
    <Modal
      width={1100}
      className="user-exposure-modal"
      title={
        <div className="exposure-heading">
          <span className="exposure-heading-icon" aria-hidden="true"><Coins size={24} strokeWidth={1.8} /></span>
          <div>
            <h1>User Exposure</h1>
            <p>View your exposure, loss and profit details.</p>
          </div>
        </div>
      }
      closeIcon={<X size={23} strokeWidth={1.8} />}
      open={openExp}
      onCancel={() => setOpenExp(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={null}>
      <ExposureView matchData={matchData || []} sessionData={sessionData || []} isLoading={isLoading} />
    </Modal>
  );
};

Exposure.propTypes = {
  openExp: PropTypes.bool,
  setOpenExp: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Exposure;
