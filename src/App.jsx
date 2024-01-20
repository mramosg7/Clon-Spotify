import { Box } from '@chakra-ui/react'
import { HerramientasUsuario } from './components/HerramientasUsuario'

import { Biblioteca } from './components/Biblioteca'
import { Body } from './components/Body'

import { useEffect } from 'react'
import { useAuthUser } from './hooks/auth/useAuthUser'



function App() {
  const {user, getUserId, getAccessToken, isLogged, logout} = useAuthUser()

  useEffect(()=>{
    const codeV = localStorage.getItem('code_verifier')
    if(!user && codeV){
      getAccessToken().then(()=>{
        getUserId()
      })
    }
  },[])

  return (
      <Box
        p='10px'
        bg='#000'
        w='100%'
        minH='100vh'
        overflow='hidden'
        display='flex'
      >
        
        <div>
          <HerramientasUsuario />
          <Biblioteca />
        </div>
        <Body isLogged={isLogged} user={user} logout={logout}/>
       
        
      </Box>
  )
}

export default App

