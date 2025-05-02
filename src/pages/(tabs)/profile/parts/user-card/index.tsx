import {UserData} from './model'
import styles from './styles.module.css'

export const UserCard = () =>{
    const {profileData} = UserData();

    return (
        <section className={styles.container}>
            <div className={styles.blankAvatar}>
                <p>{profileData.full_name}</p>
            </div>
            <p>{profileData.email}</p>
            <p>{profileData.group_name}</p>
        </section>
        )
}