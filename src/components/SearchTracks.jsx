import { Box, Image, Table,Tbody, Td, Tr} from "@chakra-ui/react";
import DefaultImage from "../assets/playlistDefault.png"


export default function SearchTrack({tracks}){
    return(
        <>
            {tracks &&
                <Box
                    display="flex"
                    flexDirection="row"
                >
                    
                    <div>
                        <h1>Resultado principal</h1>
                        <Box>
                            <Image src={tracks[0].album.images[1] ? tracks[0].album.images[1].url : DefaultImage}/>
                            <h1>{tracks[0].name}</h1>
                            
                        </Box>
                    </div>
                    <div>
                        <h1>Canciones</h1>
                        <Table size='sm' variant='none'>
                                <Tbody>
                                    {tracks.map((track)=>(
                                        <Tr key={track.id}>
                                            <Td>
                                                <Image
                                                    boxSize='50px'
                                                    src={track.album.images[0].url}
                                                />
                                            </Td>
                                            <Td>
                                                <p>{track.name}</p>
                                            </Td>
                                            <Td>
                                                <p>{track.duration_ms}</p>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        
                    </div>
                </Box>
            }
        </>
        
    )
}