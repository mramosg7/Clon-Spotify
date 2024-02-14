import { FaRandom, FaStepBackward, FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { ImLoop } from "react-icons/im";
import { songFormater } from "../assets/songFormater";
import { Box, Button, Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark, } from "@chakra-ui/react";

import { useEffect, useState } from "react";

export default function ControllersPlayer({paused, player, contextPlayer}){
   
    
   const [timePercentage, setTimePercentage] = useState(songFormater(contextPlayer.progress_ms, contextPlayer.item.duration_ms))
   useEffect(()=>{
    setTimePercentage(songFormater(contextPlayer.progress_ms, contextPlayer.item.duration_ms))
    console.log(timePercentage)
   },[contextPlayer])
    const handleTogglePlay= ()=>{
            player.togglePlay()

       
        
    }

    const handlePreviousTrack=()=>{
        player.previousTrack()
    }
    const handleNextTrack=()=>{
        player.nextTrack()
    }
    return(
        <Box>
            <Box
                display="flex"
                gap="30px"
                alignItems='center'
            >
                
                <FaRandom />
              
                <Button onClick={()=>{handlePreviousTrack()}}>  <FaStepBackward /></Button>
                <Button onClick={()=>{handleTogglePlay()}}>{paused ?  <FaPlay />:<FaPause />}</Button>
                <Button onClick={()=>{handleNextTrack()}}>  <GiNextButton /></Button>
                
                <ImLoop />
            </Box>
            <Box>
            <Slider aria-label='slider-ex-1'value={timePercentage} >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            </Box>
        </Box>
    )
}