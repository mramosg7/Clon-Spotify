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
  Text
} from "@chakra-ui/react";
import { FaPlay} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { usePlaylist } from "../hooks/playlistHook/usePlaylist";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { HiOutlineTrash } from "react-icons/hi2";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { usePlayerContext } from "../context/PlayerContext";
import { IoIosStats } from "react-icons/io";
import { convertirAMinutosYSegundos, formatearFecha } from "../functions/convertirTiempo";
import { usePlayer } from "../hooks/player/usePlayer";

export default function TableMusic({ tracks , uri}) {

  const { handleAddTrack, userPlaylists, handleGetUserPlaylists, handleRemoveTrack } = usePlaylist()
  const {id} = useParams()
  const [hoveredTd, setHoveredTd] = useState(null);

  const [trackss, setTrackss] = useState(tracks)
  const {contextPlayer} = usePlayerContext()
  const [userOwnedPlaylists, setUserOwnedPlaylists] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const {play} = usePlayer()
  const [contextMenu, setContextMenu] = useState({
    isVisible: false, 
    position: {
      x: 0,
      y: 0,
    },
    trackUri: null
  })
  const contextMenuRef = useRef(null)

  // Obtener usuario del localstorage
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  let userId = null
  if(user) userId = user.id
  

  useEffect(() => {
    handleGetUserPlaylists()
  }, [])
  

  useEffect(() => {
    const ownedPlaylists = userPlaylists.filter(playlist => playlist.owner.id === userId)
    setUserOwnedPlaylists(ownedPlaylists)
  }, [userPlaylists, userId])

  useEffect(()=>{
    setTrackss(tracks)
  },[tracks])
  
  useEffect(() => {

    // Cerrar el menu al hacer clic fuera
    const handleClose = (event) => {
      if(contextMenu.isVisible && !contextMenuRef.current.contains(event.target)) {
        setContextMenu({
          ...contextMenu,
          isVisible: false
        })
      }
    }

    document.addEventListener("mousedown", handleClose)

    return () => document.removeEventListener("mousedown", handleClose)
    
  }, [contextMenu])


  const handleToggleOptions = () => {
    setShowOptions(!showOptions)
  }

  const isPlaylistOwned = userOwnedPlaylists.some(playlist => playlist.id === id)

  const onRightClickTrack = (event, trackUri) => {
    // Eliminar que se pueda sacar el menu del click derecho por defecto
    event.preventDefault()
    setContextMenu({
      isVisible: true,
      position: {
        x: event.pageX,
        y: event.pageY,
      },
      trackUri,
    })
  }
  const handleClick = (position)=>{
      const device_id = localStorage.getItem('device_id')
      if(device_id){
        play(uri, position)
      }
  }

  const handleSelectPlaylist = (playlistId) => {
    if(contextMenu.trackUri && playlistId) {
      handleAddTrack(playlistId, contextMenu.trackUri)
      setContextMenu({
        ...contextMenu,
        isVisible: false
      })
    }
  }

  const handleDeleteTrack = (playlistId) => {
    if(contextMenu.trackUri && playlistId) {
      handleRemoveTrack(playlistId, contextMenu.trackUri)
      setTrackss(prevTracks => prevTracks.filter(track => track.track.uri != contextMenu.trackUri))
      
      setContextMenu({
        ...contextMenu,
        isVisible: false
      })
    }
  }

  const handleMenuSelect = (playlistId) => {
    handleSelectPlaylist(playlistId)
    setContextMenu({ ...contextMenu, isVisible: false })
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
            </Tr>
          </Thead>

          <Tbody color="#A9A9A9">
            {trackss.map((track, index) => (
              <Tr
                onContextMenu={(e) => onRightClickTrack(e, track.track.uri)}
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
                  {contextPlayer && contextPlayer.item.id === track.track.id ? <IoIosStats style={{color:'#1ED760', fontSize:'20px'}}/> : 
                  hoveredTd === track.track.id ? <FaPlay onClick={()=>{handleClick(index)}} style={{fontSize:'10px'}}/> : index + 1}
                  
                </Td>
                <Td color="white" display="flex" gap="10px" alignItems="center">
                  <Image
                    src={track.track.album.images[2].url}
                    borderRadius="5px"
                    w="50px"
                  />
                  <div>
                  <h4 style={(contextPlayer && contextPlayer.item.id === track.track.id) ? {color:'#1ED760'}: null}>
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
      <div
        style={{
          position: 'absolute',
          top: contextMenu.position.y,
          left: contextMenu.position.x,
          zIndex: 1000,
          padding: '10px',
          backgroundColor: '#292928',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '3px',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        }}
        ref={contextMenuRef}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }} onClick={handleToggleOptions}>
          <FaPlus style={{marginRight: '10px', color: 'gray'}}/> Añadir a lista <MdKeyboardArrowRight />
        </div>
        {isPlaylistOwned && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px'
          }}
          onClick={() => handleDeleteTrack(id)}
          >
            <HiOutlineTrash  style={{marginRight: '10px', color: 'gray'}}/> Quitar de esta lista 
          </div>
        )}
          {showOptions && (
            <div
              style={{
                position: 'absolute',
                left: '100%',
                top: '0',
                backgroundColor: '#292928',
                borderRadius: '3px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                padding: '10px',
                zIndex: 1000,
                cursor: 'pointer',
                width: '200px',
                height: '200px',
                textOverflow: 'ellipsis',
                overflow: 'auto'
              }}
            >
              {userOwnedPlaylists.map((playlist) => (
                <div style={{
                  padding: '5px',
                  marginBottom: '2px'
                }} key={playlist.id} onClick={() => handleMenuSelect(playlist.id)}>
                  {playlist.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}