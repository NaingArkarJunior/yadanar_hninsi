const BASE_URL = "http://localhost:8000/"
// const BASE_URL = "http://localhost:8000/"

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,  
});

const submitLogin = (body) => {
    return new Promise((resolve, reject) => {
        instance.post(`login`,body)
            .then(response => {
                resolve(response.data)
                localStorage.setItem("@token", response.data.token)
                console.log("success")
            })
            .catch(error => {
                reject(error);
            })
    })
}

const getRatesList = () => {
    
    return new Promise((resolve,reject)=>{
        instance.get("records/room")
            .then(response=> resolve(response.data))
            .then(console.log(data))
            .catch(error=> {
            reject(error);
            })
        })        
}

const getBillList = () => {
    
    return new Promise((resolve,reject)=>{
        instance.get("bill")
            .then(response=> resolve(response.data))
            .then(console.log(data))
            .catch(error=> {
            reject(error);
            })
        })        
}

const addRecord = (body) => {
    return new Promise((resolve, reject) => {
        instance.post("record/update", body)
            .then(response => {
                alert("Successfully added")
                resolve(response.data)
            })
            .catch(error => {
                reject(error);
            })
    })
}