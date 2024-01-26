import { Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import DefaultImage from "../assets/PlaylistDefault.png"
import React from "react"

export const PlaylistGrid = ({ userPlaylists }) => {

  const navigate = useNavigate()

  const editar = (id) => {
    navigate(`/playlist/editar/${id}`)
  }

  return (
    <>
      <Grid gap={2} templateColumns="repeat(3, 1fr)">
          {userPlaylists.map((playlist) => (
            <React.Fragment key={playlist.id}>
              <GridItem
                w="100%"
                bg="#111111"
                color="#fff"
                p="14px 15px"
                borderRadius="8px"
                marginTop="14px"
                cursor="pointer"
                position="relative"
                _hover={{
                  bg: "#1B1B1B",
                }}
              >
                <Link to={`/playlist/${playlist.id}`} >
                <img
                  style={{
                    borderRadius: "7px",
                    width: "150px",
                    marginBottom: "10px",
                  }}
                  src={DefaultImage}
                ></img>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {playlist.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "#919191" }}>
                    Lista • {playlist.owner.display_name}
                  </p>
                </div>
                </Link>
                <Button onClick={() => editar(playlist.id)}>Editar</Button>
                </GridItem>
            </React.Fragment>
          ))}
        </Grid>
    </>
  )
}

