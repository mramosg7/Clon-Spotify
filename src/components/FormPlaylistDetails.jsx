import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import { usePlaylist } from "../hooks/playlistHook/usePlaylist"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import DefaultImage from "../assets/PlaylistDefault.png";


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
    if (e.target.files && e.target.files[0]) {
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
        <ModalContent
          bg="#292829"
          maxWidth="550px"
          w="1500px"
          marginTop="10%"
        >
          <ModalHeader display="flex" alignItems="center" justifyContent="space-between" color="white" fontWeight="bold">
            Editar información
            <Button bg="transparent" _hover={{ bg: "transparent", border: "none" }} onClick={onClose}>
              <IoClose style={{
                color: "white"
              }} />
            </Button>
          </ModalHeader>
          <ModalBody>
            <form
              style={{
                display: "flex",
                gap: "10px"
              }}
              onSubmit={onSubmit}
            >
              <Box position="relative">
                <Input
                  type="file"
                  name="image"
                  border="none"
                  id="image"
                  onChange={onImageChange}
                  bg="#3e3e3e"
                  h="8.8em"
                  style={{ 
                    zIndex: 1 
                  }}
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ zIndex: 0 }}
                >
                  <img
                    id="preview-image"
                    src={DefaultImage}
                    alt="imagen"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  />
                </Box>
              </Box>
              <FormControl>
                <Input
                  type="text"
                  name="name"
                  marginBottom="10px"
                  value={initialData.name}
                  placeholder="Nombre"
                  onChange={onChange}
                  required
                  border="none"
                  borderRadius="5px"
                  color="white"
                  bg="#3e3e3e"
                  _placeholder={{
                    color: "white"
                  }}
                  w="300px"
                />
                <Textarea
                  name="description"
                  value={initialData.description}
                  placeholder="Descripción"
                  onChange={onChange}
                  required
                  border="none"
                  color="white"
                  bg="#3e3e3e"
                  _placeholder={{
                    color: "white"
                  }}
                />
                <ModalFooter paddingRight={0}>
                  <Button w="50%" paddingY="25px" borderRadius="50px" color="#000000" type="submit">Guardar</Button>
                </ModalFooter>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

