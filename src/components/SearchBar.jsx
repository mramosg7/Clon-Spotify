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
                 width="60%"
                 h='75%'
                 bg='#242424'
                 display='flex'
                 alignItems='center'
                 overflow='hidden'
                 borderRadius='full'
                 marginLeft='10px'
                >
                    <InputLeftAddon border='none' bg='transparent' paddingLeft='10px' paddingRight={0} color='#757574'>
                        <IoSearch style={{
                            width: '25px',
                            height: '25px',
                            marginLeft: '5px',
                            borderRadius: '100%',
                            color: 'white'
                        }}/>
                    </InputLeftAddon>
                    <Input color='white' focusBorderColor="transparent"
                    border='none' 
                    _placeholder={{color: '#757574'}} 
                    placeholder='¿Qué quieres reproducir?' 
                    fontSize='1em' 
                    value={key} 
                    onChange={(e)=>{handleChange(e)}}
                    />
                </InputGroup>
        </>
    )
}