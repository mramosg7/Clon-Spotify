import { useState, useEffect } from "react";

import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'
import { fetchSearch } from "../../services/spotify/searchService";
import SearchTrack from "../../components/SearchTracks";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ArtistAlbums from "../../components/ArtistAlbums";
import ArtistasSearch from "../../components/ArtistasSearch";

export default function Search(){
    const {getToken} = useAuthAPI()
    const [results, setResults] = useState(null)
    const {q} = useParams()

   


    useEffect(()=>{
            getToken().then((tk)=>{
                fetchSearch(q, tk)
                .then((data)=>{
                    setResults(data)
                    console.log(data)
                })
            })
    },[q])


    return(
        <Box
            overflow='auto'
            color="white"
        >
            {results && (
                <Box
                    bg='#121212'
                >
                    {results.tracks && <SearchTrack tracks={results.tracks.items}/>}
                    {results.artists && (
                    <Box
                        w='100%'
                        p='35px'
                    >
                        <h1 style={{
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Artistas</h1>
                        <ArtistasSearch artistas={results.artists.items}/>
                    </Box>) }
                    {results.albums && (
                        <Box
                            w='100%'
                            p='35px'
                        >
                        <h1 style={{
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Álbumes</h1>
                        <ArtistAlbums albums={results.albums.items}/>
                        </Box>
                    )}
                   
                </Box>
            )}
        </Box>
    )
}