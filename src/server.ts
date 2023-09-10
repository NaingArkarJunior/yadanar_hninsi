
import express, { Application, Request, Response, query } from "express";
import cors from "cors";
import bodyParser from "body-parser";  
import jwt from 'jsonwebtoken'
import path from "path";
import { getUserLogin,getRecordList,getRecordData,createRecord,getAllRecordData,getBillList } from "./DbAccessor";
import { IUserObject,IRecordBody,IRecordData,IAllRecordBody,IBillBody } from "./Types/common";


export const app: Application = express();

const APP_PASSWORD  = "@A%^^8BUuw31132"


app.use((req,res,next)=>{

   
    if(req.path !== "/records" || req.method === "GET") {
        return next()
    }

    console.warn(req.path,req.method)

    let token = req.headers["authorization"]

    if(!token) {
        return res.send({message:"Invalid Token " + req.path,code:403})
    }
    let tokenData = jwt.verify(token,APP_PASSWORD)
    
    if(tokenData) {
        console.warn("Token Data",tokenData)
        //@ts-ignore
        req.user = tokenData; 
        return next()
    }

    // if(tokenData) {return res.send(tokenData)}

    return res.send({message:"Access Denied ",code:403})
    
})



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(8000,()=>{
    console.log("server start...")
})

app.post('/login',(req:Request<any,any,any,IUserObject>,res)=>{
    let data=req.body    

    if(!data.username || !data.password){
        return res.send({message:"Username or password is empty",code:400})
    }

    getUserLogin(data.username,data.password,(err,result)=>{
        if(!result || !result[0]) {
            return res.send({message:"Invalid User",code:404})
        }
        let user = {
            user : result[0],           
            token: jwt.sign(result[0],APP_PASSWORD)
        }
        res.send({
            code:200,
            message:"success",
            data:user
        })
    })
})

app.get("/records",(req:Request<any,any,IRecordBody>,res)=>{
    
    getRecordList((err,data)=>{
        res.send(data)
    })
    
})

app.get("/bill",(req:Request<any,any,IBillBody>,res)=>{
    
    getBillList((err,data)=>{
        res.send(data)
    })
    
})


app.get("/records/all",(req:Request<any,any,any,IAllRecordBody>,res)=>{
    let query = req.query
    getAllRecordData(query.id,query.room_no,query.month,(err,data)=>{
        res.send(data)
    })
    
})

app.get("/records/room",(req:Request<any,any,any,IRecordBody>,res)=>{
    let query = req.query
    getRecordData(query.building,query.room_no,query.bill_id,query.month,(err,data)=>{
        if(err) return  res.send(err)
        res.send(data)
    })
    
})


app.post('/records',(req:Request<any,any,IRecordData>,res)=>{
    let data=req.body
    if(!data.building){
        return res.send({message:"building is empty",code: 400})
    }
    if(!data.room_no){
        return res.send({message:"room_number is empty",code: 400})
    }
    if(!data.bill_id){
        return res.send({message:"bill_id is empty",code: 400})
    }
    if(!data.amount){
        return res.send({message:"amount is empty",code: 400})
    }
    if(!data.month){
        return res.send({message:"month is empty",code: 400})
    }
    if(!data.code){
        return res.send({message:"month is empty",code: 400})
    }


    //@ts-ignore
    let u_id = req.user.id;

    console.log("U_ID",u_id)

    createRecord(data.building,data.room_no,u_id,data.bill_id,data.amount,data.month,data.code,(err,result)=>{
        if(err){
            return res.send({message:err.message,code:500})
        }
        return res.send({message:"Success",code:200,data:result})

    })
})