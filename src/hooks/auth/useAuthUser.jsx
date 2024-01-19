import { useState } from "react";
import { fetchIdUser, fetchGetUserToken } from "@spotify/authService.js"
import { getCodeVerifier } from "@spotify/codeVerifier";
import { clientId, redirectUri } from "../../variiables";

export const useAuthUser= ()=>{
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
    const [isLogged, setLogged] = useState(Boolean(localStorage.getItem("user")))

    const login = ()=>{
        const result = getCodeVerifier().then((data)=>{
            const {codeVerifier, codeChallenge} = data
            alert(codeVerifier, codeChallenge)
            window.localStorage.setItem('code_verifier', codeVerifier);

            
            const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
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

    const getAccessToken = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        


        let codeVerifier = localStorage.getItem('code_verifier');

        fetchGetUserToken(code,redirectUri,clientId,codeVerifier)
        .then(data =>{
            console.log(data)
            let access_token = localStorage.getItem('access_token');
            if(!access_token){
                localStorage.setItem('access_token', data);
            }
         
        })
    }
    const getUserId = ()=>{
        const accessToken = localStorage.getItem('access_token');
        alert(accessToken)
        // Verifica si el token de acceso existe
        if (accessToken) {
            setLogged(false)
            fetchIdUser(accessToken)
            .then(data => {
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data))
                setUser(data)
            })
            .catch(error => console.error('Error al obtener información del usuario:', error))
            .finally(
                setLogged(true)
            )
        } else {
          console.error('No se encontró un token de acceso en el localStorage.');
        }
    }
    const logout = ()=>{
        localStorage.removeItem('user')
        setUser(null)
        setLogged(false)
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