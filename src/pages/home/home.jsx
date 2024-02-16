import { useAuthUser } from '@/hooks/auth/useAuthUser.jsx'
import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'
import { useEffect, useState } from 'react'
import { fetchFeaturedPlaylists } from '@spotify/playlistsService.js'
import PlaylistsBody from '@/components/PlaylistsBody.jsx'
import { Box,Heading } from '@chakra-ui/react'

export default function Home (){

    const [isLoading, setLoading] = useState(true)
    const [playlists, setPlaylists] = useState([])
    const {getToken} = useAuthAPI()
    useEffect(()=>{
        setLoading(true)
        getToken().then((tk)=>{
            fetchFeaturedPlaylists(tk).then(data =>{
                setPlaylists(data.playlists.items)
            })
            .finally(()=>{
                setTimeout(()=>{setLoading(false)},500)
                
            })
        })
    },[])

    return(
        <Box
            padding='20px'
            overflow='auto'
        >
            <Heading color='white' fontSize='30px' marginBottom='10px'>PlayLists que lo están petando.</Heading>
            <PlaylistsBody playlists = {playlists} isLoaded={!isLoading}/>
        </Box>
    )
}