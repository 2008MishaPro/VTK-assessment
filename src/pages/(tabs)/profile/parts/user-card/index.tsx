import {UserData} from './model'
import styles from './styles.module.css'
import {info} from "../../../../../trash";
import {GroupInfoCard} from "./parts/group-more-info";

export const UserCard = () =>{
    const {profileData} = UserData();
    const groupName = profileData.group_name.split("-")[0]
    return (
        <section className={styles.container}>
            <div className={styles.blankAvatar}>
                <p>{profileData.full_name}</p>
            </div>
            {
                info.map(info=>{
                    if(info.group === groupName){
                        return <GroupInfoCard group={profileData.group_name} title={info.title} kafedra={info.kafedra} key={info.title}/>
                    }
                })
            }
        </section>
        )
}