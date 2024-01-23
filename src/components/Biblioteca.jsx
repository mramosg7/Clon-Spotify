import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import { HiOutlinePencil } from "react-icons/hi2"
import { TiDeleteOutline } from "react-icons/ti"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { Link } from "react-router-dom"
import DefaultImage from "../assets/PlaylistDefault.png"
import { useRef, useState } from "react"
import { FormPlaylistDetails } from "./FormPlaylistDetails"

export const Biblioteca = () => {

    const { handleCreatePlaylist, isCreating, userPlaylists, openMenu, closeMenu, contextMenuState } = usePlaylist()

    const [isFormOpen, setIsFormOpen] = useState(false)

    const openForm = () => {
        setIsFormOpen(true)
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
            <>
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
                </GridItem>
            </Link>
            <Menu
                  isOpen={
                    contextMenuState.isOpen &&
                    contextMenuState.playlistId === playlist.id
                  }
                  onClose={closeMenu}
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
                        _hover={{
                            bg: '#242424'
                        }}
                    >
                    <HiOutlinePencil style={{marginRight: '5px', cursor: 'pointer'}} onClick={() => openForm(playlist.id)}/> Editar Datos
                    {isFormOpen && <FormPlaylistDetails />}
                    </MenuItem>
                    <MenuItem
                        bg='transparent'
                        color='#fff'
                        _hover={{
                            bg: '#242424'
                        }}
                    ><TiDeleteOutline style={{marginRight: '5px'}}/> Eliminar</MenuItem>
                  </MenuList>
                </Menu>
            </>
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
