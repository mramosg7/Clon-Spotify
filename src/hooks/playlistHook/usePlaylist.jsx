import { useState } from "react"
import { fetchNewPlaylist } from "@spotify/playlistsService.js"
import { fetchUpdatePlaylist } from "../../services/spotify/playlistsService"

export const usePlaylist = () => {

  // Token de acceso del usuario
  const access_token = localStorage.getItem("access_token")
  // Estados de carga
  const [isCreating, setCreating] = useState(false)
  const [isUpdating, setUpdating] = useState(false)
  const [updatingPlaylist, setUpdatingPlaylist] = useState(null)
  // Estado para las playlists del ususario
  const [userPlaylists, setUserPlaylists] = useState(JSON.parse(localStorage.getItem('userPlaylists')) || [])
  // Datos del formulario para actualizar los datos de la playlist
  const [updatedFormData, setUpdatedFormData] = useState({
    name: '',
    description: '',
    image: null
  })

  // Estado para cuando se comience a editar una PL
  const startEditing = (playlist) => {
    setUpdatingPlaylist(playlist)
    setUpdating(true)
  }

  // Estado para cuando finalice la edicion
  const finishEdit = () => {
    setUpdatingPlaylist(null)
    setUpdating(false)
  }

  // Manejar cuando el input cambie (cuando se escriba)
  const handleInputChange = (e) => {
    // Desestructuramos los campos 'name' y 'value' de los inputs
    const { name, value } = e.target
    // Setear los datos del formulario
    setUpdatedFormData({
      ...updatedFormData,
      // Nombre del campo: valor
      [name]: value
    })
  }
  
  // Manejar cuando la imagen se cambie
  const handleImageChange = (e) => {
    // Obtiene el primer elemento subido al input de tipo 'file'
    const imageFile = e.target.files[0]
    setUpdatedFormData({
      ...updatedFormData,
      // Atribuir la imagen al campo image
      image: imageFile
    })
  }

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
  const handleUpdatePlaylist = async (playlistId) => {
    try {
      const formData = new FormData()
      formData.append('name', updatedFormData.name)
      formData.append('description', updatedFormData.description)
      if(updatedFormData.image) {
        formData.append('image', updatedFormData.image)
      }

      const updatedPlaylists = fetchUpdatePlaylist(access_token, playlistId, formData)
      setUserPlaylists(updatedPlaylists)
    } catch(error) {
      console.error("Error al actualizar la playlist: ", error)
    } 
  }

  return {
    isCreating,
    handleCreatePlaylist,
    userPlaylists,
    startEditing,
    finishEdit,
    handleInputChange,
    handleImageChange,
    handleUpdatePlaylist,
    updatedFormData
  }
}
