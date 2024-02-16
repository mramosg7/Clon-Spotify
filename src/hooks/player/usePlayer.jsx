import { useEffect, useState } from "react"
import { fetchGetContext, fetchTransferPlayback } from "../../services/spotify/playerService";
import { useAuthUser } from "../auth/useAuthUser";




export const usePlayer = ()=>{
    const [contextPlayer, setContextPlayer] = useState(localStorage.getItem("contextPlayer") ? JSON.parse(localStorage.getItem("contextPlayer")): null);
    const [player, setPlayer] = useState(null);
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(true);
    const {refresh} = useAuthUser() 
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

    return {
        contextPlayer,
        getContextPlayer,
        player,
        paused,
        setPosition,
        position
    }
}