

export const fetchFeaturedPlaylists = async(token)=>{
    try{
        const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists",{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error('Error al recibir la playlist')
        }
        const data = await response.json()
        return data; 

    }catch(error){
        console.error(error)
    }
}

export const fetchDetailsPlaylist = async(token, id)=>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })   
        if(!response.ok) throw new Error('Error al acceder a la playlist')
        const data = await response.json()
        return data     
    }catch(error){
        console.error(error)
    }
}

export const fetchNewPlaylist = async(token, user_id) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: "Nueva Playlist",
                description: "Descripción de la nueva playlist",
                public: true,
            })
        })
    
        const data = await response.json()

        if(!response.ok) throw new Error('Error al crear la playlist')

        return data
    } catch(error) {
        console.error("Error en fetchNewPlaylist:", error);
        console.error(error)
    }
}