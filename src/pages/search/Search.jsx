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
                <>
                    {results.tracks && <SearchTrack tracks={results.tracks.items}/>}
                    {results.artists && <>
                        <h1>Artistas</h1>
                        <ArtistasSearch artistas={results.artists.items}/>
                    </> }
                    {results.albums && <>
                        <h1>Albumns</h1>
                        <ArtistAlbums albums={results.albums.items}/>
                    </>}
                   
                </>
            )}
        </Box>
    )
}