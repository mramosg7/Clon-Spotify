import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const FormPlaylistDetails = () => {

  const { handleUpdatePlaylist } = usePlaylist()
  const { id } = useParams()
  const isOpen = !!id // El modal esta abierto si hay un ID
  const [initialData, setInitialData] = useState({
    playlistId: id,
    name: '',
    description: ''
  })
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const onClose = () => {
    navigate(-1) // Vuelve a la pagina anterior
  }

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInitialData({
      ...initialData,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', initialData.name)
    formData.append('description', initialData.description)
    if (image) {
        formData.append('image', image)
    }
    handleUpdatePlaylist(initialData.playlistId, formData)
    onClose()
  }

  return (
    <>
    <Modal isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader>Editar Información</ModalHeader>
    <ModalBody>
    <form onSubmit={onSubmit}>
       <Input 
        type="file"
        name="image"
        onChange={onImageChange}
       />
       <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          name="name"
          value={initialData.name}
          placeholder="Nombre"
          onChange={onChange}
          required
        />
        <FormLabel>Descripción</FormLabel>
        <Textarea
          name="description"
          value={initialData.description}
          placeholder="Descripcion"
          onChange={onChange}
          required
        />
        <ModalFooter>
              <Button type="submit">Actualizar Playlist</Button>
              <Button mr={3} onClick={onClose}>
                    Cancelar
              </Button>
        </ModalFooter>
      </FormControl>
      </form>
      </ModalBody>
      </ModalContent>
      </Modal>
    </>
  )
}

