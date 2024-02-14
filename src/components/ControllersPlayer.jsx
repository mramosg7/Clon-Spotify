import { FaRandom, FaStepBackward, FaPlay } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { ImLoop } from "react-icons/im";
import { Box } from "@chakra-ui/react";

export default function ControllersPlayer(){

    return(
        <Box>
            <Box
                display="flex"
                gap="10px"
            >
                <FaRandom />
                <FaStepBackward />
                <FaPlay />
                <GiNextButton />
                <ImLoop />
            </Box>
            <Box>

            </Box>
        </Box>
    )
}