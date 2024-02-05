import { Box, Image } from "@chakra-ui/react";


export default function SearchTrack({tracks}){
    return(
        <Box>
            <div>
                <h1>Resultado principal</h1>
                <Box>
                    <Image src={tracks[0].images[1].url}/>
                    <h1>{tracks[0].name}</h1>
                    
                </Box>
            </div>
            <div>
                <h1>Canciones</h1>

            </div>
        </Box>
    )
}