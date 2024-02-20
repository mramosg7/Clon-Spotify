import { useEffect, useState } from "react"
import { fetchGetContext, fetchToggleShuffle, fetchTransferPlayback } from "../../services/spotify/playerService";
import { useAuthUser } from "../auth/useAuthUser";
import { usePlayerContext } from "../../context/PlayerContext";




export const usePlayer = ()=>{
    
    const {getAccessToken} = useAuthUser()
    const {contextPlayer} = usePlayerContext()


    const toggleShuffle = ()=>{
        getAccessToken().then((tk)=>{
            fetchToggleShuffle(tk,!contextPlayer.shuffle_state,contextPlayer.device.id)
        })
    }


    return {
        contextPlayer,
        toggleShuffle
    }
}