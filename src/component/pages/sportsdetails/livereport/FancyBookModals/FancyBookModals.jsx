import { useFancyBookQuery } from "../../../../../store/service/FancyBookServices";
import { Empty } from "antd";

const FancyBookModals = ({ FancyId, id }) => {
  const { data } = useFancyBookQuery(
    {
      fancyId: FancyId,
      matchId: id,
    },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <>
      <div>
        <div className="run_amount_heading">
          <h3>Run</h3>
          <h3>Amount</h3>
        </div>
        {data?.data?.map((res, index) => {
          return (
            <div key={index} className="pnl">
              <p>{res?.odds}</p>
              <p
                className={`${res?.pnl >= 0 ? "text_success" : "text_danger"}`}>
                {res?.pnl}
              </p>
            </div>
          );
        })}
        {data?.data == null && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </>
  );
};

export default FancyBookModals;
