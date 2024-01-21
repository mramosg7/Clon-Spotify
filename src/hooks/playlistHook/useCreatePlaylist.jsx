import { useEffect, useState } from "react"
import { fetchNewPlaylist } from "@spotify/playlistsService.js"

export const useCreatePlaylist = () => {
  const [isCreating, setCreating] = useState(false)
  const [userPlaylists, setUserPlaylists] = useState(JSON.parse(localStorage.getItem('userPlaylists')) || [])

  const access_token = localStorage.getItem("access_token")

  const handleCreatePlaylist = async () => {
    try {
      setCreating(true) 
      const userString = localStorage.getItem('user')
      const user = JSON.parse(userString)
      const userId = user.id

      const newPlaylistData = await fetchNewPlaylist(access_token, userId)
      setUserPlaylists([...userPlaylists, newPlaylistData])
      localStorage.setItem('userPlaylists', JSON.stringify([...userPlaylists, newPlaylistData]))
    } catch (error) {
      console.error("Error al crear la playlist:", error)
    } finally {
      setCreating(false)
    }
  }
  return {
    isCreating,
    handleCreatePlaylist,
    userPlaylists
  }
}
