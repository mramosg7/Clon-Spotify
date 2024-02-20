import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DefaultImage from '../assets/PlaylistDefault.png'
import { useHoverPlayer } from "../hooks/player/useHoverPlayer";
import { FaPlay } from "react-icons/fa";
export default function ArtistasSearch({ artistas }) {

    const { hoverCard, buttonAnimation, handleMouseEnter, handleMouseLeave } = useHoverPlayer()

    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            flexWrap='wrap'
        >
            {artistas.map(artista => (
                <Card
                    width='210px'
                    h='280px'
                    key={artista.id}
                    bg='#181919'
                    color='#9a9a9a'
                    cursor='pointer'
                    marginRight='20px'
                    _hover={{
                        bg: '#292928'
                    }}
                >
                    <Link to={`/artist/${artista.id}`}
                        onMouseEnter={() => handleMouseEnter(artista.id)}
                        onMouseLeave={() => handleMouseLeave(artista.id)}
                    >
                        <CardBody
                            display='flex'
                            justifyContent='center'
                            flexDir='column'
                        >
                            <Image
                                w='160px'
                                h='160px'
                                margin='auto'
                                borderRadius='full'
                                boxShadow='lg'
                                src={artista.images[0] ? artista.images[0].url : DefaultImage}
                            />
                            {hoverCard === artista.id && <Button
                                        borderRadius='full' 
                                        backgroundColor='#1FDF64' 
                                        w='50px' 
                                        h='50px' 
                                        padding='5px'
                                        position='absolute' 
                                        marginTop='30px' 
                                        boxShadow='2xl'
                                        marginLeft='110px' 
                                        animation={buttonAnimation}
                                    >
                                        <FaPlay />
                            </Button >}
                            <Stack mt='6' spacing='3'>
                                <Heading 
                                    textOverflow="ellipsis" 
                                    whiteSpace="nowrap" 
                                    overflow="hidden" 
                                    color='white'
                                    fontSize='15px'
                                    marginLeft='10px'
                                >{artista.name}</Heading>
                                <Text
                                   fontSize='13px'
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