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
  const navigate = useNavigate()

  const onClose = () => {
    navigate(-1) // Vuelve a la pagina anterior
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
    handleUpdatePlaylist(initialData)
  }

  return (
    <>
    <Modal isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader>Editar Información</ModalHeader>
    <ModalBody>
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

