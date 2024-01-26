import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { Input,InputGroup,InputLeftAddon,InputRightAddon } from '@chakra-ui/react'

export default function SearchBar({search}){

    const [q,setQ] = useState('')

    const handleChange = (e)=>{
        setQ(e.target.value)
    }

    return(
        <>
            <InputGroup size='sm'>
                <InputLeftAddon>
                    <IoSearch />
                </InputLeftAddon>
                <Input placeholder='¿Qué te apetece escuchar?' value={q} onChange={(e)=>{handleChange(e)}}/>
                <InputRightAddon>
                    .com
                </InputRightAddon>
            </InputGroup>
        </>
    )
}