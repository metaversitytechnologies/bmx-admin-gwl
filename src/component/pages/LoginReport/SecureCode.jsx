import { Button, Card, Empty, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CalendarClock,
  FileKey2,
  KeyRound,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useLazyGetSecureCodeQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { convertCode, convertCodeReverse } from "../../../store/constant";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const SecureCode = () => {
  const userId = localStorage.getItem("userId");
  const [clientId, setClientId] = useState(userId);
  const [hasSearched, setHasSearched] = useState(false);

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const [trigger, { data: secureData, isLoading, isFetching, isError }] =
    useLazyGetSecureCodeQuery();

  const handleShow = () => {
    setHasSearched(true);
    trigger({
      userId: clientId,
    });
  };

  const results = secureData?.data || [];
  const hasResults = !isError && results.length > 0;
  const showInitialState = !hasSearched && !isLoading && !isFetching;
  const showEmptyState =
    hasSearched && !isError && !isLoading && !isFetching && results.length === 0;

  return (
    <>
      <div className="match_slip main_live_section list_supers admin-details-panel secure-code-panel">
        <AppPageHeader
          icon={<KeyRound size={20} strokeWidth={1.8} />}
          title="Secure Code"
          subtitle="Look up a client's secure login codes"
          onBack={handleBackClick}
        />
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail team_name secure-code-card">
          <section className="secure-code-lookup">
            <div className="secure-code-section-heading">
              <h2>Client Secure Code Lookup</h2>
              <p>Search a client account to view its current secure OTP.</p>
            </div>

            <div className="secure-code-form-row">
              <label className="secure-code-field">
                <span>Client Code</span>
                <Input
                  className="secure-code-input"
                  prefix={<UserRound size={17} strokeWidth={1.9} />}
                  placeholder="Enter client code"
                  defaultValue={convertCode(userId)}
                  onChange={(e) =>
                    setClientId(convertCodeReverse(e.target.value))
                  }
                  onPressEnter={handleShow}
                />
              </label>
              <Button
                className="approved-primary-button secure-code-show"
                icon={<Search size={17} strokeWidth={2} />}
                loading={isLoading || isFetching}
                disabled={isLoading || isFetching}
                onClick={handleShow}>
                {isLoading || isFetching ? "Retrieving" : "Show"}
              </Button>
            </div>

            <div className="secure-code-helper">
              <ShieldCheck size={16} strokeWidth={2} />
              <span>
                Enter a valid client code to retrieve secure login information.
              </span>
            </div>
          </section>

          <section className="secure-code-results">
            <div className="secure-code-results-header">
              <div className="secure-code-results-title">
                <span>
                  <FileKey2 size={20} strokeWidth={1.9} />
                </span>
                <div>
                  <h2>Secure Code Details</h2>
                  <p>
                    {hasResults
                      ? `${results.length} result${
                          results.length === 1 ? "" : "s"
                        } found for "${convertCode(clientId)}"`
                      : "Secure login lookup results"}
                  </p>
                </div>
              </div>
              {hasResults && (
                <span className="secure-code-status">
                  <i />
                  Available
                </span>
              )}
            </div>


            <div className="table_section statement_tabs_data ant-spin-nested-loading secure-code-table-scroll">
              <table className="live_table login_data_table secure-code-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>OTP</th>
                    <th>
                      <span>
                        <CalendarClock size={14} strokeWidth={2} />
                        Created On
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(isLoading || isFetching) && (
                    <tr>
                      <td className="secure-code-state-cell" colSpan={3}>
                        <CustomLoading />
                      </td>
                    </tr>
                  )}

                  {hasResults &&
                    results.map((res, id) => (
                    <tr key={id}>
                        <td className="secure-code-code">
                          {convertCode(res?.userId)}
                        </td>
                        <td className="secure-code-otp">{res?.secureCode}</td>
                        <td className="secure-code-date">{res?.createdOn}</td>
                    </tr>
                    ))}

                  {showInitialState && (
                    <tr>
                      <td className="secure-code-state-cell" colSpan={3}>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span>
                              <strong>Search a client code</strong>
                              <small>
                                Enter a valid client code above to view secure
                                login information.
                              </small>
                            </span>
                          }
                        />
                      </td>
                    </tr>
                  )}

                  {showEmptyState && (
                    <tr>
                      <td className="secure-code-state-cell" colSpan={3}>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span>
                              <strong>No secure code found</strong>
                              <small>
                                Check the client code and try again.
                              </small>
                            </span>
                          }
                        />
                      </td>
                    </tr>
                  )}

                  {isError && !isLoading && !isFetching && (
                    <tr>
                      <td className="secure-code-state-cell" colSpan={3}>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span>
                              <strong>Unable to retrieve secure code</strong>
                              <small>
                                Please check the client code and try again.
                              </small>
                            </span>
                          }
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </Card>
      </div>
    </>
  );
};

export default SecureCode;
