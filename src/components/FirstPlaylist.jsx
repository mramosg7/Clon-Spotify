import { Box, Button } from "@chakra-ui/react"

export const FirstPlaylist = ({ handleCreatePlaylist, isCreating, userPlaylists }) => {


  return (
    <>
       {userPlaylists.length === 0 && (
          <Box
            width="100%"
            p="15px 18px"
            bg="#242424"
            marginTop="14px"
            color="#fff"
            borderRadius="8px"
            textAlign="left"
            fontWeight="bold"
            onClick={handleCreatePlaylist}
            disabled={isCreating}
          >
            <h2>Crea tu primera lista</h2>
            <p
              style={{ fontWeight: "400", marginTop: "5px", fontSize: "14px" }}
            >
              Es muy fácil, y te echaremos una mano
            </p>
            <Button
              bg="#fff"
              marginTop="20px"
              height="2em"
              borderRadius="20px"
              fontWeight="600"
            >
              {isCreating ? "Creando..." : "Crear lista"}
            </Button>
          </Box>
        )}
    </>
  )
}


