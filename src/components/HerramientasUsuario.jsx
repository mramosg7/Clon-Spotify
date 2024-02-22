import { Box, ListItem, UnorderedList } from "@chakra-ui/react"
import { FaSpotify } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const HerramientasUsuario = () => {
  return (
    <>
        <Box
            p='14px 8px'
            bg='#131213'
            maxW='30em'
            minH='100px'
            borderRadius='7px'
            boxSizing="border-box"
            overflow='hidden'
        >
            <UnorderedList 
                display='flex' 
                flexDirection='column'
                align='center'
            >
                <Box
                    color="#fff"
                    display='flex'
                    alignItems="center"
                    justifyContent='start'
                    fontSize='1.2em'
                    fontWeight='600'
                    _hover={{
                        color:"white"
                    }}
                >
                    <FaSpotify style={{color: 'white', marginRight: '5px', width: '25px', height: '25px'}}/>
                     Spotify
                </Box>
                <Link to={'/'}>
                    <Box
                        color="#b3b3b3"
                        display='flex'
                        alignItems="center"
                        justifyContent='start'
                        fontSize='1em'
                        fontWeight='500'
                        marginTop='20px'
                        cursor='pointer'
                        _hover={{
                            color:"white"
                        }}
                    >
                        <GoHome style={{color: '#b3b3b3', marginRight: '20px', width: '25px', height: '25px'}}/>
                        Inicio
                    </Box>
                </Link>
                <Link to={"/search"}>
                    <Box 
                        color="#b3b3b3"
                        display='flex'
                        alignItems="center"
                        justifyContent='start'
                        fontSize='1em'
                        fontWeight='600'
                        marginTop='20px'
                        cursor='pointer'
                        _hover={{
                            color:"white"
                        }}
                    >
                        <IoSearchOutline style={{color: 'b3b3b3', marginRight: '20px', width: '25px', height: '25px'}}/>
                        Buscar
                    </Box>
                </Link>
            </UnorderedList>
        </Box>
    </>
  )
}
