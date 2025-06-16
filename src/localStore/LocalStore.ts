
export const getUserToken = () =>{
    const token = localStorage.getItem("TOKEN")
    return token ? JSON.parse(token):[]
} 

export const addNewUserToken = (token:string) =>{
    if(getUserToken()!=null){
        localStorage.setItem("TOKEN", JSON.stringify(token))
    }
}
export const removeUserToken = ()=>{
    localStorage.removeItem("TOKEN")
}