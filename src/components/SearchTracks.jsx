import { Box, Image, Table,Tbody, Td, Tr} from "@chakra-ui/react";



export default function SearchTrack({tracks}){
    return(
        <Box
            display="flex"
            flexDirection="row"
        >
            <div>
                <h1>Resultado principal</h1>
                <Box>
                    <Image src={tracks[0].album.images[1].url}/>
                    <h1>{tracks[0].name}</h1>
                    
                </Box>
            </div>
            <div>
                <h1>Canciones</h1>
                <Table size='sm' variant='none'>
                        <Tbody>
                            {tracks.map((track)=>(
                                <Tr>
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
    )
}