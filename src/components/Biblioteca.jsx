import {
  Box,
  Flex,
} from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { PlaylistGrid } from "./PlaylistGrid"
import { FirstPlaylist } from "./FirstPlaylist"
import { useAuthUser } from "../hooks/auth/useAuthUser"
import { useEffect } from "react"


export const Biblioteca = () => {

  const { handleGetUserPlaylists, handleCreatePlaylist, isCreating, userPlaylists } = usePlaylist()
  const { isLogged } = useAuthUser()

  useEffect(() => {
    if(isLogged)  handleGetUserPlaylists()
  }, [isLogged])


  return (
    <>
      <Box
        p="15px 10px"
        bg="#131213"
        maxW="30em"
        h="79%"
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
        <Box 
          h='95%'
          overflow='auto'
        >
        {isLogged ? (
          userPlaylists.length > 0 ? (
          <PlaylistGrid 
            userPlaylists={userPlaylists}
          />
        ) : (
          <FirstPlaylist 
            handleCreatePlaylist={handleCreatePlaylist}
            isCreating={isCreating}
          />
        )
      ) : (
        <FirstPlaylist 
            handleCreatePlaylist={handleCreatePlaylist}
            isCreating={isCreating}
        />
      )}
      </Box>
      </Box>
    </>
  )
}
