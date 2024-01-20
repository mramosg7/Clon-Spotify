import { Box } from "@chakra-ui/react"
import { HeaderBody } from "./HeaderBody"

export const Body = ({isLogged, user, logout}) => {
  return (
    <Box
      display='flex'
      h='97vh'
      w='100%'
      p='0px 0px'
      overflow='hidden'
      bg='#1E1E1E'
      bgGradient='linear(to-b, #1E1E1E, #0B0B0B)'
      borderRadius='10px'
      marginLeft={2}
    >
      <HeaderBody isLogged={isLogged} user={user} logout={logout}/>
    </Box>
  )
}
