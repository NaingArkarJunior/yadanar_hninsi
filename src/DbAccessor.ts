import mysql from 'mysql2'
import { UserData,RecordData,BillData } from './Types/userdata';

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
      'SELECT *, `record`.`id` as `id`  FROM `record`  INNER JOIN  `bill` ON `record`.`bill_id`=`bill`.`id`;',
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
        `SELECT *,record.id as id FROM record INNER JOIN  bill ON record.bill_id = bill.id WHERE building ='${building}' AND room_no = '${room_no}' ${searchBill} ${searchMonth}  ORDER BY month DESC`,
        function(err, results) {
          cb(err,results)
        }
    );
  }

  export const getAllRecordData = (id:number,room_no:string,month:string,cb:(err:mysql.QueryError|null,results:RecordData[]|null)=>void) => {
    DBConnection().execute<RecordData[]>(
        'SELECT * FROM `record` WHERE id =? AND room_no = ? AND month = ?',
        [id,room_no,month],
        function(err, results) {
          cb(err,results)
        }
    );
  }


  export const createRecord=(building:string,room_no:string,u_id:number,bill_id:number,amount:number,month:string,code:string,cb:(err:mysql.QueryError|null,results:RecordData[]|null)=>void)=>{
    DBConnection().execute<RecordData[]>(
      "INSERT INTO `record` (`building`, `room_no`, `u_id`, `bill_id`, `amount`, `month`, `code`) VALUES (?,?,?,?,?,?,?)",
      [building,room_no,u_id,bill_id,amount,month,code],
      function(err,result){
        cb(err,result)
      }
    )
    
  }
