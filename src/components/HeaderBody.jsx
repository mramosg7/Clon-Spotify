import { Box, Button, Link } from "@chakra-ui/react"
import UserHeaderBody from "./UserHeaderBody";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import LoginButton from "../components/LoginButton"
import { useNavigate } from 'react-router-dom';

export const HeaderBody = ({isLogged, user, logout}) => {
  const navigate = useNavigate();
  const navegarHaciaAtras = () => {
    navigate(-1);
  };

  const navegarHaciaAdelante = () => {
    navigate(1);
  };

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
          <Link onClick={()=>{navegarHaciaAtras()}}>
            <IoIosArrowBack style={{padding: '5px', backgroundColor: '#000000', color: '#fff', width: '30px', height: '30px', marginRight: '10px', borderRadius: '100%'}}/>
          </Link>
          <Link onClick={()=>{navegarHaciaAdelante()}}>
            <IoIosArrowForward style={{padding: '5px', backgroundColor: '#000000', color: '#fff', width: '30px', height: '30px', borderRadius: '100%'}}/>
          </Link>
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


