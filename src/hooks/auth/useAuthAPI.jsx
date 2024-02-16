import { useState } from "react"
import {getApiToken} from "@spotify/authService.js"
import {clientId, clientSecret} from "../../variiables"
export const useAuthAPI = ()=>{
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [expiration, setExpiration] = useState(localStorage.getItem('tokenExpiration'))
    const getToken = async()=>{
        if(token){
            if(Date.now()>expiration){
                const data = await getApiToken(clientId,clientSecret)
                localStorage.setItem("token",data.access_token)
                setToken(data.access_token)
                localStorage.setItem("tokenExpiration", Date.now() + data.expires_in * 1000)
                return(data.access_token)
            }
            return token
        }
        const data = await getApiToken(clientId,clientSecret)
        localStorage.setItem("token",data.access_token)
        setToken(data.access_token)
        localStorage.setItem("tokenExpiration", Date.now() + data.expires_in * 1000)
        return(data.access_token)
    }
    return{
        getToken
    }
}