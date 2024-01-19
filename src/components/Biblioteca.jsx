import { Box, Flex, Link } from "@chakra-ui/react"
import { GoPlus } from "react-icons/go";
import { IoLibrary } from "react-icons/io5";


export const Biblioteca = () => {
  return (
    <>
        <Box
            p='15px 20px'
            bg='#131213'
            w='18em'
            h='70vh'
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
                p='10px 15px'
            >
                <Link 
                    display='flex'
                >
                    <IoLibrary style={{color: 'b3b3b3', marginRight: '20px', width: '25px', height: '25px'}}/>
                    Tu Biblioteca
                </Link>
                <GoPlus style={{ width: '23px', height: '23px'}}/>
            </Flex>
            <Box
                width='100%'
                p='15px 28px'
                bg='#252524'
                marginTop='30px'
                color='#fff'
                borderRadius='5px'
            >
                <h2>Crea tu primera PlayList</h2>
            </Box>
        </Box>
    </>
  )
}
