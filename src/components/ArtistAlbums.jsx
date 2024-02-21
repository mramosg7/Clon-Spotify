import { Heading, Box, Image, Card, CardBody, Stack, Text,Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { fetchPlay } from '../services/spotify/playerService';
import DefaultImage from '../assets/PlaylistDefault.png'
import '../Styles/animacion.css'
import { useHoverPlayer } from "../hooks/player/useHoverPlayer";
export default function ArtistAlbums({albums}){

    const { hoverCard, buttonAnimation, handleMouseEnter, handleMouseLeave } = useHoverPlayer()
    const {getAccessToken} = useAuthUser()

    const handleClick = (uri)=>{
        const device_id = localStorage.getItem('device_id')
        if(device_id){
          getAccessToken().then((tk)=>{
            fetchPlay(tk,device_id,0,uri)
          })
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
                {albums && albums.map((album) =>(
                        
                        <Card 
                            width='210px'
                            h='280px'
                            key={album.id}
                            bg='#181919'
                            color='#9a9a9a'
                            cursor='pointer'
                            marginRight='20px'
                            _hover={{
                                bg: '#292928'
                            }}
                        >
                            <Link to={`/album/${album.id}`}  
                                onMouseEnter={() => handleMouseEnter(album.id)}
                                onMouseLeave={() => handleMouseLeave(album.id)}
                            >
                                <CardBody>
                                    <Image
                                        borderRadius='5px'
                                        width='170px'
                                        height='170px'
                                        src={album.images[0] ? album.images[0].url : DefaultImage}    
                                    />
                                    {hoverCard === album.id && <Button onClick={()=>{handleClick(album.uri)}}
                                        borderRadius='full' 
                                        backgroundColor='#1FDF64' 
                                        w='50px' 
                                        h='50px' 
                                        padding='5px'
                                        position='absolute' 
                                        marginTop='-60px' 
                                        boxShadow='2xl'
                                        marginLeft='110px' 
                                        animation={buttonAnimation}
                                    >
                                        <FaPlay />
                                    </Button >}
                                    <Stack mt='6' spacing='3'>
                                        <Heading textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color='white' size='sd'>{album.name}</Heading>
                                        <Text >
                                            {album.release_date.slice(0,4)} • {album.type} 
                                        </Text>
                                    </Stack>
                                </CardBody>
                            </Link>
                        </Card>
                ))}
            </Box>
        </>
    )
}