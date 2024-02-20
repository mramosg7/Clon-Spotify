import { Box, Button, Image, Table,Tbody, Td, Text, Tr} from "@chakra-ui/react";
import DefaultImage from "../assets/playlistDefault.png"
import { Link } from "react-router-dom";
import { convertirAMinutosYSegundos } from "../functions/convertirTiempo";
import { FaPlay } from "react-icons/fa";
import { useHoverPlayer } from "../hooks/player/useHoverPlayer";


export default function SearchTrack({tracks}){

    const { hoverCard, buttonAnimation, handleMouseEnter, handleMouseLeave } = useHoverPlayer()

    return(
        <>
            {tracks &&
                <Box
                    display="flex"
                    flexDirection="row"
                    width='100%'
                    h='50%'
                    p='30px'
                >
                    
                    <Box
                        w='35%'
                    >
                        <h1 style={{
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Resultado principal</h1>
                        <Box 
                            w='100%'
                            h='84%'
                            bg='#191918'
                            p='22px'
                            cursor='pointer'
                            _hover={{
                                bg: '#282929'
                            }}
                            position='relative'
                            borderRadius='10px'
                            onMouseEnter={() => handleMouseEnter(tracks.id)}
                            onMouseLeave={() => handleMouseLeave(tracks.id)}
                        >
                            <Image 
                                src={tracks[0].album.images[1] 
                                ? tracks[0].album.images[1].url 
                                : DefaultImage}
                                borderRadius='10px'
                                w='120px'
                                h='120px'
                            />
                            {hoverCard === tracks.id && <Button
                                        borderRadius='full' 
                                        backgroundColor='#1FDF64' 
                                        w='50px' 
                                        h='50px' 
                                        padding='5px'
                                        position='absolute'
                                        marginTop='45px' 
                                        boxShadow='2xl'
                                        left='85%' 
                                        transform='translateX(-50%)'
                                        animation={buttonAnimation}
                                    >
                                        <FaPlay />
                            </Button >}
                            <h1 style={{
                                fontWeight: 'bold',
                                fontSize: '30px',
                                marginTop: '20px',
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap", 
                                overflow: "hidden"
                            }}>{tracks[0].name}</h1>
                            <p style={{
                                color: 'gray',
                                fontWeight: '600',
                                marginTop: '5px'
                            }}>Canción</p>
                        </Box>
                    </Box>
                    <Box
                        width='60%'
                        marginLeft='30px'
                    >
                        <h1 style={{
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Canciones</h1>
                        <Table size='sm' variant='none'>
                                <Tbody>
                                    {tracks.slice(0, 4).map((track)=>(
                                        <Tr 
                                            key={track.id}
                                            _hover={{
                                                bg: "rgb(255, 255, 255, 0.2)",
                                                color: "white",
                                            }}
                                            borderRadius='5px'
                                            
                                        >
                                            <Td display="flex" gap="10px" alignItems="center">
                                                <Image
                                                    borderRadius='5px'
                                                    boxSize='50px'
                                                    src={track.album.images[0].url}
                                                />
                                                <div>
                                                    <h4 style={{
                                                        fontWeight: '600',
                                                        fontSize: '15px'
                                                    }}>
                                                        {track.name}
                                                    </h4>
                                                    <Box display="flex">
                                                    {track.artists.map((a, index) => (
                                                        <Link to={`/artist/${a.id}`} key={a.id}>
                                                        <Text
                                                            color="#A9A9A9"
                                                            _hover={{
                                                            color: "white",
                                                            textDecoration: "underline",
                                                            }}
                                                        >
                                                            {index !== 0 ? ", " : ""}
                                                            {a.name}
                                                        </Text>
                                                        </Link>
                                                    ))}
                                                    </Box>
                                                </div>
                                            </Td>
                                            <Td>
                                                <p style={{
                                                    color: 'gray',
                                                    fontWeight: '600'
                                                }}>{convertirAMinutosYSegundos(track.duration_ms)}</p>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        
                    </Box>
                </Box>
            }
        </>
        
    )
}