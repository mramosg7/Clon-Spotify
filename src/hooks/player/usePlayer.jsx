
import { usePlayerContext } from "../../context/PlayerContext";
import {fetchToggleShuffle, fetchSetRepeatMode } from "../../services/spotify/playerService";
import { useAuthUser } from "../auth/useAuthUser";





export const usePlayer = ()=>{
    
    const {getAccessToken} = useAuthUser()
    const {contextPlayer} = usePlayerContext()


    const toggleShuffle = ()=>{
        getAccessToken().then((tk)=>{
            fetchToggleShuffle(tk,!contextPlayer.shuffle_state,contextPlayer.device.id)
        })
    }

    const setRepeatMode=(state)=>{
        getAccessToken().then((tk)=>{
            fetchSetRepeatMode(tk, contextPlayer.device.id, state)
        })
     
    }


    return {
        setRepeatMode,
        toggleShuffle
    }
}