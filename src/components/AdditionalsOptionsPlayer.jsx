
import { CgDetailsMore } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { BsSoundwave } from "react-icons/bs";
import { FaVolumeHigh,FaVolumeLow, FaVolumeOff,FaVolumeXmark,FaComputer,FaMobileScreen } from "react-icons/fa6";
import { fetchTransferPlayback } from "../services/spotify/playerService";
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
    Portal,
    
  } from '@chakra-ui/react'
  import { LuLaptop2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { fetchSetVolume, fetchGetDevices } from "../services/spotify/playerService";
import { usePlayerContext } from "../context/PlayerContext";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function AdditionalsOptionsPlayer({context}){
    
    const [volume, setVolume] = useState(context.device.volume_percent)
    const [levelVolume,setLevelVolume] = useState(2)
    const [devices, setDevices] = useState([])
    const {getAccessToken} = useAuthUser()
    console.log(devices)

    useEffect(()=>{
        getAccessToken().then((tk)=>{
            fetchGetDevices(tk).then((data)=>{
                
                setDevices(data.devices)
            })
        })
    },[])

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

    const handleClick=(id)=>{
        getAccessToken().then(tk=>{
            fetchTransferPlayback(tk,id)
        })
    }
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
                <PopoverContent height='300px' border='none'bg="#282828" fontSize='20px'>
                    <PopoverArrow bg="#282828" border='none'/>
                  
                    <PopoverHeader display='flex' alignItems='center' gap='10px'>
                        {context.device.type === 'Computer' ? <LuLaptop2 fontSize='45px' color="#1ED760"/>: <FaMobileScreen fontSize='45px' color="#1ED760"/>}
                        <Box>
                            <h1>Dispositivo actual</h1>
                            <p style={{display:'flex', gap:'10px', alignItems:'center', color:"#1ED760"}}><BsSoundwave /> {context.device.name}</p>

                        </Box>    
                    </PopoverHeader>
                    <PopoverBody overflow='auto'>
                        <p style={{margin: '10px 0px'}}>Seleccionar otro dispositivo</p>
                       <Box display='flex' flexDirection='column' gap='20px'>
                            {devices.map((device=>(
                                <>
                                 {device.id != context.device.id && 
                                    <Box 
                                    onClick={()=>{
                                        handleClick(device.id)
                                    }}
                                    padding='10px'
                                    borderRadius='10px'
                                    cursor='pointer'
                                    _hover={{
                                        backgroundColor:'#3E3E3E'
                                    }}
                                    key={device.id} display='flex' gap='10px' alignItems='center'>
                                        {device.type === 'Computer' ? <LuLaptop2 fontSize='45px'/>: <FaMobileScreen fontSize='45px'/>}
                                        <p>{device.name}</p>
                                    </Box>
                                }
                                </>
                                
                               
                            )))}
                       </Box>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            
            <Box display='flex' width='100%' gap='10px'>
                {levelVolume ===3 && <FaVolumeHigh onClick={()=>{handleMute()}}/>}
                {levelVolume ===2 && <FaVolumeLow onClick={()=>{handleMute()}} style={{fontSize:'19px'}}/>}
                {levelVolume ===1 && <FaVolumeOff onClick={()=>{handleMute()}} style={{fontSize:'19px'}}/>}
                {levelVolume ===0 && <FaVolumeXmark/>}
                <Slider aria-label='slider-ex-1' focusThumbOnChange={false} colorScheme="green"  value={volume} onChange={(value)=>{handleChange(value)}} onChangeEnd={()=>{handleChangeEnd()}}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>

            
        </Box>
    )
}