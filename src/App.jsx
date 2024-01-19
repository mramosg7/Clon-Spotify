import { Box } from '@chakra-ui/react'
import { HerramientasUsuario } from './components/HerramientasUsuario'
import Home from './pages/home/home'
import { Biblioteca } from './components/Biblioteca'


function App() {

  return (
      <Box
        p='10px'
        bg='#000'
        w='100%'
        h='100vh'
        overflow='hidden'
      >
        <HerramientasUsuario />
        <Biblioteca />
      </Box>
  )
}

export default App
