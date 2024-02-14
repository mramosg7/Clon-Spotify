import { FaRandom, FaStepBackward, FaPlay } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { ImLoop } from "react-icons/im";
import { Box, Button } from "@chakra-ui/react";

export default function ControllersPlayer({player, contextPlayer}){
    const handleTogglePlay= ()=>{
        player.togglePlay()
    }
    return(
        <Box>
            <Box
                display="flex"
                gap="10px"
            >
                
                <FaRandom />
                <FaStepBackward />
                <Button onClick={()=>{handleTogglePlay()}}><FaPlay /></Button>
                
                <GiNextButton />
                <ImLoop />
            </Box>
            <Box>

            </Box>
        </Box>
    )
}