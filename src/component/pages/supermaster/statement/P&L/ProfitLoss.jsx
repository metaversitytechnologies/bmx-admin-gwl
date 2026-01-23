import TablePagination from "../../../common/TablePagination";

const data = [
  {
    key: "1",
    Date: "21 Jun 05:51 PM",
    Description: "Chips withdrawl from sup1 ( SA152471 ) by jbl [jbl]",
    PrevBal: "4700.00",
    CR: "0.00",
    DR: "4700.00",
    CommPlus: "0.00",
    CommMinus: "0.00",
    Balance: "0.00",
  },
  {
    key: "2",
    Date: "21 Jun 05:51 PM",
    Description: "Chips withdrawl from sup1 ( SA152471 ) by jbl [jbl]",
    PrevBal: "4700.00",
    CR: "0.00",
    DR: "4700.00",
    CommPlus: "0.00",
    CommMinus: "0.00",
    Balance: "0.00",
  },
  {
    key: "3",
    Date: "21 Jun 05:51 PM",
    Description: "Chips withdrawl from sup1 ( SA152471 ) by jbl [jbl]",
    PrevBal: "4700.00",
    CR: "0.00",
    DR: "4700.00",
    CommPlus: "0.00",
    CommMinus: "0.00",
    Balance: "0.00",
  },
];

const ProfitLoss = () => {
  return (
    <>
      <div className="table_section statement_tabs_data">
        <table className="">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Prev. Bal</th>
            <th>CR</th>
            <th>DR</th>
            <th>Comm+</th>
            <th>Comm-</th>
            <th>Balance</th>
          </tr>
          {data?.map((res) => {
            return (
              <tr key={res?.key}>
                <td>{res?.Date}</td>
                <td>{res?.Description}</td>
                <td>{res?.PrevBal}</td>
                <td className="text_success">{res?.CR}</td>
                <td className="text_danger">{res?.DR}</td>
                <td className="text_success">{res?.CommPlus}</td>
                <td className="text_danger">{res?.CommMinus}</td>
                <td>{res?.Balance}</td>
                {/* <td>{res?.wonby}</td> */}
              </tr>
            );
          })}
        </table>
        <div className="pagination_cus">
          <TablePagination className="pagination_main ledger_pagination" total={5} />
        </div>
      </div>
    </>
  );
};

export default ProfitLoss;
