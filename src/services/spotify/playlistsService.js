
const BASE_URL = 'https://api.spotify.com/v1'


// Obtener las playlists de spotify
export const fetchFeaturedPlaylists = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/browse/featured-playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error('Error al recibir la playlist')
        }
        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error)
    }
}

// Obtener las playlists de un usuario
export const fetchGetUserPlaylist = async (token, userId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) throw new Error('Error al obtener las playlists del usuario')
        const data = await response.json()
        return data 
    } catch(error) {
        console.error(error)
    }
}

// Obtener los detalles de una playlist
export const fetchDetailsPlaylist = async (token, id) => {
    try {
        const response = await fetch(`${BASE_URL}/playlists/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) throw new Error('Error al acceder a la playlist')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Crear playlist
export const fetchNewPlaylist = async (token, user_id) => {
    try {
        console.log(token)
        const response = await fetch(`${BASE_URL}/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: "Mi Lista",
                description: "",
                public: true,
            })
        })

        const data = await response.json()

        if (!response.ok) throw new Error('Error al crear la playlist')

        return data
    } catch (error) {
        console.error("Error en fetchNewPlaylist:", error);
    }
}

// Editar datos de una playlist
export const fetchUpdatePlaylist = async (token, playlist_id, name, description) => {
    try {
        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                public: true
            })
        })

        if (!response.ok) throw new Error(`Error al actualizar la playlist ${playlist_id}`)

        if(response.ok) return response.ok

    } catch (error) {
        console.error("Error en fetchUpdatePlaylist: ", error)
    }
}

// Convertir a base64 una imagen

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

// Editar imagen de una playlist
export const fetchUpdateImage = async (token, playlist_id, image) => {
    try {
        let imagen64 = await convertToBase64(image)

        const base64Data = imagen64.split(',')[1]

        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}/images`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'image/jpeg'
            },
            body: base64Data
        })

        if (!response.ok) {
            throw new Error('Error al actualizar la imagen')
        } 

        if(response.ok) return response.ok

    } catch (error) {
        console.error("Error en fetchUpdateImage: ", error)
    }
}

// Añádir imagen a playlist
export const fetchAddTrackToPlaylist = async (token, playlist_id, trackUri) => {
    try {

        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'uris': [
                    trackUri
                ],
                'position': 0
            })
        })

        if(!response.ok) throw new Error('Error al añadir la cancion')
    } catch(error) {
        console.error('Error en fetchAddTrackToPlaylist: ', error)
    }
}

// Eliminar cancion de playlist
export const fetchRemoveTrackToPlaylist = async (token, playlist_id, trackUri) => {
    try {
        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}/tracks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "tracks":[
                    {
                        "uri": trackUri
                    }
                ]
            })
        })

        if(!response.ok) {
            throw new Error('Error al eliminar la cancion')
        }


    } catch(error) {
        console.error('Error en fetchRemoveTrackToPlaylist: ', error)
    }
}