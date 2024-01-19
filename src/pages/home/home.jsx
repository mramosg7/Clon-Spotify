import { useAuthUser } from '@/hooks/auth/useAuthUser.jsx'
import { useEffect } from 'react'


export default function Home (){

    const {user, isLogged, getAccessToken, getUserId, login, logout} = useAuthUser()

    useEffect(()=>{
        if (!user){
            let codeVerifier = localStorage.getItem('code_verifier');
        let accessToken = localStorage.getItem('access_token');
        if (codeVerifier && !accessToken){
            getAccessToken()
        }
        if(accessToken){
            getUserId()
            console.log(user)
        }
        }
        
    },[])


    return(
        <>
            {!isLogged && <button onClick={login}>Logearte</button>}
            {isLogged && <img src={user.images[0]['url']}/>}
            
        </>
    )
}