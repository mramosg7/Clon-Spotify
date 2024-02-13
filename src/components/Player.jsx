import { useEffect, useState } from "react"
import { usePlayer } from "../hooks/player/usePlayer"
import { Box, Button } from "@chakra-ui/react"

export default function Player(){

    const {contextPlayer, getContextPlayer} = usePlayer()
    const [error, setError] = useState(null)

    useEffect(()=>{
        try{
         getContextPlayer()
         
        }catch(e){
            setError(e)
            console.log(e)
        }
        
    },[])

    return(
        <>
            {error && 
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
            {!error &&  
                //  <Box
                //         marginY="-20px"
                //         background="black"
                //         position="absolute"
                //         color="white"
                //         display="flex"
                //         justifyContent="space-between"
                //         width="100%"
                //         height={75}
                //     >
                //     <InfoPlayer info={info}/>
                //     <ControllersPlayer/>
                //     <OptionsPlayer/>
                // </Box>
                <h1>Hola</h1>
            }
            
        </>
        
       
    )
}