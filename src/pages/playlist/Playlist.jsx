import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'
import { fetchDetailsPlaylist } from '@spotify/playlistsService.js'

export default function Playlist(props){
    const {id} = useParams()
    const [playlist, setPlaylist] = useState()
    const {token, getToken} = useAuthAPI()

    useEffect(()=>{
        const tokenExpiration = localStorage.getItem('tokenExpiration')
        if(!token || Date.now() > tokenExpiration){
            getToken().then((tk)=>{
                fetchDetailsPlaylist(tk,id).then(data =>{
                    setPlaylist(data)
                })
                .finally(setLoading(false))
            })
        }else{
            getToken().then((tk)=>{
                fetchDetailsPlaylist(tk,id).then(data =>{
                    setPlaylist(data)
                })
                .finally(setLoading(false))
            })
        }
        

    },[])

    return(
        <>
            {isLoading && (
                <header>
                    
                </header>
            )}
        </>
    )



}