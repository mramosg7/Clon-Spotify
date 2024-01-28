import { useState } from "react"
import { fetchNewPlaylist } from "@spotify/playlistsService.js"
import { fetchUpdatePlaylist, fetchUpdateImage } from "../../services/spotify/playlistsService"

export const usePlaylist = () => {

  // Token de acceso del usuario
  const access_token = localStorage.getItem("access_token")
  // Estados de carga
  const [isCreating, setCreating] = useState(false)
  const [isUpdating, setUpdating] = useState(false)
  // Estado para las playlists del ususario
  const [userPlaylists, setUserPlaylists] = useState(JSON.parse(localStorage.getItem('userPlaylists')) || [])


  // Crear playlist y almacenarla en el localstorage
  const handleCreatePlaylist = async () => {
    try {
      setCreating(true) 
      // Obtener el ID del usuario del localstorage
      const userString = localStorage.getItem('user')
      const user = JSON.parse(userString)
      const userId = user.id

      // Fetch
      const newPlaylistData = await fetchNewPlaylist(access_token, userId)
      setUserPlaylists(prevUserPlaylists => [...prevUserPlaylists, newPlaylistData])
      localStorage.setItem('userPlaylists', JSON.stringify([...userPlaylists, newPlaylistData]))
    } catch (error) {
      console.error("Error al crear la playlist:", error)
    } finally {
      setCreating(false)
    }
  }

  // Actualizar la lista
  const handleUpdatePlaylist = async (playlistId, formData) => {
    try {
      setUpdating(true)
      const name = formData.get('name')
      const description = formData.get('description')
      const image = formData.get('image')

      await fetchUpdatePlaylist(access_token, playlistId, name, description)
      if(image) {
        await fetchUpdateImage(access_token, playlistId, image)
      }
    } catch(error) {
      console.error("Error al intentar actualizar la playlist (handleUpdatePlaylist): ", error)
    } finally {
      setUpdating(false)
    }
  }


  return {
    isCreating,
    isUpdating,
    handleCreatePlaylist,
    userPlaylists,
    handleUpdatePlaylist
  }
}
