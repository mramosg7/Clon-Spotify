import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import{useAuthAPI} from '@/hooks/auth/useAuthAPI.jsx'



export default function Search(){
    const {token, getToken} = useAuthAPI()
    const [search, setSearch] = useState(null)

    useEffect(()=>{
        const tokenExpiration = localStorage.getItem('tokenExpiration')
        if(!token || Date.now() > tokenExpiration){
            getToken()
        }
    },[])


    return(
        <>
            <SearchBar token = {token} setSearch = {setSearch}/>
            {search && (
                <>
                    
                </>
            )}
        </>
    )
}