
const BASE_URL = 'https://api.spotify.com/v1'


// Obtener las playlists
export const fetchFeaturedPlaylists = async(token)=>{
    try{
        const response = await fetch(`${BASE_URL}/browse/featured-playlists`,{
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

// Obtener los detalles de una playlist
export const fetchDetailsPlaylist = async(token, id)=>{
    try{
        const response = await fetch(`${BASE_URL}/playlists/${id}`,{
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

// Crear playlist
export const fetchNewPlaylist = async(token, user_id) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${user_id}/playlists`, {
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
    }
}

// Editar datos de una playlist
export const fetchUpdatePlaylist = async (token, playlist_id, dataForm) => {
    try {
        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: dataForm,
        })

        if(!response.ok) throw new Error('Error al actualizar la playlist')

        const updatedPlaylistData = await response.json()
        return updatedPlaylistData
    } catch(error) {
        console.error("Error en fetchUpdatePlaylist: ", error)
    }
}