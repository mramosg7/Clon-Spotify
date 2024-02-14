import { useEffect, useState } from "react"
import { usePlayer } from "../hooks/player/usePlayer"
import { Box, Button } from "@chakra-ui/react"
import InfoPlayer from "../components/InfoPlayer"
import ControllersPlayer from "./ControllersPlayer"


export default function Player(){

    const {contextPlayer, getContextPlayer, player} = usePlayer()
    const [errorNoLog, setErrorNoLog] = useState(false)
    const token = localStorage.getItem("access_token")
   


    useEffect(()=>{
         try{
             getContextPlayer()
                console.log(contextPlayer)
         }catch(e){
             if(e.code === 403){
                 setErrorNoLog(true)
             }
      
             console.log(e.code)
         }
        
        
        
    },[])

    return(
        <>
            {errorNoLog && 
                <Box
                    marginY="-20px"
                    padding="5px 40px"
                    alignItems="center"
                    background="linear-gradient(90deg, rgba(255,196,247,1) 0%, rgba(138,235,255,1) 100%)"

                    position="absolute"
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
                 {!errorNoLog &&  
            
            <Box
                   marginY="-20px"
                   background="black"
                   position="absolute"
                   color="white"
                   display="flex"
                   justifyContent="space-between"
                   width="100%"
                   height={75}
                   padding="20px"
               >
   
                    <InfoPlayer info={contextPlayer.item}/>
                    <ControllersPlayer player={player} contextPlayer={contextPlayer}/>
                    <h1>hola</h1>
               
            </Box>
           
        } 
            
        </>
        
       
    )
}