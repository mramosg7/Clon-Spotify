import { Box } from "@chakra-ui/react"
import { HeaderBody } from "./HeaderBody"
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/home/home'
import '../Styles/scroll.css'
import Playlist from "../pages/playlist/Playlist"
import Artist from '../pages/Artist/Artist'
import Album from "../pages/album/Album"
import Search from "../pages/search/Search"
import { FormPlaylistDetails } from "./FormPlaylistDetails"



export const Body = ({isLogged, user, logout}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      h='97.5vh'
      w='100%'
      p='0px 0px'
      bg='#1E1E1E'
      bgGradient='linear(to-b, #1E1E1E, #0B0B0B)'
      borderRadius='10px'
      marginLeft={2}
    >
      <HeaderBody isLogged={isLogged} user={user} logout={logout}/>

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/section/:id' element={<h1>Hola 2</h1>}/>
          <Route path='/playlist/:id' element={<Playlist/>}/>
          <Route path='/artist/:id' element={<Artist/>}/>
          <Route path='/playlist/editar/:id' element={<FormPlaylistDetails/>}/>
          <Route path='/album/:id' element={<Album/>}/>
          <Route path='/search/:q' element={<Search/>}/>
          
      </Routes>
      
    </Box>
  )
}
