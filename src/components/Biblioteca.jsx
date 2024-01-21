import { Box, Button, Flex, Link } from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import { fetchNewPlaylist } from '@spotify/playlistsService.js'
import { useEffect, useState } from "react"
import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'

export const Biblioteca = () => {

    // const [isCreating, setCreating] = useState(false)
    // const [userPlaylists, setUserPlaylists] = useState([])
    // const {token, getToken} = useAuthAPI()
    // useEffect(()=>{
    //     const tokenExpiration = localStorage.getItem('tokenExpiration')
    //     const userString = localStorage.getItem('user')
    //     const user = JSON.parse(userString)
    //     const userId = user.id
        
    //     const fetchPlaylists = async () => {
    //         try {
    //             setCreating(true)
    //             const newPlaylistData = await fetchNewPlaylist(token, userId)
    //             setUserPlaylists(newPlaylistData.playlists.items)
    //         } catch (error) {
    //             console.error('Error al crear la playlist:', error)
    //         } finally {
    //             setCreating(false)
    //         }
    //     }

    //     if (!token || Date.now() > tokenExpiration) {
    //         getToken().then(fetchPlaylists)
    //     } else {
    //         fetchPlaylists()
    //     }
    // }, [])

    // const handleCreatePlaylist = async () => {
    //     try {
    //         setCreating(true)
    //         const defaultPlaylistData = {
                
    //         }
    //         const newPlaylistData = await fetchNewPlaylist(token, userId, defaultPlaylistData)
    //         setUserPlaylists(newPlaylistData.playlists.items)
    //     } catch (error) {
    //         console.error('Error al crear la playlist:', error)
    //     } finally {
    //         setCreating(false)
    //     }
    // }

  return (
    <>
        <Box
            p='15px 10px'
            bg='#131213'
            w='25em'
            h='81vh'
            borderRadius='7px'
            marginTop='10px'
            boxSizing="border-box"
        >
            <Flex
                color="#b3b3b3"
                display='flex'
                alignItems="center"
                justifyContent='space-between'
                fontSize='1em'  
                fontWeight='600'
                cursor='pointer'
                p='3px 15px'
            >
                <Link 
                    display='flex'
                >
                    <IoLibrary style={{ color: 'b3b3b3', marginRight: '20px', width: '25px', height: '25px'}}/>
                    Tu Biblioteca
                </Link>
                <GoPlus style={{ width: '23px', height: '23px'}}/>
            </Flex>
            <Box
                width='100%'
                p='15px 18px'
                bg='#242424'
                marginTop='14px'
                color='#fff'
                borderRadius='8px'
                textAlign='left'
                fontWeight='bold'
            >
                <h2>Crea tu primera lista</h2>
                <p style={{fontWeight: '400', marginTop: '5px', fontSize: '14px'}}>
                    Es muy fácil, y te echaremos una mano</p>
                <Button
                    bg='#fff'
                    marginTop='20px'
                    height='2em'
                    borderRadius='20px'
                    fontWeight='600'
                >
                     Crear lista
                </Button>
            </Box>
        </Box>
    </>
  )
}
