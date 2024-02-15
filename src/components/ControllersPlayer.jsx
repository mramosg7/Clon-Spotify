import { FaRandom, FaStepBackward, FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { ImLoop } from "react-icons/im";
import { MillisecondsToPercentage, percentageToMilliseconds, millisecodsToMinutes } from "../assets/songFormater";
import { Box, Button, Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Text, } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { fetchSeek } from "../services/spotify/playerService";

export default function ControllersPlayer({paused, player, contextPlayer, position}){
   
    
   const [timePercentage, setTimePercentage] = useState(MillisecondsToPercentage(position, contextPlayer.item.duration_ms))
    console.log("por", timePercentage)

   useEffect(()=>{
    setTimePercentage(MillisecondsToPercentage(position, contextPlayer.item.duration_ms))
    console.log("bucle",MillisecondsToPercentage(position, contextPlayer.item.duration_ms))
   },[position])

   useEffect(() => {
        let progressTimer;
        if(!paused){
            
            progressTimer = setInterval(() => {
                    const percentagePerSecond = MillisecondsToPercentage(1000,contextPlayer.item.duration_ms)
                    console.log(percentagePerSecond, timePercentage)
                    setTimePercentage(prevPercentage => prevPercentage + percentagePerSecond);
                 
            }, 1000);
           
        }
        return () => clearInterval(progressTimer);
}, [paused]);

    const handleTogglePlay= ()=>{
        player.togglePlay()
        
    }

    const handleMouseUp = ()=>{
        const token= localStorage.getItem("access_token")
        fetchSeek(contextPlayer.device.id,token,percentageToMilliseconds(timePercentage, contextPlayer.item.duration_ms))
   
    }

    const handleChange=(value)=>{
        setTimePercentage(value)
        console.log('change', value)
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
                <Button onClick={()=>{handleTogglePlay()}} >{paused ?  <FaPlay />:<FaPause />}</Button>
                <Button onClick={()=>{handleNextTrack()}}>  <GiNextButton /></Button>
                
                <ImLoop />
            </Box>
            <Box display='flex' gap='15px'>
                <Text>{millisecodsToMinutes(percentageToMilliseconds(timePercentage,contextPlayer.item.duration_ms))}</Text>
                <Slider aria-label='slider-ex-1' value={timePercentage} onChange={(value)=>{handleChange(value)}} onChangeEnd={()=>{handleMouseUp()}} >
                    <SliderTrack >
                        <SliderFilledTrack  />
                    </SliderTrack >
                    <SliderThumb />
                </Slider>
                <Text>{millisecodsToMinutes(contextPlayer.item.duration_ms)}</Text>
            </Box>
        </Box>
    )
}