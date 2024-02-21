import { useEffect, useState } from "react"
import { usePlayer } from "../hooks/player/usePlayer"
import { Box, Button } from "@chakra-ui/react"
import InfoPlayer from "../components/InfoPlayer"
import ControllersPlayer from "./ControllersPlayer"
import AdditionalsOptionsPlayer from "./AdditionalsOptionsPlayer"
import { useAuthUser } from "../hooks/auth/useAuthUser"
import { usePlayerContext } from "../context/PlayerContext";
export default function Player(){

    
    const [errorNoLog, setErrorNoLog] = useState(false)
    const [Loading, setLoading] = useState(true)
    const {getAccessToken} = useAuthUser()
    const { player, paused, position, contextPlayer, getContextPlayer, setPosition } = usePlayerContext();

    useEffect(()=>{
            getAccessToken().then((tk)=>{
                getContextPlayer().then(()=>{
                    
                    setPosition(contextPlayer.progress_ms)
                }) 
                .catch((e)=>{
                    setErrorNoLog(true)
                    console.log(e)
                })
                .finally(()=>{
                    setLoading(false)
                })
            })
    },[])

    return(
        <>
            {(errorNoLog || Loading)&&  
                <Box
                    marginY="-20px"
                    padding="5px 40px"
                    alignItems="center"
                    background="linear-gradient(90deg, rgba(255,196,247,1) 0%, rgba(138,235,255,1) 100%)"

                
                    color="white"
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    height={75}
                >
                    <div>
                        <h1> <b>Muestra de Spotify</b></h1>
                        <p>Inicia sesión para disfrutar de todas las herramientas </p>
                    </div>
                    <Button>Inicia sesión</Button>
                </Box>}
                 {!errorNoLog && !Loading &&
            
            <Box
                  
                   background="black"
                   
                   color="white"
                   display="flex"
                   justifyContent="space-between"
                   alignItems='center'
                   width="100%"
                   height="10vh"
                   padding="20px"
               >
   
                    <InfoPlayer info={contextPlayer.item}/>
                    <ControllersPlayer/>
                    <AdditionalsOptionsPlayer context={contextPlayer}/>
               
            </Box>
           
        } 
            
        </>
        
       
    )
}