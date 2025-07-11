import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import "./ListSuper.scss";
import UserListTable from "../../../common/UserListTable";

const ListSuper = () => {
  const { userTyep, Listname } = useParams();
  const UserId = localStorage.getItem("userId");
  const [parentUserids, setParentUserIds] = useState(UserId);

  useEffect(() => {
    setParentUserIds(UserId);
  }, [UserId]);

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const handleCreate = () => {
    if (Listname === "Master") {
      nav("/client/create-super");
    } else if (Listname === "Super") {
      nav("/client/create-agent");
    } else if (Listname === "Agent") {
      nav("/client/create-dealer");
    } else {
      nav("/client/create-client");
    }
  };

  return (
    <>
      <div className="main_live_section list_supers">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "26px" }}
              className="team_name">
              {Listname} Details
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
          {!id && <div className="table_section "></div>}
        </div>
        <div>
          {!id && (
            <div className="create_btn">
              <div onClick={handleCreate}>
                <p>
                  <Link to="#">
                    <AiOutlinePlus />
                    {""}
                    Create
                  </Link>
                </p>
              </div>
              <div>
                <p>
                  <Link to="/client/limitplusminus-super/demo01">
                    Update Limit
                  </Link>
                </p>
              </div>
            </div>
          )}
          <div className="table_section sport_detail m-0">
            <UserListTable
              Listname={Listname}
              userType={userTyep}
              UserId={UserId}
              parentUserids={parentUserids}
              setParentUserIds={setParentUserIds}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSuper;
