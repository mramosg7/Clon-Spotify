import { clientId } from "../../variiables";


export const fetchIdUser = async(accessToken)=>{
    try{
        const response = await fetch('https://api.spotify.com/v1/me', {
                                method: 'GET',
                                headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                },
                            })
        if (!response.ok) {
            // Intenta obtener más detalles del cuerpo de la respuesta
            const errorData = await response.json();
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}. Detalles: ${JSON.stringify(errorData)}`);
            }
    
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }
    
}



export const fetchGetUserToken = async(code, redirectUri, clientId, codeVerifier)=> {
    const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code:  code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier,
        }),
      }
    
      const response = await fetch("https://accounts.spotify.com/api/token", payload);
      const data =await response.json();
      return data;
}

export const getApiToken = async(clientId, clientSecret)=>{
    const requestOptions = {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        };
    const response = await fetch("https://accounts.spotify.com/api/token", requestOptions)
    const data = await response.json()
    return data 
}

export const fetchRefresh = async(token, clientId)=>{
    try{
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
            }),
        }
        const response = await fetch(url, payload);
        if(!response) throw new Error("Error al refrescar el token")
        const data= await body.json();

        return data
    }catch(e){
        console.error(e)
    }
}