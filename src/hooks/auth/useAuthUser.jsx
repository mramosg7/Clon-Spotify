import { useEffect, useState } from "react";
import { fetchIdUser, fetchGetUserToken, fetchRefresh} from "@spotify/authService.js"
import { getCodeVerifier } from "@spotify/codeVerifier";
import { clientId, redirectUri } from "../../variiables";

export const useAuthUser= ()=>{
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
    const [isLogged, setLogged] = useState(Boolean(localStorage.getItem("user")))
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    const [expiration, setExpiration] = useState(localStorage.getItem('expirationAccessToken'))

    const userLocal = localStorage.getItem("user")

    useEffect(() => {
        if(userLocal)  setLogged(true)
    }, [userLocal])

    const login = ()=>{
        getCodeVerifier().then((data)=>{
            const {codeVerifier, codeChallenge} = data
            window.localStorage.setItem('code_verifier', codeVerifier);

            
            const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public ugc-image-upload playlist-read-private playlist-read-collaborative user-read-playback-state streaming';
            const authUrl = new URL("https://accounts.spotify.com/authorize");

            const params = {
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: redirectUri,
            }

            authUrl.search = new URLSearchParams(params).toString();
            window.location.href = authUrl.toString(); 
        })
        
        
    }
  
    const getAccessToken = async()=>{

        if(accessToken){
            if(expiration < Date.now()){
               const token = await refresh()
               return token
            }
            return accessToken
        }
   
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeVerifier = localStorage.getItem('code_verifier');
        const data = await fetchGetUserToken(code,redirectUri,clientId,codeVerifier)        
        if(data.expires_in && data.access_token && data.refresh_token){
            localStorage.setItem('expirationAccessToken',Date.now() + data.expires_in * 1000)
            setExpiration(Date.now() + data.expires_in * 1000)
            localStorage.setItem('refreshToken', data.refresh_token)
            localStorage.setItem('access_token', data.access_token);
            setLogged(true)
            return data.access_token
        }
        
        
    }
    
    const getUserId = async(tk)=>{
        if(tk){
            return await fetchIdUser(tk)
            .then(data => {
                if(data){
                    localStorage.setItem('user', JSON.stringify(data))
                    setUser(data)
                    setLogged(true)
                }
               
            })
            .catch(error => {
                console.error('Error al obtener información del usuario:', error)
                setLogged(false)
            })
        }
            
    }
    

    const logout = ()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        localStorage.removeItem('code_verifier')
        localStorage.removeItem('userPlaylists')
        setUser(null)
        setLogged(false)
        window.location.href = '/'
    }
    

    const refresh = async()=>{
        const token = localStorage.getItem('refreshToken')
        if (!token){
            return
        }
            const data = await fetchRefresh(token,clientId)
            if(data.expires_in && data.access_token && data.refresh_token){
                localStorage.setItem('expirationAccessToken',Date.now() + data.expires_in * 1000)
                setExpiration(Date.now() + data.expires_in * 1000)
                localStorage.setItem('access_token', data.access_token)
                setAccessToken(data.access_token)
                localStorage.setItem('refreshToken', data.refresh_token)

                return data.access_token
        }
      
    }

    return{
        user,
        isLogged,
        getAccessToken,
        getUserId,
        login,
        logout,
        refresh
    }


}