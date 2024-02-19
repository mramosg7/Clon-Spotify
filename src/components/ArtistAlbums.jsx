import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text,Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { fetchPlay } from '../services/spotify/playerService';
import DefaultImage from '../assets/PlaylistDefault.png'
export default function ArtistAlbums({albums}){

    const [hoverCard, setHoverCard] = useState(null)
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
                            width='200px' 
                            key={album.id}
                            bg='#181919'
                            color='#9a9a9a'
                            cursor='pointer'
                            _hover={{
                                bg:'#292928'
                            }}
                        >
                            <Link to={`/album/${album.id}`}  
                                onMouseEnter={()=>{setHoverCard(album.id)}}
                                onMouseLeave={()=>{setHoverCard(null)}}
                            >
                                <CardBody>
                                    <Image
                                        borderRadius='5px'
                                        src={album.images[0] ? album.images[0].url : DefaultImage}    
                                    />
                                    {hoverCard === album.id && <Button onClick={()=>{handleClick(album.uri)}}borderRadius='full' backgroundColor='#1FDF64' padding='5px'position='absolute' marginTop='-50px' marginLeft='110px'><FaPlay /></Button >}
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