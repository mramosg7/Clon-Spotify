import { FaRandom, FaStepBackward, FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { ImLoop } from "react-icons/im";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ControllersPlayer({player, contextPlayer}){
    const [isPaused, setPaused] = useState(true)
    const handleTogglePlay= ()=>{
        player.togglePlay()
        setPaused( !isPaused)
    }
    return(
        <Box>
            <Box
                display="flex"
                gap="30px"
                alignItems='center'
            >
                
                <FaRandom />
                <FaStepBackward />
                <Button onClick={()=>{handleTogglePlay()}}>{isPaused ? <FaPlay /> : <FaPause />}</Button>
                
                <GiNextButton />
                <ImLoop />
            </Box>
            <Box>

            </Box>
        </Box>
    )
}