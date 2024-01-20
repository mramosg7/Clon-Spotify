import { Box } from '@chakra-ui/react'
import { HerramientasUsuario } from './components/HerramientasUsuario'
// import Home from './pages/home/home'
import { Biblioteca } from './components/Biblioteca'
import { Body } from './components/Body'


function App() {

  return (
      <Box
        p='10px'
        bg='#000'
        w='100%'
        h='100vh'
        overflow='hidden'
        display='flex'
      >
        <div>
          <HerramientasUsuario />
          <Biblioteca />
        </div>
        <Body />
      </Box>
  )
}

export default App

