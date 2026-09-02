import { Button, Card, Empty, Input } from "antd";
import {
  AlertCircle,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useGetUserSeacrhMutation } from "../../../../store/service/SportDetailServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCode } from "../../../../store/constant";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const userType = {
  6: "Admin",
  5: "Mini Admin",
  4: "Master Agent",
  3: "Super Master",
  2: "Agent Master",
  1: "Client Master",
};

const UserSearch = () => {
  const [userName, setUserName] = useState("");
  const [searchedUserId, setSearchedUserId] = useState("");
  const [getUserDetails, { data: userData, isLoading, isError }] =
    useGetUserSeacrhMutation();
  const results = userData?.data || [];
  const hasSearched = Boolean(searchedUserId);

  const handleChange = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleShow = () => {
    setSearchedUserId(userName);
    getUserDetails({
      userId: userName,
    });
  };

  const nav = useNavigate();

  return (
    <>
      <div className="match_slip user_search main_live_section list_supers admin-details-panel user-search-panel">
        <AppPageHeader
          icon={<Search size={20} strokeWidth={1.8} />}
          title="User Search"
          subtitle="Find a user by ID"
          onBack={() => nav(-1)}
        />

        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail acc_name user-search-card">
          <section className="user-search-form-panel">
            <label className="user-search-label" htmlFor="user-search-id">
              User ID
            </label>
            <div className="user-search-form-row">
              <Input
                id="user-search-id"
                placeholder="Enter user ID"
                className="user_search_inp user-search-input"
                value={userName}
                allowClear
                prefix={<UserRound size={18} strokeWidth={1.9} />}
                onChange={handleChange}
                onPressEnter={handleShow}
              />
              <Button
                type="primary"
                className="show_btn_user approved-primary-button user-search-button"
                loading={isLoading}
                icon={<Search size={18} strokeWidth={2} />}
                onClick={handleShow}>
                Search
              </Button>
            </div>
            <p className="user-search-helper">
              <ShieldCheck size={16} strokeWidth={1.9} />
              Enter a user ID to retrieve matching user records.
            </p>
          </section>

          {hasSearched && (
            <section className="user-search-results-panel">
              <header className="user-search-results-header">
                <div className="user-search-results-title">
                  <span>
                    <UsersRound size={18} strokeWidth={1.9} />
                  </span>
                  <div>
                    <h2>
                      Matching Users <em>{results.length}</em>
                    </h2>
                    <p>Users found for ID: {searchedUserId}</p>
                  </div>
                </div>
              </header>

              {isError ? (
                <div className="user-search-state">
                  <AlertCircle size={38} strokeWidth={1.5} />
                  <strong>Unable to load users</strong>
                  <p>Please try the search again.</p>
                </div>
              ) : results.length > 0 ? (
                <div className="user-search-results-grid">
                  {results.map((item) => (
                    <article className="user-search-result-card" key={item?.userId}>
                      <span className="user-search-result-avatar">
                        <UserRound size={19} strokeWidth={1.9} />
                      </span>
                      <div>
                        <strong>{item?.userName}</strong>
                        <p>{convertCode(item?.userId)}</p>
                        <small>{userType?.[item?.userType]}</small>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="user-search-state">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>
                        <strong>No users found</strong>
                        <small>No matching records for this user ID.</small>
                      </span>
                    }
                  />
                </div>
              )}
            </section>
          )}
        </Card>
      </div>
    </>
  );
};

export default UserSearch;
