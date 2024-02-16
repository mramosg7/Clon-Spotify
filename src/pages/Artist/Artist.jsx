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
    const {getToken} = useAuthAPI()

    useEffect(()=>{
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
                    console.log(data)
                    setAlbums(data.items)
                    console.log(albums)
                })
            })
    },[id])


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
                {albums && <ArtistAlbums albums={albums}/>}
            </Box>
            
            
            
        </Box>
    )
}