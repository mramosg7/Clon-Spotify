import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Image,
    Box,
    Text,
    Heading
  } from '@chakra-ui/react'


export function TopTracks({tracks}){
    console.log(tracks)

    function convertirAMinutosYSegundos(tiempoTotal) {
        const tiempoTotalEnSegundos = tiempoTotal / 1000;

        const minutos = Math.floor(tiempoTotalEnSegundos / 60);
        const segundos = Math.floor(tiempoTotalEnSegundos % 60);

        // Formatea los minutos y segundos
       
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        return `${minutos}:${segundosFormateados}`;
      }

   
    return(
        <>  
            <Heading marginBottom='30px' color='white'>Populares</Heading>
            <TableContainer width='65%'>
            <Table size='sm' variant='none'>
                <Tbody
                    color='#A9A9A9'
                >
                    {tracks.map((track, index)=>(
                        <Tr key={track.id} 
                            height='10px'
                            p={0} 
                            borderRadius="md"
                            _hover={{
                                bg:'rgb(255, 255, 255, 0.2)',
                                color: 'white'
                            }}
                            
                        >
                            <Td borderTopLeftRadius="md" borderBottomLeftRadius="md">{index + 1}</Td>
                            <Td color='white' display='flex' gap='10px' alignItems='center'>
                                <Image
                                    src={track.album.images[2].url}
                                    borderRadius='5px'
                                    w='50px'
                                />
                                <div>
                                    <h4>{track.name}</h4>
                                </div>  
                            </Td>
                            <Td>{track.duration_ms}</Td>
                            <Td borderTopRightRadius="md" borderBottomRightRadius="md">{convertirAMinutosYSegundos(track.duration_ms)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}