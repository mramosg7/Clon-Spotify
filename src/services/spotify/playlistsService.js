
const BASE_URL = 'https://api.spotify.com/v1'


// Obtener las playlists
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

        if (!response.ok) throw new Error('Error al actualizar la playlist')

    } catch (error) {
        console.error("Error en fetchUpdatePlaylist: ", error)
    }
}

// Editar imagen de una playlist
export const fetchUpdateImage = async (token, playlist_id, image) => {
    try {
        const response = await fetch(`${BASE_URL}/playlists/${playlist_id}/images`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'image/jpeg'
            },
            body: JSON.stringify({
                image
            })
        })

        if (!response.ok) throw new Error('Error al actualizar la imagen')

        const updateImage = await response.json()
        return updateImage
    } catch (error) {
        console.error("Error en fetchUpdateImage: ", error)
    }
}