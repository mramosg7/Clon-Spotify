import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const FormPlaylistDetails = () => {

  const { handleUpdatePlaylist } = usePlaylist()
  const { id } = useParams()
  const [initialData, setInitialData] = useState({
    id,
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
       <FormControl onSubmit={onSubmit}>
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
    </>
  )
}

