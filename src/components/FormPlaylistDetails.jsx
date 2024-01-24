import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"


export const FormPlaylistDetails = ({
  updatedFormData, 
  handleInputChange, 
  handleImageChange, 
  handleUpdatePlaylist,  

  playlistId}) => {


  return (
    <>
      <FormControl>
        <FormLabel>Imagen</FormLabel>
        <Input 
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <FormLabel>Nombre</FormLabel>
        <Input 
          type="text" 
          name="name" 
          value={updatedFormData.name}
          onChange={handleInputChange}
        />
        <FormLabel>Descripción</FormLabel>
        <Textarea
          name="description" 
          value={updatedFormData.description}
          onChange={handleInputChange}
        />
        <Button
          type="button"
          onClick={() => handleUpdatePlaylist(playlistId)}
        >
          Actualizar
        </Button>
      </FormControl>
    </>
  )
}

