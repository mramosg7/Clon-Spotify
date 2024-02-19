
import { CgDetailsMore } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { FaVolumeHigh,FaVolumeLow, FaVolumeOff,FaVolumeXmark } from "react-icons/fa6";
import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Portal
  } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { fetchSetVolume } from "../services/spotify/playerService";
import { usePlayerContext } from "../context/PlayerContext";

export default function AdditionalsOptionsPlayer({context}){
    const [volume, setVolume] = useState(context.device.volume_percent)
    const [levelVolume,setLevelVolume] = useState(2)
    const handleChangeEnd=()=>{
        
        const token = localStorage.getItem('access_token')
        fetchSetVolume(context.device.id, token, volume)
    }
    const handleMute=()=>{
        setVolume(0)
        const token = localStorage.getItem('access_token')
        fetchSetVolume(context.device.id, token, 0)
    }
    const handleChange=(value)=>{
        
        setVolume(value)
    }
    useEffect(()=>{
        
        if(volume === 0){
            setLevelVolume(0)
        }else if(volume >= 75){
            setLevelVolume(3)
        }else if(volume <= 25){
            setLevelVolume(1)
        }else{
            setLevelVolume(2)
        }  
    },[volume])
    return(
        <Box display='flex' gap='20px' width='200px' fontSize='30px' alignItems='center'>   
            <CgDetailsMore />
            <Popover>
                <PopoverTrigger>
                    <Button background='none' color='white' padding='0px'
                       _hover={{
                        background:'none'
                       }}
                    ><MdComputer /></Button>
                </PopoverTrigger>
                <PopoverContent bg="#282828">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Dispositivo actual: </PopoverHeader>
                    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                </PopoverContent>
            </Popover>
            
            <Box display='flex' width='100%' gap='10px'>
                {levelVolume ===3 && <FaVolumeHigh onClick={()=>{handleMute()}}/>}
                {levelVolume ===2 && <FaVolumeLow onClick={()=>{handleMute()}} style={{fontSize:'19px'}}/>}
                {levelVolume ===1 && <FaVolumeOff onClick={()=>{handleMute()}} style={{fontSize:'19px'}}/>}
                {levelVolume ===0 && <FaVolumeXmark/>}
                <Slider aria-label='slider-ex-1'  value={volume} onChange={(value)=>{handleChange(value)}} onChangeEnd={()=>{handleChangeEnd()}}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>

            
        </Box>
    )
}