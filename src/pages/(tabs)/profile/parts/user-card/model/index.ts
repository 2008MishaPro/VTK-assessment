import {useEffect, useState} from "react";
import {GetUserData} from "../../../../../../API/GetUserLogin.ts";
import {Profile} from "./types.ts";

export const UserData = () =>{
    const [profileData, setProfileData] = useState<Profile>({email: "", full_name: "", group_name: ""});
    useEffect(() => {
        const showData = async () => {
            const data = await GetUserData();
            setProfileData({
                email: data.email,
                full_name: data.full_name,
                group_name: data.group_name,
            });
            return data;
        };
        showData();
    }, []);
    return {
        profileData,
        setProfileData
    }
}