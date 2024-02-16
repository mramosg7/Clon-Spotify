import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Box,
  Text,
  Button,
  color,
} from "@chakra-ui/react";
import { FaPlay} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Link } from "react-router-dom";
import { usePlaylist } from "../hooks/playlistHook/usePlaylist";
import { useEffect, useState } from "react";
import { fetchPlay } from "../services/spotify/playerService";

import { useAuthUser } from "../hooks/auth/useAuthUser";
import { usePlayerContext } from "../context/PlayerContext";
import { IoIosStats } from "react-icons/io";


export default function TableMusic({ tracks , uri}) {
  
  const { handleAddTrack } = usePlaylist()
  const { userPlaylists, handleGetUserPlaylists } = usePlaylist()
  const [hoveredTd, setHoveredTd] = useState(null);
  const {refresh} = useAuthUser
  const {contextPlayer} = usePlayerContext()

  useEffect(() => {
    handleGetUserPlaylists()
    
  }, [])
  

  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: {
      x: 0,
      y: 0,
    },
    trackId: null
  })

  const onRightClickTrack = (event, trackId) => {
    // Eliminar que se pueda sacar el menu del click derecho por defecto
    event.preventDefault()
    setContextMenu({
      isVisible: true,
      position: {
        x: event.pageX,
        y: event.pageY,
      },
      trackId,
    })
  }
  const handleClick = (position)=>{
      const device_id = localStorage.getItem('device_id')
      if(device_id){
        const expiration = localStorage.getItem('expirationAccessToken')
        if(expiration < Date.now()){
          refresh().then(()=>{
            const accessToken = localStorage.getItem('access_token')
            fetchPlay(accessToken,device_id,position,uri)
          })
        }else{
          
          const accessToken = localStorage.getItem('access_token')
          console.log(position)
          fetchPlay(accessToken,device_id,position,uri)
        }
      }
  }

  useEffect(() => {
    const handleClick = () =>
      setContextMenu({
        isVisible: false,
        position: {
          x: 0,
          y: 0,
        },
        trackId: null,
      })
    document.addEventListener("click", handleClick)

    // Limpirar listener
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const fechaFormateada = format(date, "dd MMM yyyy", { locale: esLocale });
    return fechaFormateada;
  };

  function convertirAMinutosYSegundos(tiempoTotal) {
    const tiempoTotalEnSegundos = tiempoTotal / 1000;

    const minutos = Math.floor(tiempoTotalEnSegundos / 60);
    const segundos = Math.floor(tiempoTotalEnSegundos % 60);

    // Formatea los minutos y segundos

    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

    return `${minutos}:${segundosFormateados}`;
  }

  return (
    <>
      <TableContainer>
        <Table size="sm" variant="none">
          <Thead>
            <Tr>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                #
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Título
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Álbum
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Fecha en la que se añadió
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
                fontSize="20px"
              >
                <MdOutlineAccessTime />
              </Th>
              <Th>
                Acciones
              </Th>
            </Tr>
          </Thead>

          <Tbody color="#A9A9A9">
            {tracks.map((track, index) => (
              <Tr
                onContextMenu={(e) => onRightClickTrack(e, track.track.id)}
                key={track.track.id}
                height="10px"
                _hover={{
                  bg: "rgb(255, 255, 255, 0.2)",
                  color: "white",
                }}
                
                onMouseEnter={()=>{setHoveredTd(track.track.id)}}
                onMouseLeave={()=>{setHoveredTd(null)}}
              >
                <Td borderTopLeftRadius="md" borderBottomLeftRadius="md">
                  {contextPlayer && contextPlayer.item.id === track.track.id ? <IoIosStats style={{color:'green', fontSize:'20px'}}/> : 
                  hoveredTd === track.track.id ? <FaPlay onClick={()=>{handleClick(index)}} style={{fontSize:'10px'}}/> : index + 1}
                  
                </Td>
                <Td color="white" display="flex" gap="10px" alignItems="center">
                  <Image
                    src={track.track.album.images[2].url}
                    borderRadius="5px"
                    w="50px"
                  />
                  <div>
                  <h4 style={(contextPlayer && contextPlayer.item.id === track.track.id) ? {color:"green"}: null}>
                    {track.track.name}
                  </h4>
                    <Box display="flex">
                      {track.track.artists.map((a, index) => (
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
                <Td> {track.track.album.name}</Td>
                <Td>{formatearFecha(track.added_at)}</Td>
                <Td borderTopRightRadius="md" borderBottomRightRadius="md">
                  {convertirAMinutosYSegundos(track.track.duration_ms)}
                </Td>
                
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {contextMenu.isVisible && (
        <select
          style={{
            position: "absolute",
            top: contextMenu.position.y,
            left: contextMenu.position.x,
            zIndex: 10,
            padding: "10px",
            backgroundColor: "#292829",
            boxShadow: "0px 0px 16px 5px rgba(0,0,0,0.4)",
            color: "#e6e6e6",
            display: "flex",
            borderRadius: "3px",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          {userPlaylists.map(playlist => (
            <option>{playlist.name}</option>
          ))}
        </select>
      )}
    </>
  );
}
