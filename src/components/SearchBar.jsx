import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { Input,InputGroup,InputLeftAddon,InputRightAddon } from '@chakra-ui/react'

export default function SearchBar({setSearch, token}){

    const [key,setKey] = useState('')

    const handleChange = (e)=>{
        setKey(e.target.value)
    }

    return(
        <>
            <InputGroup size='sm'>
                <InputLeftAddon>
                    <IoSearch />
                </InputLeftAddon>
                <Input placeholder='¿Qué te apetece escuchar?' value={key} onChange={(e)=>{handleChange(e)}}/>
                <InputRightAddon>
                    .com
                </InputRightAddon>
            </InputGroup>
        </>
    )
}