import {GroupInfo} from "./types.ts";
import {FC} from "react";

export const GroupInfoCard: FC<GroupInfo> = ({group, title, kafedra}) =>{
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <p>{group}</p>
            <p>{title}</p>
            <p>{kafedra}</p>
        </div>
    )
}