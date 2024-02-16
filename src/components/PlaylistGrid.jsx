import {
  Box,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react"
import { GoPencil } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom"
import DefaultImage from "../assets/PlaylistDefault.png"
import React, { useEffect, useState } from "react"

export const PlaylistGrid = ({ userPlaylists }) => {
  const navigate = useNavigate()
  // Menu para editar
  const [contextMenu, setContextMenu] = useState({
    isVisible: false, // Visibilidad
    position: {
      // Posicion del cursor donde se desplegara el menu
      x: 0,
      y: 0,
    },
    playlistId: null, // ID de la playlist que se va a editar
  })

  const onRightClickPlaylist = (event, playlistId) => {
    // Eliminar que se pueda sacar el menu del click derecho por defecto
    event.preventDefault()
    setContextMenu({
      isVisible: true,
      position: {
        x: event.pageX,
        y: event.pageY,
      },
      playlistId,
    })
  }

  useEffect(() => {
    const handleClick = () =>
      setContextMenu({
        isVisible: false,
        position: {
          x: 0,
          y: 0,
        },
        playlistId: null,
      })
    document.addEventListener("click", handleClick)

    // Limpirar listener
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const editar = (id) => {
    navigate(`/playlist/editar/${id}`)
  }

  return (
    <>
      <Grid gap={2} templateColumns="repeat(3, 1fr)">
        {userPlaylists.map((playlist) => (
          <React.Fragment key={playlist.id} >
            <GridItem
              onContextMenu={(e) => onRightClickPlaylist(e, playlist.id)}
              w="100%"
              bg="#111111"
              color="#fff"
              p="14px 15px"
              borderRadius="8px"
              marginTop="14px"
              cursor="pointer"
              position="relative"
              overflow='hidden'
              _hover={{
                bg: "#1B1B1B",
              }}
            >
              <Link to={`/playlist/${playlist.id}`}>
                <img
                  style={{
                    borderRadius: "7px",
                    width: "100%",
                    height: '90px',
                    marginBottom: "10px",
                  }}
                  src={
                    playlist.images.length > 0
                      ? playlist.images[0].url
                      : DefaultImage
                  }
                  alt={playlist.name}
                />
                <Box>
                  <Text fontSize='13px' fontWeight='bold' textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                    {playlist.name}
                  </Text>
                  <Text fontSize='13px' fontWeight='600' textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color="#919191">
                    Lista • {playlist.owner.display_name}
                  </Text>
                </Box>
              </Link>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
      {contextMenu.isVisible && (
         <div
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
         onClick={() => editar(contextMenu.playlistId)}
       >
         <GoPencil style={{marginRight: "10px"}}/> Editar datos
       </div>
        )}
    </>
  )
}
