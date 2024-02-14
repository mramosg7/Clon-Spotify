import { useEffect, useState } from "react";
import { fetchIdUser, fetchGetUserToken } from "@spotify/authService.js"
import { getCodeVerifier } from "@spotify/codeVerifier";
import { clientId, redirectUri } from "../../variiables";

export const useAuthUser= ()=>{
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
    const [isLogged, setLogged] = useState(Boolean(localStorage.getItem("user")))
    const userLocal = localStorage.getItem("user")

    useEffect(() => {
        if(userLocal)  setLogged(true)
    }, [userLocal])

    const login = ()=>{
        getCodeVerifier().then((data)=>{
            const {codeVerifier, codeChallenge} = data
            window.localStorage.setItem('code_verifier', codeVerifier);

            
            const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public ugc-image-upload playlist-read-private playlist-read-collaborative user-read-playback-state';
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
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
      

        const codeVerifier = localStorage.getItem('code_verifier');
        
        const data = await fetchGetUserToken(code,redirectUri,clientId,codeVerifier)        

        const access_token = localStorage.getItem('access_token');
        if(data){
            localStorage.setItem('access_token', data);
            setLogged(true)
        }
    }
    
    const getUserId = ()=>{
        const accessToken = localStorage.getItem('access_token');

        // Verifica si el token de acceso existe
        if (accessToken) {
            fetchIdUser(accessToken)
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data))
                setUser(data)
                setLogged(true)
            })
            .catch(error => {
                console.error('Error al obtener información del usuario:', error)
                setLogged(false)
            })
        } else {
          console.error('No se encontró un token de acceso en el localStorage.');
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

    return{
        user,
        isLogged,
        getAccessToken,
        getUserId,
        login,
        logout
    }


}