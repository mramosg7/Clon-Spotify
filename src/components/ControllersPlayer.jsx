import { FaRandom, FaStepBackward, FaPause } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IoPlaySharp } from "react-icons/io5";
import { ImLoop } from "react-icons/im";
import { TiArrowLoop } from "react-icons/ti";
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
                gap="10px"
                alignItems='center'
                justifyContent='center'
            >
                
                <FaRandom cursor='pointer' onClick={()=>{toggleShuffle()}}style={contextPlayer.shuffle_state ? {color: '#1ED760'}: null}/>
              
                <Button bg='transparent' p='0' fontSize='30px' color='#bfbfbf' _hover={{ bg: 'transparent', color: 'white' }} onClick={()=>{handlePreviousTrack()}}><BiSkipPrevious /></Button>
                <Button borderRadius='full' p='8px' focusThumbOnChange={false} w='40px' h='40px' onClick={()=>{handleTogglePlay()}} >{paused ?  <IoPlaySharp style={{textAlign: 'center', fontSize: '20px'}} />:<FaPause style={{textAlign: 'center', fontSize: '20px'}} />}</Button>
                <Button bg='transparent' p='0' fontSize='30px' color='#bfbfbf' _hover={{ bg: 'transparent', color: 'white' }} onClick={()=>{handleNextTrack()}}><BiSkipNext /></Button>
                
                <TiArrowLoop fontSize='25px'/>
            </Box>
            <Box display='flex' gap='15px'>
                <Text>{millisecodsToMinutes(percentageToMilliseconds(timePercentage,contextPlayer.item.duration_ms))}</Text>
                <Slider aria-label='slider-ex-1' sx={{ width: "600px" }} focusThumbOnChange={false} colorScheme="green" value={timePercentage} onChange={(value)=>{handleChange(value)}} onChangeEnd={()=>{handleMouseUp()}} >
                    <SliderTrack >
                        <SliderFilledTrack  />
                    </SliderTrack >
                    <SliderThumb border='none'/>
                </Slider>
                <Text>{millisecodsToMinutes(contextPlayer.item.duration_ms)}</Text>
            </Box>
        </Box>
    )
}