import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchTransferPlayback,fetchGetContext } from "../services/spotify/playerService";
import { useAuthUser } from "../hooks/auth/useAuthUser";
const MyContext = createContext();

export function ProviderContextPlayer({ children }) {
  const [contextPlayer, setContextPlayer] = useState(localStorage.getItem("contextPlayer") ? JSON.parse(localStorage.getItem("contextPlayer")): null);
  const [player, setPlayer] = useState(null);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const {getAccessToken} = useAuthUser()
  let token = localStorage.getItem("access_token")
  
  const getContextPlayer = async()=>{
    try {
        if(!token){
            const miError = new Error("No estas logeado");
            miError.code = 403;
            throw miError
        }
        const tk = await getAccessToken()
        const data = await fetchGetContext(tk)
        console.log(data)
            if(data){
                localStorage.setItem("contextPlayer",JSON.stringify(data))
                setContextPlayer(data)
            }
        
        
           
        
    } catch(e){
        throw e
    }
    
    }
    useEffect(()=>{
        if(token){
            getAccessToken().then(tk=>{
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const player = new Spotify.Player({
                        name: 'sdk de prueba',
                        getOAuthToken: cb => { cb(tk); },
                        volume: 0.2
                    });  
                
                    player.addListener('ready', ({ device_id }) => {
                        localStorage.setItem('device_id', device_id)
                      
                        getContextPlayer()
                        
                        fetchTransferPlayback(token, device_id)
                        
                    });
            
                    
                    player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                    });
            
                    player.addListener('authentication_error', ({ message }) => {
                        console.error(message);
                    });
            
                    player.addListener('account_error', ({ message }) => {
                        console.error(message);
                    })
                    player.addListener('player_state_changed',(context) => {
                            try{
                                
                                setPaused(context.paused)
                                getContextPlayer()
                                setPosition(context.position)
                                console.log("changed",context.position)
                                
                            }catch(e){
                                console.error(e)
                            }
                    });
                    player.connect();
                    setPlayer(player)
    
                    
                }
            })
            
            return () => {
                if (player) {
                    player.disconnect();
                }
            };
        }
        
    },[])
  const value = {
    player,
    paused,
    position,
    contextPlayer,
    getContextPlayer,
    setPosition
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export function usePlayerContext() {
  return useContext(MyContext);
}