import mysql from 'mysql2'
import moment from 'moment'
import { UserData,RecordData,BillData,DeleteData } from './Types/userdata';
import { IRecordData, ISeachAllBills } from './Types/common';

function DBConnection(){
    return mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"admin",
      database:"treasure_rose"
    })
}

export const getUserLogin = (user_name:string,password:string,cb:(err:mysql.QueryError|null,results:UserData[]|null)=>void)=>{
    DBConnection().execute<UserData[]>(
      'SELECT * FROM `users` WHERE `user_name`=? AND `password`=?',
      [user_name,password],
      function(err, results) {
        cb(err,results)
      }
    )
  
  }

  export const getRecordList = (cb:(err:mysql.QueryError|null,result:RecordData[]|null)=>void)=>{
    DBConnection().execute<RecordData[]>(
      'SELECT *, `records`.`id` as `id`  FROM `record`  INNER JOIN  `bill` ON `record`.`bill_id`=`bill`.`id`;',
      function(err, results) {
        cb(err,results)
      }
    )
  
  }

  export const getBillList = (cb:(err:mysql.QueryError|null,result:BillData[]|null)=>void)=>{
    DBConnection().execute<BillData[]>(
      'SELECT * FROM `bill`',
      function(err, results) {
        cb(err,results)
      }
    )
  
  }

  export const getRecordData = (building:number,room_no:string,bill_id:number,month:string,cb:(err:mysql.QueryError|null,results:RecordData[]|null)=>void) => {
    let searchMonth = month ?  `AND month = '${month}'` : ``;
    let searchBill = bill_id ?  `AND bill_id = ${bill_id}` : ``
    DBConnection().execute<RecordData[]>(
        `SELECT *,records.id as id FROM records 
            INNER JOIN  bill ON records.bill_id = bill.id 
            WHERE flag = 0 AND building ='${building}' AND room_no = '${room_no}' ${searchBill} ${searchMonth}  
            ORDER BY month DESC`,
        function(err, results) {
          cb(err,results)
        }
    );
  }

  export const getAllRecordData = (props:ISeachAllBills,cb:(err:mysql.QueryError|null,results:RecordData[]|null)=>void) => {
    // let searchCreated = props.created_date ?  `AND created_date = '${props.created_date}'` : ``;
    let searchCode = props.code ?  `AND code = '${props.code}'` : ``;
    let searchMonth = props.month ?  `AND month = '${props.month}'` : ``;
    let searchBill = props.bill_id ?  `AND bill_id = ${props.bill_id}` : ``
    let searchCreatedByMonth = props.date_type == "month" ?`AND DATE_FORMAT(created_at,'%Y-%m') = '${moment(props.created_date).format("YYYY-MM")}'`:""
    let searchCreatedByDate = props.date_type == "date" ? `AND DATE_FORMAT(created_at,'%Y-%m-%d') = '${props.created_date}'`:""

    DBConnection().execute<RecordData[]>(
         `SELECT *,records.id as id FROM records 
            INNER JOIN  bill ON records.bill_id = bill.id 
            WHERE flag = 0 ${searchCode} ${searchBill} ${searchMonth} ${searchCreatedByMonth} ${searchCreatedByDate}
            ORDER BY month DESC`.replace(/[\r\n]/gm, ''),
        function(err, results) {
          cb(err,results)
        }
    );
  }


  export const createRecord=(building:string,room_no:string,u_id:number,bill_id:number,amount:number,month:string,code:string,cb:(err:mysql.QueryError|null,results:RecordData[]|null)=>void)=>{
    DBConnection().execute<RecordData[]>(
      "INSERT INTO `records` (`building`, `room_no`, `u_id`, `bill_id`, `amount`, `month`, `code`) VALUES (?,?,?,?,?,?,?)",
      [building,room_no,u_id,bill_id,amount,month,code],
      function(err,result){
        cb(err,result)
      }
    )
    
  }

  export const deleteRecord = (code:string,cb:(err:mysql.QueryError|null,results:DeleteData[]|null)=>void)=>{
    DBConnection().execute<DeleteData[]>(
      "UPDATE records SET flag = 1 WHERE code = ?",
      [code],
      function(err, results) {
        cb(err,results)
      }
    )
  
  }