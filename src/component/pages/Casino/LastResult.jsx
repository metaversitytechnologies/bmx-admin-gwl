import { Tag } from "antd";
import { useCasinoResultQuery } from "../../../store/service/casinoService";
import { LetterAndColorById, tableIdtoUrl } from "./Constant";
import { useParams } from "react-router-dom";

const LastResult = () => {
  const { id } = useParams();
  const casinoName = tableIdtoUrl[id];
  const { data } = useCasinoResultQuery(casinoName);

  return (
    <div className="ant-row gx-mb-3 gx-pt-4">
      <div style={{ display: "inline-block" }}>Last 10 winners:</div>
      {data?.map((items) => {
        return (
          <Tag
            key={items?.mid}
            style={{
              borderRadius: 0,
            }}
            color="rgb(16, 142, 233)">
            {LetterAndColorById[id]?.[items.result]?.label}
          </Tag>
        );
      })}
    </div>
  );
};

export default LastResult;
