import { Box, Button, Flex, Link } from "@chakra-ui/react"
import { GoPlus } from "react-icons/go"
import { IoLibrary } from "react-icons/io5"
import {useCreatePlaylist} from "../hooks/playlistHook/useCreatePlaylist"

export const Biblioteca = () => {

    const { handleCreatePlaylist, isCreating, userPlaylists } = useCreatePlaylist()

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
                {
                    userPlaylists.map(playlist => (
                        <Box
                            w='100%'
                            bg='#111111'
                            color='#fff'
                            p='15px 18px'
                            borderRadius='8px'
                            marginTop='14px'
                            cursor='pointer'
                            _hover={{
                                bg: '#1B1B1B'
                            }}
                            key={playlist.id}
                        >
                            
                            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{playlist.name}</p>
                            <p style={{ fontSize: '13px', color: '#919191' }}>Lista • {playlist.owner.display_name}</p>
                        </Box>
                    ))
                }
            {!userPlaylists || (
                <Box
                width='100%'
                p='15px 18px'
                bg='#242424'
                marginTop='14px'
                color='#fff'
                borderRadius='8px'
                textAlign='left'
                fontWeight='bold'
                onClick={handleCreatePlaylist}
                disabled={isCreating}
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
                    {isCreating ? 'Creando...' : 'Crear lista'}
                </Button>
            </Box>
            )}
        </Box>
    </>
  )
}
