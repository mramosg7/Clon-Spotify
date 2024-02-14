import { useEffect, useState } from "react"
import { fetchGetContext, fetchTransferPlayback } from "../../services/spotify/playerService";





export const usePlayer = ()=>{
    const [contextPlayer, setContextPlayer] = useState(localStorage.getItem("contextPlayer") ? JSON.parse(localStorage.getItem("contextPlayer")): null);
    const [player, setPlayer] = useState(null);
    const token = localStorage.getItem("access_token")

   useEffect(()=>{
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: 'sdk de prueba',
            getOAuthToken: cb => { cb(token); },
            volume: 0.2
        });  
         // Ready
        player.addListener('ready', ({ device_id }) => {
            fetchTransferPlayback(token, device_id)
        });

        // Not Ready
        player.addListener('initialization_error', ({ message }) => {
        console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
            console.e
            })
        player.connect();
        console.log(player)
        setPlayer(player)
    }
    return () => {
        if (player) {
            player.disconnect();
        }
    };
   },[])

    const getContextPlayer = ()=>{
        try {
           
            if(!token){
                const miError = new Error("No estas logeado");
                miError.code = 403;
                throw miError
            }
            fetchGetContext(token)
            .then((data)=>{
                if(data!== undefined){
                    localStorage.setItem("contextPlayer",JSON.stringify(data))
                    setContextPlayer(data)
                }
               
            })
        } catch(e){
            throw e
        }
        
    }

    return {
        contextPlayer,
        getContextPlayer,
        player
    }
}