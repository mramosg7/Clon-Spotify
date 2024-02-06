import { Heading, Box, Image, Card, CardBody, CardHeader, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ArtistasSearch({artistas}){

    return(
        <Box
                display='flex'
                flexDirection='row'
                gap='10px'
                flexWrap='wrap'
            >
            {artistas.map(artista=>(
                <Card 
                width='200px' 
                key={artista.id}
                bg='#181919'
                color='#9a9a9a'
                cursor='pointer'
                _hover={{
                    bg:'#292928'
                }}
            >
                <Link to={`/artist/${artista.id}`}>
                    <CardBody>
                        <Image
                            borderRadius='full'
                            src={artista.images[0].url}  
                            
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color='white' size='sd'>{artista.name}</Heading>
                            <Text>Artista</Text>
                        </Stack>
                    </CardBody>
                </Link>
            </Card>
            ))}
        </Box>
    );
}