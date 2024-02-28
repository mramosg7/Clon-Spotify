import { useState } from "react"
import { fetchNewPlaylist } from "@spotify/playlistsService.js"
import { fetchUpdatePlaylist, fetchUpdateImage, fetchGetUserPlaylist, fetchAddTrackToPlaylist, fetchRemoveTrackToPlaylist } from "../../services/spotify/playlistsService"
import { useAuthUser } from "../auth/useAuthUser"
export const usePlaylist = () => {
  const {getAccessToken} = useAuthUser()

  // Estados de carga
  const [isCreating, setCreating] = useState(false)
  // Estado para las playlists del ususario
  const [userPlaylists, setUserPlaylists] = useState([])

  // Crear playlist y obtener todas las del usuario
  const handleCreatePlaylist = async () => {
    try {
      setCreating(true) 
      // Obtener el ID del usuario del localstorage
      const userString = localStorage.getItem('user')
      const user = JSON.parse(userString)
      const userId = user.id

      // Fetch
      //Obtener el access token
      const accessToken = await getAccessToken()
      const newPlaylist = await fetchNewPlaylist(accessToken, userId)
      if(newPlaylist) {
        handleGetUserPlaylists()
      }
    } catch (error) {
      console.error("Error al crear la playlist:", error)
    } finally {
      setCreating(false)
    }
  }

  const handleGetUserPlaylists = async () => {
    try {
      const userString = localStorage.getItem('user')
      const user = JSON.parse(userString)
      let userId = null
      if(user) userId = user.id

      const accessToken = await getAccessToken()
      const playlists = await fetchGetUserPlaylist(accessToken, userId)
      if(playlists && playlists.items) {
        setUserPlaylists(playlists.items)
      }

    } catch(error) {
      console.error("Error al obtener las playlists: ", error)
    }
  }

  // Actualizar playlists
  const handleUpdatePlaylist = async (playlistId, formData) => {
    try {
      const name = formData.get('name')
      const description = formData.get('description')
      const image = formData.get('image')
      const accessToken = await getAccessToken()
      await fetchUpdatePlaylist(accessToken, playlistId, name, description)
      if(image) {
        await fetchUpdateImage(accessToken, playlistId, image)
      }

      window.location.reload()
      
    } catch(error) {
      console.error("Error al intentar actualizar la playlist (handleUpdatePlaylist): ", error)
    } 
  }

  // Añadir cancion
  const handleAddTrack = async (playlistId, trackUri) => {
    try {
      const accessToken = await getAccessToken()
      await fetchAddTrackToPlaylist(accessToken, playlistId, trackUri)
      
      window.location.reload()

    } catch(error) {
      console.error("Error al añadir la cancion a la playlist")
    } 
  }

  // Eliminar cancion
  const handleRemoveTrack = async (playlistId, trackUri) => {
    try {

      const accessToken = await getAccessToken()
      await fetchRemoveTrackToPlaylist(accessToken, playlistId, trackUri)

      window.location.reload()

    } catch(error) {
      console.error("Error al eliminar cancion a la playlist")
    }
  }


  return {
    isCreating,
    userPlaylists,
    handleAddTrack,
    handleCreatePlaylist,
    handleGetUserPlaylists,
    handleUpdatePlaylist,
    handleRemoveTrack
  }
}
