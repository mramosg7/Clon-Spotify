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
    Text
  } from '@chakra-ui/react'
import { MdOutlineAccessTime } from "react-icons/md";
import { format } from "date-fns";
import esLocale from 'date-fns/locale/es';
import { Link } from 'react-router-dom';
import { FaPlay} from "react-icons/fa";
import { fetchPlay } from "../services/spotify/playerService";

import { useAuthUser } from "../hooks/auth/useAuthUser";
import { usePlayerContext } from "../context/PlayerContext";
import { IoIosStats } from "react-icons/io";
import { useState } from 'react';


export default function TableMusicAlbum({tracks, uri}){
    const [hoveredTd, setHoveredTd] = useState(null);
    const {getAccessToken} = useAuthUser()
    const {contextPlayer} = usePlayerContext()

    function convertirAMinutosYSegundos(tiempoTotal) {
        const tiempoTotalEnSegundos = tiempoTotal / 1000;

        const minutos = Math.floor(tiempoTotalEnSegundos / 60);
        const segundos = Math.floor(tiempoTotalEnSegundos % 60);

        // Formatea los minutos y segundos
       
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        return `${minutos}:${segundosFormateados}`;
      }

    const handleClick = (position)=>{
        const device_id = localStorage.getItem('device_id')
        if(device_id){
          getAccessToken().then((tk)=>{
            fetchPlay(tk,device_id,position,uri)
          })
        }
    }
    return(
        <TableContainer>
            <Table size='sm' variant='none'>
                <Thead >
                    <Tr >
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>#</Th>
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9'>Título</Th>
                        
                        <Th borderBottom="1px" borderBottomColor="#434343" color='#A9A9A9' fontSize='20px'><MdOutlineAccessTime /></Th>
                    </Tr>
                </Thead>
               
                <Tbody
                    color='#A9A9A9'
                >
                    {tracks.map((track, index)=>(
                        <Tr key={track.id} 
                            height='10px'
                            _hover={{
                                bg:'rgb(255, 255, 255, 0.2)',
                                color: 'white'
                            }}
                            onMouseEnter={()=>{setHoveredTd(track.id)}}
                            onMouseLeave={()=>{setHoveredTd(null)}}
                            
                        >
                            <Td borderTopLeftRadius="md" borderBottomLeftRadius="md">{contextPlayer && contextPlayer.item.id === track.id ? <IoIosStats style={{color:'#1ED760', fontSize:'20px'}}/> : 
                  hoveredTd === track.id ? <FaPlay onClick={()=>{handleClick(index)}} style={{fontSize:'10px'}}/> : index + 1}
                  </Td>
                            <Td color='white' display='flex' gap='10px' alignItems='center'>
                                <div>
                                    <h4 style={{ color :contextPlayer.item.id === track.id ? '#1ED760' : 'white'}}>{track.name}</h4>
                                    <Box
                                        display='flex'
                                    >
                                        {track.artists.map((a, index)=>(
                                            <Link to={`/artist/${a.id}`} key={a.id}>
                                                <Text 
                                                    color='#A9A9A9'
                                                    _hover={{
                                                        color:'white',
                                                        textDecoration:'underline'
                                                    }}
                                                >{index !== 0 ? ', ' : ''}{a.name}</Text>
                                            </Link>
                                        ))}
                                    </Box>
                                </div> 
                                
                                
                            </Td>
                            <Td borderTopRightRadius="md" borderBottomRightRadius="md">{convertirAMinutosYSegundos(track.duration_ms)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}