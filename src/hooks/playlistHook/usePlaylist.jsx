import { useState } from "react"
import { fetchNewPlaylist } from "@spotify/playlistsService.js"
import { fetchUpdatePlaylist, fetchUpdateImage, fetchGetUserPlaylist } from "../../services/spotify/playlistsService"

export const usePlaylist = () => {

  // Token de acceso del usuario
  const access_token = localStorage.getItem("access_token")
  // Estados de carga
  const [isCreating, setCreating] = useState(false)
  const [isUpdated, setUpdated] = useState(false)
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
      const newPlaylist = await fetchNewPlaylist(access_token, userId)
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

      const playlists = await fetchGetUserPlaylist(access_token, userId)
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

      const respuestaActualizacion = await fetchUpdatePlaylist(access_token, playlistId, name, description)
      let respuestaActualizacionImg
      if(image) {
        respuestaActualizacionImg = await fetchUpdateImage(access_token, playlistId, image)
      }

      console.log('Actualizacion: ', respuestaActualizacion)
      console.log('Actualizacion Img: ', respuestaActualizacionImg)

      if(respuestaActualizacion || respuestaActualizacionImg) setUpdated(true)

    } catch(error) {
      console.error("Error al intentar actualizar la playlist (handleUpdatePlaylist): ", error)
    } 
  }


  return {
    isCreating,
    userPlaylists,
    isUpdated,
    handleCreatePlaylist,
    handleGetUserPlaylists,
    handleUpdatePlaylist
  }
}
