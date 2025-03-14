import axios from "axios";
import { addNewUserToken } from "../localStore/LocalStore";

interface LoginProps{
    email:string;
    password:string;
}
export const API_URL='http://mbl.vtk-portal.ru/api/v1'

export const GetUserToken= async ({email,password}:LoginProps) =>{
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