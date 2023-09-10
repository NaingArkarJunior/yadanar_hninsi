export interface IUserObject {
    username  : string,
    password : number
}


export interface IRecordBody {
    building :number,
    room_no : string,
    bill_id: number,
    month: string
}

export interface IBillBody {
    id :number,
    bill_name : string,
}

export interface IAllRecordBody {
    id :number,
    room_no : string,
    month: string
}

export interface IRecordData {
    building :string,
    room_no : string,
    bill_id:number,
    amount:number,
    month:string,
    code:string
}