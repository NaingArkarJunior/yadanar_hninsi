export function resSuccess(data:any){
    return {
        status:200,
        message:"Success",
        data:data
    }
}


export function resCreateSuccess(data:any){
    return {
        status:200,
        message:"SuccessFully Created",
        data:data
    }
}



export function resFail(error:any){
    return {
        status:500,
        message:"Internal Server Error",
        error:error
    }
}


export function validationFail(error:any){
    return {
        status:400,
        message:"Invalid Request",
        error:error
    }
}


export function resNotFound(error:any){
    return {
        status:404,
        message:"Empty Data or File not Found",
        error:error
    }
}

export function resUnAuthoirize(error:any){
    return {
        status:403,
        message:"UnAuthorize",
        error:error
    }
}