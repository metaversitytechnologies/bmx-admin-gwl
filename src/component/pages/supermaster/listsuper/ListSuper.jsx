import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, SlidersHorizontal, UsersRound } from "lucide-react";
import PropTypes from "prop-types";
import UserListTable from "../../../common/UserListTable";

const ListSuper = ({ forDeadClient }) => {
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
    nav(`/client/create-super/${Number(userTyep) + 1}`);
  };

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel">
        <div className="_match">
          <div className="sub_live_section live_report admin-details-header">
            <div className="admin-details-title-wrap">
              <span className="admin-details-icon">
                <UsersRound size={20} strokeWidth={1.8} />
              </span>
              <div>
                <div className="team_name admin-details-title">
                  {forDeadClient ? "Dead" : ""} {Listname?.replace("-", " ")}{" "}
                  Details
                </div>
                <p className="admin-details-subtitle">
                  Manage admin hierarchy and account access
                </p>
              </div>
            </div>
            <div className="show_btn">
              <button className="admin-details-back" onClick={handleBackClick}>
                <ArrowLeft size={15} strokeWidth={1.8} />
                Back
              </button>
            </div>
          </div>
          {!id && !forDeadClient && <div className="table_section "></div>}
        </div>
        <div>
          <div className="table_section sport_detail m-0 admin-details-table-shell">
            <UserListTable
              Listname={Listname}
              userType={userTyep}
              UserId={UserId}
              parentUserids={parentUserids}
              setParentUserIds={setParentUserIds}
              forDeadClient={forDeadClient}
              actionSlot={
                !id && !forDeadClient ? (
                  <div className="create_btn admin-details-actions">
                    <div onClick={handleCreate}>
                      <p>
                        <Link to="#" className="admin-details-primary-action">
                          <Plus size={14} strokeWidth={1.9} />
                          Create
                        </Link>
                      </p>
                    </div>
                    <div>
                      <p>
                        <Link
                          className="admin-details-secondary-action"
                          to={`/client/limitplusminus-super/${userTyep}`}>
                          <SlidersHorizontal size={14} strokeWidth={1.9} />
                          Update Limit
                        </Link>
                      </p>
                    </div>
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

ListSuper.propTypes = {
  forDeadClient: PropTypes.bool,
};

export default ListSuper;
