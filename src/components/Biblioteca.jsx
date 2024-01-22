import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import { HiOutlinePencil } from "react-icons/hi2"
import { TiDeleteOutline } from "react-icons/ti"
import { useCreatePlaylist } from "../hooks/playlistHook/useCreatePlaylist"
import { Link } from "react-router-dom"
import DefaultImage from "../assets/PlaylistDefault.png"
import { useState } from "react"

export const Biblioteca = () => {

    const { handleCreatePlaylist, isCreating, userPlaylists } = useCreatePlaylist()
  const [contextMenuState, setContextMenuState] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
  })

  const openMenu = (e, playlistId) => {
    e.preventDefault()
    setContextMenuState({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      playlistId: playlistId,
    })
  }

  const closeMenu = () => {
    setContextMenuState({
      isOpen: false,
      position: { x: 0, y: 0 },
      playlistId: null,
    })
  }

  return (
    <>
      <Box
        p="15px 10px"
        bg="#131213"
        w="25em"
        h="81vh"
        borderRadius="7px"
        marginTop="10px"
        boxSizing="border-box"
      >
        <Flex
          color="#b3b3b3"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize="1em"
          fontWeight="600"
          cursor="pointer"
          p="3px 15px"
        >
          <Box display="flex">
            <IoLibrary
              style={{
                color: "b3b3b3",
                marginRight: "20px",
                width: "25px",
                height: "25px",
              }}
            />
            Tu Biblioteca
          </Box>
          <GoPlus
            style={{ width: "23px", height: "23px" }}
            onClick={handleCreatePlaylist}
          />
        </Flex>
        <Grid gap={2} templateColumns="repeat(3, 1fr)">
          {userPlaylists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
              <GridItem
                w="100%"
                bg="#111111"
                color="#fff"
                p="14px 15px"
                borderRadius="8px"
                marginTop="14px"
                cursor="pointer"
                onContextMenu={(e) => openMenu(e, playlist.id)}
                position="relative"
                _hover={{
                  bg: "#1B1B1B",
                }}
              >
                <img
                  style={{
                    borderRadius: "7px",
                    width: "150px",
                    marginBottom: "10px",
                  }}
                  src={DefaultImage}
                ></img>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {playlist.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "#919191" }}>
                    Lista • {playlist.owner.display_name}
                  </p>
                </div>
                <Menu
                  isOpen={
                    contextMenuState.isOpen &&
                    contextMenuState.playlistId === playlist.id
                  }
                  onClose={closeMenu}
                  position="absolute"
                  left={contextMenuState.position.x}
                  top={contextMenuState.position.y}
                >
                  <MenuList
                    bg="#292928" 
                    color="white" 
                    border="none" 
                    padding="4px"
                  >
                    <MenuItem
                        bg='transparent'
                        color='#fff'
                    ><HiOutlinePencil style={{marginRight: '5px'}} /> Editar Datos</MenuItem>
                    <MenuItem
                        bg='transparent'
                        color='#fff'
                    ><TiDeleteOutline style={{marginRight: '5px'}}/> Eliminar</MenuItem>
                  </MenuList>
                </Menu>
              </GridItem>
            </Link>
          ))}
        </Grid>
        {userPlaylists.length === 0 && (
          <Box
            width="100%"
            p="15px 18px"
            bg="#242424"
            marginTop="14px"
            color="#fff"
            borderRadius="8px"
            textAlign="left"
            fontWeight="bold"
            onClick={handleCreatePlaylist}
            disabled={isCreating}
          >
            <h2>Crea tu primera lista</h2>
            <p
              style={{ fontWeight: "400", marginTop: "5px", fontSize: "14px" }}
            >
              Es muy fácil, y te echaremos una mano
            </p>
            <Button
              bg="#fff"
              marginTop="20px"
              height="2em"
              borderRadius="20px"
              fontWeight="600"
            >
              {isCreating ? "Creando..." : "Crear lista"}
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}
