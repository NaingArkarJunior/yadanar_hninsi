import mysql from 'mysql2'


export interface UserData extends mysql.RowDataPacket {
    id:number,
    name:string,
    user_name:string,
    password:string,
    phone:number
}

export interface RecordData extends mysql.RowDataPacket {
    id:number,
    builing:string,
    room_no:string,
    u_id:number,
    bill_id:number,
    amount:number,
    month:string
}

export interface BillData extends mysql.RowDataPacket {
    id:number,
    bill_name:string,
}

export interface DeleteData extends mysql.RowDataPacket {
    id:string,
    room_no:string
}