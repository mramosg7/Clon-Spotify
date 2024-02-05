import { useEffect, useState } from "react";
import { fetchGetAlbum } from "@/services/spotify/albumService";
import DefaultImage from '../../assets/PlaylistDefault.png'
import { useParams, Link } from "react-router-dom";
import { Box, Image,Heading,Text } from "@chakra-ui/react";
import {useAuthAPI} from "@/hooks/auth/useAuthAPI"
import TableMusicAlbum from "../../components/TableMusicAlbum";
import ArtistAlbums from '../../components/ArtistAlbums'
import { fetchGetArtistAlbums } from "../../services/spotify/artistService";

export default function Album(){
    const {id} = useParams()
    const [album, setAlbum] = useState(null)
    const [artistAlbums, setArtistAlbums] = useState(null)
    const {token, getToken} = useAuthAPI()
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        const tokenExpiration = localStorage.getItem('tokenExpiration')
      
        if(!token || Date.now() > tokenExpiration){
            getToken().then((tk)=>{
                fetchGetAlbum(id,tk).then((data)=>{
                    setAlbum(data)
                    fetchGetArtistAlbums(data.artists[0].id, tk).then((data)=>{
                        setArtistAlbums(data.items.slice(0,6))
                    })
                }).finally(()=>setLoading(false))
            })
        }else{
            fetchGetAlbum(id,token).then((data)=>{
                setAlbum(data)
                console.log(data)
                fetchGetArtistAlbums(data.artists[0].id, token).then((data)=>{
                    
                    setArtistAlbums(data.items.slice(0,6))
                })
            }).finally(()=>setLoading(false))
        }
    },[id])

    return(

        <>
            {!isLoading && album && (
                <Box
                    overflow='auto'
                >
                    <header>
                        <Box
                            display='flex'
                            color='white'
                            width='100%'
                            height='35vh'
                            justifyContent='start'
                            alignItems='end'
                            p='20px 40px'
                        >

                            <Box
                                w='270px'
                                marginRight={10}
                                boxShadow='0 0 25px black'
                            >
                                {
                                    album.images && album.images.length > 0 && album.images[0].url
                                        ? (<img style={{borderRadius: '5px'}} src={album.images[0].url} alt="Imagen PlayList"></img>) 
                                        : (<img style={{ width: '270px'}} src={DefaultImage} alt="Imagen Default PlayList"></img>)
                                }
                            </Box>
                            <div>
                                <p>{album.album_type}</p>
                                <Heading fontSize='3em'>{album.name}</Heading>
                                <Box display='flex' gap='4px'style={{fontWeight: 'bold', marginTop: '10px'}}>
                                    {album.artists.map((artist, index)=>{return index ===0 ? (<Link to={`/artist/${artist.id}`}><Text 
                                                    
                                                    _hover={{
                                                        color:'white',
                                                        textDecoration:'underline'
                                                    }}
                                                >{artist.name}</Text></Link>) : (<Link to={`/artist/${artist.id}`}><Text 
                                               
                                                _hover={{
                                                    color:'white',
                                                    textDecoration:'underline'
                                                }}
                                            > • {artist.name} </Text></Link>)})} 
                                    <p>• {album.release_date.slice(0,4)} • {album.tracks.total} {album.tracks.total === 1 ? "canción" :'canciones'}</p>
                                </Box>
                            </div>
                        </Box>
                    </header>
                    <section style={{padding: '20px'}}>
                        <TableMusicAlbum  tracks = {album.tracks.items}></TableMusicAlbum>
                    </section>
                    <section style={{padding: '20px'}}>
                        <Heading color='white' marginBottom='20px'>Más de {album.artists[0].name}</Heading>
                        {artistAlbums && 
                            <ArtistAlbums albums = {artistAlbums}/>  
                       }
                    </section>

                    
                </Box>
            )}
        </>
    )

}