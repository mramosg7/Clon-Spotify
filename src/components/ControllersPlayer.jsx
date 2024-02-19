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

import { useEffect, useState, useRef } from "react";

import { fetchSeek } from "../services/spotify/playerService";
import { usePlayerContext } from "../context/PlayerContext";
import { usePlayer } from "../hooks/player/usePlayer";

export default function ControllersPlayer(){
    const { player, paused, position, contextPlayer } = usePlayerContext();
    const {toggleShuffle} = usePlayer()
    const [timePercentage, setTimePercentage] = useState(MillisecondsToPercentage(position, contextPlayer.item.duration_ms))
    

   useEffect(()=>{
    setTimePercentage(prevPercentage => MillisecondsToPercentage(position, contextPlayer.item.duration_ms))
    
   },[position])

   useEffect(() => {
        let progressTimer;
        const percentagePerSecond = MillisecondsToPercentage(1000,contextPlayer.item.duration_ms)   
        if(!paused){
            
            progressTimer = setInterval(() => {    
                setTimePercentage(prevTime => prevTime + percentagePerSecond);
                 
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
                
                <FaRandom cursor='pointer' onClick={()=>{toggleShuffle()}}style={contextPlayer.shuffle_state ? {color: '#1ED760'}: null}/>
              
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