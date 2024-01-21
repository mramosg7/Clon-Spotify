
export const fetchGetArtist = async(id,token) =>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}`,{
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if (!response.ok) throw Error("No se ha podido acceder a la información del artista.")
        
        const data = await response.json()
        console.log(data)
        return data
    }catch(error){
        console.error(error)
    }
}

export const fetchGetTopTracks = async(id,token) =>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`,{
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if (!response.ok){
            
            throw Error("No se ha podido recopilar los mejores temas del artista.")
        }
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }
}


export const fetchGetArtistAlbums = async(id,token) =>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`,{
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        if (!response.ok) throw Error("No se ha podido obtener los albumnes del artista.")
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }
}

