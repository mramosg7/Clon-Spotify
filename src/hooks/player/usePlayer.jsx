import { useEffect, useState } from "react"
import { fetchGetContext, fetchToggleShuffle, fetchTransferPlayback } from "../../services/spotify/playerService";
import { useAuthUser } from "../auth/useAuthUser";
import { usePlayerContext } from "../../context/PlayerContext";




export const usePlayer = ()=>{
    
    const {getAccessToken} = useAuthUser()
    const {contextPlayer} = usePlayerContext()
    
    let token = localStorage.getItem("access_token")

   

    const getContextPlayer = async()=>{
        try {
           
            if(!token){
                const miError = new Error("No estas logeado");
                miError.code = 403;
                throw miError
            }
            const data = await fetchGetContext(token)
                if(data!== undefined){
                    localStorage.setItem("contextPlayer",JSON.stringify(data))
                    console.log(data)
                    setContextPlayer(data)
                }
        } catch(e){
            throw e
        }
    }

    const toggleShuffle = ()=>{
        getAccessToken().then((tk)=>{
            fetchToggleShuffle(tk,!contextPlayer.shuffle_state,contextPlayer.device.id)
        })
    }


    return {
        contextPlayer,
        getContextPlayer,
        toggleShuffle
    }
}