import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { useState } from "react"
import { useParams } from "react-router-dom"



export const FormPlaylistDetails = () => {

  const { handleUpdatePlaylist } = usePlaylist()
  const { id } = useParams()
  const [initialData, setInitialData] = useState({
    playlistId: id,
    name: '',
    description: ''
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setInitialData({
      ...initialData,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleUpdatePlaylist(initialData)
  }

  return (
    <>
    <form onSubmit={onSubmit}>
       <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          name="name"
          value={initialData.name}
          placeholder="Nombre"
          onChange={onChange}
        />
        <FormLabel>Descripción</FormLabel>
        <Textarea
          name="description"
          value={initialData.description}
          placeholder="Descripcion"
          onChange={onChange}
        />
        <Button type="submit">Actualizar Playlist</Button>
      </FormControl>
      </form>
    </>
  )
}

