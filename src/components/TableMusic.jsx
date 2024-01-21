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
    Divider,
  } from '@chakra-ui/react'
import { MdOutlineAccessTime } from "react-icons/md";
import { format } from "date-fns";
import esLocale from 'date-fns/locale/es';

export default function TableMusic({tracks}){

    const formatearFecha = (fecha)=>{
        const date = new Date(fecha);
        const fechaFormateada = format(date, "dd MMM yyyy", { locale: esLocale });
        return fechaFormateada
    }

    function convertirAMinutosYSegundos(tiempoTotal) {
        const tiempoTotalEnSegundos = tiempoTotal / 1000;

        const minutos = Math.floor(tiempoTotalEnSegundos / 60);
        const segundos = Math.floor(tiempoTotalEnSegundos % 60);

        // Formatea los minutos y segundos
       
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        return `${minutos}:${segundosFormateados}`;
      }

    return(
        <TableContainer>
            <Table variant='none'>
                <Thead >
                    <Tr >
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>#</Th>
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>Título</Th>
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>Álbum</Th>
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>Fecha en la que se añadió</Th>
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9' fontSize='20px'><MdOutlineAccessTime /></Th>
                    </Tr>
                </Thead>
               
                <Tbody
                    color='#A9A9A9'
                >
                    {tracks.map((track, index)=>(
                        <Tr key={track.track.id} 
                            height='10px'
                            _hover={{
                                bg:'rgb(255, 255, 255, 0.2)',
                                color: 'white'
                            }}
                            
                        >
                            <Td>{index + 1}</Td>
                            <Td color='white' display='flex' gap='10px' alignItems='center'>
                                <Image
                                    src={track.track.album.images[2].url}
                                    borderRadius='5px'
                                    w='50px'
                                /> {track.track.name}
                            </Td>
                            <Td> {track.track.album.name}
                            </Td>
                            <Td>{formatearFecha(track.added_at)}</Td>
                            <Td>{convertirAMinutosYSegundos(track.track.duration_ms)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}