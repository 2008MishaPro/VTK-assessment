import axios from "axios";
import {API_URL} from "../GetUserLogin.ts";
import {getUserToken} from "../../localStore/LocalStore.ts";

export const fetchDataScheduleOnly= async () =>{
    try{
        const token = getUserToken()
        const response = await  axios.get(`${API_URL}/schedule-only`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data;
    }
    catch{
        console.log('Что-то пошло не так!')
        return false
    }
}