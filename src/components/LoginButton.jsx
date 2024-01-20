import { Button} from '@chakra-ui/react'
import { useAuthUser } from '../hooks/auth/useAuthUser'

export default function LoginButton(){
    const {login} = useAuthUser()
    return (
        <div>
            <Button 
                borderRadius="20px"
                bg="none"
                color="#949594"
                size='lg'
                fontSize='15px'
                fontWeight='bold'
                letterSpacing='0.3px'
                _hover={{
                    color:"white",
                    transform: "scale(1.1)"
                }}>
                
            Registrarse</Button>
            <Button 
                borderRadius="20px"
                bg="white"
                size='lg'
                fontSize='15px'
                fontWeight='bold'
                letterSpacing='0.3px'
                _hover={{
                    bg: "#eeeeee",
                    transform: "scale(1.1)"
                }}
                onClick={()=>login()}
                >
            Iniciar sesion</Button>
        </div>
    )
}