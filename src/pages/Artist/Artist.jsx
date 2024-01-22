import { useState, useEffect } from "react";
import {useAuthAPI} from "@/hooks/auth/useAuthAPI"
import { fetchGetArtist, fetchGetTopTracks, fetchGetArtistAlbums } from "../../services/spotify/artistService";
import { useParams } from "react-router-dom";
import { Box, Image,Heading } from "@chakra-ui/react";
import { TopTracks } from "../../components/TopTracks";
import ArtistAlbums from "@/components/ArtistAlbums"

export default function Artist(){
    const {id} = useParams()
    const [artist, setArtist] = useState(null)
    const [topTracks, setTopTracks] = useState(null)
    const [albums, setAlbums] = useState(null)
    const {token, getToken} = useAuthAPI()

    useEffect(()=>{
        const tokenExpiration = localStorage.getItem('tokenExpiration')
      
        if(!token || Date.now() > tokenExpiration){
            getToken().then((tk)=>{
                fetchGetArtist(id,tk)
                .then((data)=>{
                    setArtist(data)
                })
                fetchGetTopTracks(id,tk)
                .then((data)=>{
                    setTopTracks(data)
                })
                fetchGetArtistAlbums(id,tk)
                .then((data)=>{
                    setAlbums(data.items)
                })
            })
        }else{
            fetchGetArtist(id,token).then((data)=>{
                
                setArtist(data)
                
            })
            fetchGetTopTracks(id,token)
            .then((data)=>{
                setTopTracks(data)
            })
            fetchGetArtistAlbums(id,token)
            .then((data)=>{
                setAlbums(data)
            
            })
           
          
        }
        

    },[])


    return(
        <Box overflow='auto'>
            {artist && (<Box
                display='flex'
                color='white'
                width='100%'
                height='35vh'
                justifyContent='start'
                alignItems='end'
                p='20px 40px'
                bgImage={artist.images[0].url}
                bgPosition='center'
                bgSize='cover'
                bgAttachment='fixed'
            >

                
                <div>
                    <p>Artista</p>
                    <Heading fontSize='6em'>{artist.name}</Heading>
                    
                    {artist.followers && <p style={{fontWeight: 'bold', marginTop: '10px'}}> {artist.followers.total} oyentes mensuales</p>}
                </div>
            </Box>)}
            <Box
                padding='30px'
                
            >
                {topTracks && <TopTracks tracks={topTracks.tracks}/>}
                <Heading color="white" marginBottom='30px' marginTop="10px"> Discografía</Heading>
                {albums && <ArtistAlbums albums={albums.items}/>}
            </Box>
            
            
            
        </Box>
    )
}