import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { Box, Input,InputGroup,InputLeftAddon,InputRightAddon } from '@chakra-ui/react'

export default function SearchBar({search}){

    const [key,setKey] = useState('')

    const handleChange = (e)=>{
        setKey(e.target.value)
        search(e.target.value)
    }

    return(
        <>
                <InputGroup 
                 size='sm' 
                 width="30%"
                 bg='#242424'
                 display='flex'
                 alignItems='center'
                 overflow='hidden'
                 borderRadius='100px'
                >
                    <InputLeftAddon border='none' bg='transparent' paddingLeft='20px' paddingRight={0} color='#757574'>
                        <IoSearch/>
                    </InputLeftAddon>
                    <Input color='white' _focus={{outline: 'none'}} border='none' _placeholder={{color: '#757574'}} placeholder='¿Qué te apetece escuchar?' value={key} onChange={(e)=>{handleChange(e)}}/>
                </InputGroup>
        </>
    )
}