import { Card, CardBody, Image,Heading, Stack,Text, Box, Skeleton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function PlaylistBody({playlists, isLoaded}){

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
                        >
                            <Link to={`/playlist/${playlist.id}`}>
                                <CardBody>
                                    <Skeleton startColor='#626262' endColor='#414141' isLoaded={isLoaded}>
                                        <Image
                                            borderRadius='5px'
                                            src={playlist.images[0].url}    
                                        />
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