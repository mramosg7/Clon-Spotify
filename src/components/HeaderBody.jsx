import { Box, Button, Link } from "@chakra-ui/react"
import { useAuthUser } from "../hooks/auth/useAuthUser"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const HeaderBody = ({}) => {

    const {isLogged, user, login, logout} = useAuthUser()

  return (
    <Box
        display='flex'
        h='4em'
        width='100%'
        justifyContent='space-between'
        bg='#111111'
        p='8px 20px'
    >
        <Box 
            display='flex'
            alignItems='center'
        >
            <Link><IoIosArrowBack style={{padding: '5px', backgroundColor: '#000000', color: '#fff', width: '30px', height: '30px', marginRight: '10px', borderRadius: '100%'}}/></Link>
            <Link><IoIosArrowForward style={{padding: '5px', backgroundColor: '#000000', color: '#fff', width: '30px', height: '30px', borderRadius: '100%'}}/></Link>
        </Box>

      {
        isLogged ? (
            <h1>Se renderiza otro componente</h1>
        ) : (
            <Button
                onClick={login}
                bg='#fff'
                height='3em'
                borderRadius='60px'
                fontWeight='600'
                p='0 30px'
            >
                Iniciar Sesión
            </Button>
        )
      }
    </Box>
  )
}


