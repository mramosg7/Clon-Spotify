import { useState } from "react"
import {getApiToken} from "@spotify/authService.js"
import {clientId, clientSecret} from "../../variiables"
export const useAuthAPI = ()=>{
    const [token, setToken] = useState(localStorage.getItem('token'))

    const getToken = ()=>{
        getApiToken(clientId,clientSecret).then(data =>{
            localStorage.setItem("token",data.access_token)
            setToken(data.access_token)
            localStorage.setItem("tokenExpiration", Date.now() + data.expiresIn * 1000)
        })
    }
    return{
        getToken,
        token
    }
}