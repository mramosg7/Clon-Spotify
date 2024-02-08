import { useState } from "react"
import { fetchGetContext } from "../../services/spotify/playerService";


export const usePlayer = ()=>{
    const [contextPlayer, setContextPlayer] = useState(localStorage.getItem("contextPlayer") ? JSON.parse(localStorage.getItem("contextPlayer")): null);

    const getContextPlayer = ()=>{
        try{
            const token = localStorage.getItem("access_token")
            if(!token){
                const miError = new Error("No estas logeado");
                miError.code = 404;
                throw miError
            }
            fetchGetContext(token)
            .then((data)=>{
                if(data!== undefined){
                    localStorage.setItem("contextPlayer",JSON.stringify(data))
                    setContextPlayer(data)
                }
               
            })
        }catch(e){
            throw e
        }
        
    }

    return {
        contextPlayer,
        getContextPlayer
    }
}