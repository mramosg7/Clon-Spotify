import { useEffect, useState } from "react"
import { usePlayer } from "../hooks/player/usePlayer"

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
            {error && <h1>hola con error</h1>}
            {!error &&  
                // <Box>
                //     <InfoPlayer info={info}/>
                //     <ControllersPlayer/>
                //     <OptionsPlayer/>
                // </Box>
                <h1>Hola</h1>
            }
            
        </>
        
       
    )
}