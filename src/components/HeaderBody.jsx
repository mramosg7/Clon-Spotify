import { Box, Link } from "@chakra-ui/react"
import UserHeaderBody from "./UserHeaderBody";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import LoginButton from "../components/LoginButton"
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from "./SearchBar";

export const HeaderBody = ({isLogged, user, logout}) => {
  const navigate = useNavigate();
  const location = useLocation();


  
  const isSearchPage = location.pathname.startsWith('/search');
  const navegarHaciaAtras = () => {
    navigate(-1);
  };


  const navegarHaciaAdelante = () => {
    navigate(1);
  };

  const search=(key)=>{
    navigate(`/search/${key}`);
  }
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
        {isSearchPage && <SearchBar search={search}/>}

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


