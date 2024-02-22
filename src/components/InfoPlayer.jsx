import { Box, Image,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function InfoPlayer({info}){

    return(
        <Box 
            display="flex"
            alignItems="center"
            gap={4}
            
        >
            <Image
                borderRadius="5px"
                src={info.album.images[2].url}
               
            />
            <div>
                <h4>{info.name}</h4>
                <Box
                    display="flex"
                >{info.artists.map((artist, index)=>(
                
                   <Text
                        key={artist.id}
                        color='#A9A9A9'
                        _hover={{
                            color:'white',
                            textDecoration:'underline'
                        }}
                    > {index!=0 ? ", " : ""} <Link to={`/artist/${artist.id}`}>{artist.name}</Link></Text>
                
                ))}</Box>
            </div>
            {/* Icono */}
        </Box>
    )
}