import { Box, Button, Link } from "@chakra-ui/react"
import UserHeaderBody from "./UserHeaderBody";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import LoginButton from "../components/LoginButton"

export const HeaderBody = ({isLogged, user, logout}) => {

 

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
        !isLogged ? (
            <LoginButton/>
        ) : (
            user && <UserHeaderBody user={user} logout={logout}/>
        )
      }
    </Box>
  )
}


