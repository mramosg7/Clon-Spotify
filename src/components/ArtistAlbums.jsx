import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text,Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { fetchPlay } from '../services/spotify/playerService';
import DefaultImage from '../assets/PlaylistDefault.png'
import '../Styles/animacion.css'
export default function ArtistAlbums({albums}){

    const [hoverCard, setHoverCard] = useState(null)
    const [buttonAnimation, setButtonAnimation] = useState('')
    const {getAccessToken} = useAuthUser()
    const hoverTimeoutRef = useRef()

    const handleMouseEnter = (id) => {

        // Quitar timeouts pendientes al entrar a otra card
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
        }

        setHoverCard(id)
        setButtonAnimation('fadeInUp 0.5s ease forwards')
    }
    
    const handleMouseLeave = (id) => {
        setButtonAnimation('fadeOutDown 0.5s ease forwards')
      
        hoverTimeoutRef.current = setTimeout(() => {
            if (hoverCard === id) {
                setHoverCard(null)
            }
        
            hoverTimeoutRef.current = null
        }, 500)
    }

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
                            width='250px'
                            h='350px'
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
                                        width='200px'
                                        height='200px'
                                        src={album.images[0] ? album.images[0].url : DefaultImage}    
                                    />
                                    {hoverCard === album.id && <Button onClick={()=>{handleClick(album.uri)}}
                                        borderRadius='full' 
                                        backgroundColor='#1FDF64' 
                                        w='60px' 
                                        h='60px' 
                                        padding='5px'
                                        position='absolute' 
                                        marginTop='-70px' 
                                        boxShadow='2xl'
                                        marginLeft='140px' 
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