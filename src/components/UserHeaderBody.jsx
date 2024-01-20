import { Button, 
        Stack,
        Menu,
        MenuButton,
        MenuList,
        MenuItem,
        MenuItemOption,
        MenuGroup,
        MenuOptionGroup,
        MenuDivider,
        Image    
    } from '@chakra-ui/react'
import { TfiDownload } from "react-icons/tfi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxExternalLink } from "react-icons/rx";

export default function UserHeaderBody({user, logout}){

    return (
        <Stack direction='row' spacing={4} align='center'>
            <Button
                bg="white"
                _hover={{
                    transform: "scale(1.02)"
                }}
            >Descubrir Premium</Button>
            <Button
                bg="black"
                color="white"
                _hover={{
                    transform: "scale(1.02)"
                }}
            ><TfiDownload />Instalar app</Button>
            <Button
               bg="black" 
               color="white"
               fontSize='22px'
               size= "md"
               padding="10px"
               borderRadius="100%"
               _hover={{
                transform: "scale(1.02)"
                }}
            > <IoIosNotificationsOutline /></Button>
            <Menu>
                <MenuButton as={Button} 
                    border="5px solid black"
                    padding="0"
                    width="20px"
                    overflow="hidden"
                    borderRadius="100%"
                >
                    <Image
                        boxSize='30px'
                        objectFit='cover'
                        src={user.images[0].url}
                        alt="Imagen de usuario"
                    />  
                </MenuButton>
                <MenuList bg="#292928" color="white" border="none" padding="4px">
                    <MenuItem bg="none" command={<RxExternalLink />} borderRadius="2px"
                        _hover={{
                            bg: "#3e3f3f"
                        }}
                    >Cuenta</MenuItem>
                    <MenuItem bg="none" borderRadius="2px"
                        _hover={{
                            bg: "#3e3f3f"
                        }}
                    >Perfil</MenuItem>
                    <MenuItem bg="none" command={<RxExternalLink />} borderRadius="2px"
                        _hover={{
                            bg: "#3e3f3f"
                        }}
                    >Sube a Premium</MenuItem>
                    <MenuItem bg="none" borderRadius="2px"
                        _hover={{
                            bg: "#3e3f3f"
                        }}
                    >Configuración</MenuItem>
                    <MenuDivider />
                    <MenuItem bg="none" borderRadius="2px"
                        _hover={{
                            bg: "#3e3f3f"
                        }}
                        onClick={()=>logout()}
                    >Cerrar sesión</MenuItem>
                </MenuList>
            </Menu>
        </Stack>
    )
}