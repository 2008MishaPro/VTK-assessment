import axios from "axios";
import { addNewUserToken, getUserToken } from "../localStore/LocalStore";

interface LoginProps{
    email:string;
    password:string;
}
export const API_URL='http://mbl.vtk-portal.ru/api/v1'

export const LoginUser= async ({email,password}:LoginProps) =>{
    try{
        const response = await  axios.post(`${API_URL}/auth/login`, {email,password},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        addNewUserToken(response.data.token)
        return response.data; 
    }
    catch{
        console.log('Что-то пошло не так!')
        return false
    }
}

export const GetUserData = async () =>{
    try {
        const token = getUserToken()
        if(token){
            const response = await axios.get(`${API_URL}/user/my`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return response.data
        }
    } catch (error) {
            return `Произошла ошибка ${error}`
    }
}