import { Card, CardHeader, CardBody, CardFooter, Image,Heading, Stack,Text, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function PlaylistBody({playlists}){
    const newPlaylists = playlists.slice(5)
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
                            key={playlist.id}
                            bg='#181919'
                            color='#9a9a9a'
                            cursor='pointer'
                            _hover={{
                                bg:'#292928'
                            }}
                        >
                            <Link to={`/playlist/${playlist.id}`}>
                                <CardBody>
                                    <Image
                                        borderRadius='5px'
                                        src={playlist.images[0].url}    
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading color='white' size='sd'>{playlist.name}</Heading>
                                        <Text>
                                            {playlist.description}
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