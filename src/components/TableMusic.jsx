import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { MdOutlineAccessTime } from "react-icons/md";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Link } from "react-router-dom";
import { usePlaylist } from "../hooks/playlistHook/usePlaylist";

export default function TableMusic({ tracks }) {

  const { handleAddTrack } = usePlaylist()

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const fechaFormateada = format(date, "dd MMM yyyy", { locale: esLocale });
    return fechaFormateada;
  };

  function convertirAMinutosYSegundos(tiempoTotal) {
    const tiempoTotalEnSegundos = tiempoTotal / 1000;

    const minutos = Math.floor(tiempoTotalEnSegundos / 60);
    const segundos = Math.floor(tiempoTotalEnSegundos % 60);

    // Formatea los minutos y segundos

    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

    return `${minutos}:${segundosFormateados}`;
  }

  return (
    <>
      <TableContainer>
        <Table size="sm" variant="none">
          <Thead>
            <Tr>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                #
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Título
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Álbum
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
              >
                Fecha en la que se añadió
              </Th>
              <Th
                borderBottom="1px"
                borderBottomColor="#434343"
                color="#A9A9A9"
                fontSize="20px"
              >
                <MdOutlineAccessTime />
              </Th>
              <Th>
                Acciones
              </Th>
            </Tr>
          </Thead>

          <Tbody color="#A9A9A9">
            {tracks.map((track, index) => (
              <Tr
                key={track.track.id}
                height="10px"
                _hover={{
                  bg: "rgb(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                <Td borderTopLeftRadius="md" borderBottomLeftRadius="md">
                  {index + 1}
                </Td>
                <Td color="white" display="flex" gap="10px" alignItems="center">
                  <Image
                    src={track.track.album.images[2].url}
                    borderRadius="5px"
                    w="50px"
                  />
                  <div>
                    <h4>{track.track.name}</h4>
                    <Box display="flex">
                      {track.track.artists.map((a, index) => (
                        <Link to={`/artist/${a.id}`} key={a.id}>
                          <Text
                            color="#A9A9A9"
                            _hover={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                          >
                            {index != 0 ? ", " : ""}
                            {a.name}
                          </Text>
                        </Link>
                      ))}
                    </Box>
                  </div>
                </Td>
                <Td> {track.track.album.name}</Td>
                <Td>{formatearFecha(track.added_at)}</Td>
                <Td borderTopRightRadius="md" borderBottomRightRadius="md">
                  {convertirAMinutosYSegundos(track.track.duration_ms)}
                </Td>
                <Td cursor='pointer' onClick={() => handleAddTrack("1qvNUEiJfZtwEpwC5CBaFA", track.track.uri)}>
                  +
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
