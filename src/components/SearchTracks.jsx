import { Box, Image, Table,Tbody, Td, Tr} from "@chakra-ui/react";
import DefaultImage from "../assets/playlistDefault.png"


export default function SearchTrack({tracks}){
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
                            borderRadius='10px'
                        >
                            <Image 
                                src={tracks[0].album.images[1] 
                                ? tracks[0].album.images[1].url 
                                : DefaultImage}
                                borderRadius='10px'
                                w='120px'
                                h='120px'
                            />
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
                                            <Td>
                                                <Image
                                                    borderRadius='5px'
                                                    boxSize='50px'
                                                    src={track.album.images[0].url}
                                                />
                                            </Td>
                                            <Td>
                                                {track.name}
                                            </Td>
                                            <Td>
                                                <p>{track.duration_ms}</p>
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