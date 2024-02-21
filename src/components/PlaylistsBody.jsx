import { Card, CardBody, Image,Heading, Stack,Text, Box, Skeleton, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";

import { useHoverPlayer } from '../hooks/player/useHoverPlayer';
import { usePlayer } from '../hooks/player/usePlayer';

export default function PlaylistBody({playlists, isLoaded}){

    const { hoverCard, buttonAnimation, handleMouseEnter, handleMouseLeave } = useHoverPlayer()

    const {play} = usePlayer()

    const handleClick = (uri)=>{
        const device_id = localStorage.getItem('device_id')
        if(device_id){
            play(uri)
        }
       
    }
    return(
        <>
            
            <Box
                display='flex'
                flexDirection='row'
                gap='10px'
                flexWrap='wrap'
            >
                {playlists.map((playlist) =>(
                    
                        <Card 
                            width='200px' 
                            height='300px'
                   
                            
                            key={playlist.id}
                            bg='#181919'
                            color='#9a9a9a'
                            cursor='pointer'
                            _hover={{
                                bg:'#292928'
                            }}
                            onMouseEnter={()=>{handleMouseEnter(playlist.id)}}
                            onMouseLeave={()=>{handleMouseLeave(null)}}
                        >
                            <Link to={`/playlist/${playlist.id}`}>
                                <CardBody position='relative'>
                                    <Skeleton startColor='#626262' endColor='#414141' isLoaded={isLoaded}>
                                        <Image
                                            borderRadius='5px'
                                            src={playlist.images[0].url}    
                                        />
                                        {hoverCard === playlist.id && <Button 
                                            onClick={()=>{handleClick(playlist.uri)}}
                                            borderRadius='full' 
                                            animation={buttonAnimation} 
                                            w='50px' 
                                            h='50px'  
                                            backgroundColor='#1FDF64' 
                                            padding='5px'
                                            position='absolute' 
                                            marginTop='-55px' 
                                            marginLeft='100px'>
                                                <FaPlay />
                                            </Button >}
                                    </Skeleton>
                                    <Stack mt='6' spacing='3'>
                                        <Skeleton startColor='#626262' endColor='#414141' height='20px' isLoaded={isLoaded}>
                                            <Heading  textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden"color='white' size='sd'>{playlist.name}</Heading>
                                        </Skeleton>
                                        <Skeleton startColor='#626262' endColor='#414141' height='20px' isLoaded={isLoaded}>
                                            <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                                                {playlist.description}
                                            </Text>
                                        </Skeleton>
                                    </Stack>
                                </CardBody>
                            </Link>
                        </Card>
                    
                ))}
            </Box>
            
        </>
        
    )
}