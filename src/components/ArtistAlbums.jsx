import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ArtistAlbums({albums}){
    console.log(albums)
    return(
        <>
            <Heading color="white" marginBottom='30px' marginTop="10px"> Discografía</Heading>
            <Box
                display='flex'
                flexDirection='row'
                gap='10px'
                flexWrap='wrap'
            >
                {albums.map((album) =>(
                    
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
                            <Link to={`/album/${album.id}`}>
                                <CardBody>
                                    <Image
                                        borderRadius='5px'
                                        src={album.images[0].url}    
                                    />
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