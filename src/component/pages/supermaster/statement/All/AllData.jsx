import TablePagination from "../../../common/TablePagination";
import { useAccountstatementQuery } from "../../../../../store/service/supermasteAccountStatementServices";
import React,{ useEffect } from "react";
import moment from "moment";


const AllData = ({dateData}) => {


  const {data} = useAccountstatementQuery({
    index:"0",
    noOfRecords:"20",
    fromDate:dateData[0],
    toDate:dateData[1],
    userid:"",
    type:1
  },{refetchOnMountOrArgChange:true})


  return (
    <>
      <div className="table_section statement_tabs_data" style={{marginTop:"15px"}}>
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
          {data?.data?.dataList?.map((res) => {
            return (
              <tr key={res?.key}>
                <td>{moment(res?.date).format("YYYY-MM-DD, h:mm A")}</td>
                <td>{res?.remark}</td>
                <td>??</td>
                <td className="text_success">{res?.credit}</td>
                <td className="text_danger">{res?.debit}</td>
                <td className="text_success">??</td>
                <td className="text_danger">??</td>
                <td>{res?.pts}</td>
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

export default React.memo(AllData);
