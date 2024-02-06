import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { Box, Input,InputGroup,InputLeftAddon,InputRightAddon } from '@chakra-ui/react'

export default function SearchBar({search, token}){

    const [key,setKey] = useState('')

    const handleChange = (e)=>{
        setKey(e.target.value)
        search(e.target.value)
    }

    return(
        <>
                <InputGroup size='sm' width="50%">
                    <InputLeftAddon>
                        <IoSearch />
                    </InputLeftAddon>
                    <Input placeholder='¿Qué te apetece escuchar?' value={key} onChange={(e)=>{handleChange(e)}}/>
                </InputGroup>
        </>
    )
}