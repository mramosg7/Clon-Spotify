import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DefaultImage from '../assets/PlaylistDefault.png'
export default function ArtistasSearch({ artistas }) {

    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            flexWrap='wrap'
        >
            {artistas.map(artista => (
                <Card
                    width='250px'
                    h='350px'
                    key={artista.id}
                    bg='#181919'
                    color='#9a9a9a'
                    cursor='pointer'
                    marginRight='20px'
                    _hover={{
                        bg: '#292928'
                    }}
                >
                    <Link to={`/artist/${artista.id}`}>
                        <CardBody
                            display='flex'
                            justifyContent='center'
                            flexDir='column'
                        >
                            <Image
                                w='190px'
                                h='190px'
                                margin='auto'
                                borderRadius='full'
                                boxShadow='lg'
                                src={artista.images[0] ? artista.images[0].url : DefaultImage}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading 
                                    textOverflow="ellipsis" 
                                    whiteSpace="nowrap" 
                                    overflow="hidden" 
                                    color='white'
                                    fontSize='20px'
                                    marginLeft='10px'
                                >{artista.name}</Heading>
                                <Text
                                   fontSize='20px'
                                   marginLeft='10px' 
                                   fontWeight='500'
                                >Artista</Text>
                            </Stack>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </Box>
    );
}