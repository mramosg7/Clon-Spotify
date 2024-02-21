const urlBase = "https://api.spotify.com/v1/me/player"

export const fetchGetContext= async(token)=>{
    try{
        const response = await fetch(urlBase,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok) throw Error("No se ha podido sacar el context")
        const data = await response.json()
        return data;
    }catch(error){
        console.error(error)
    }
}

export const fetchTransferPlayback = async(token, device_id)=>{
    try{
        const response = await fetch(urlBase,{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "device_ids": [
                    device_id
                ]
            })
        })
        if(!response.ok) throw new Error("Error al transferir el playback")
        
    }catch(e){
        console.error(e)
    }
}


export const fetchSeek=async(device, token, positionMs)=>{
    console.log(positionMs, device)
    try{
        await fetch(`${urlBase}/seek?position_ms=${positionMs}&device_id=${device}`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        
        return
    }catch(e){
        console.error(e)
    }
}


export const fetchSetVolume = async(device,token,volume)=>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&device_id=${device}`,{
            method:'PUT',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        console.log(response)
        if(!response.ok)throw new Error("Error al configurar el volumen")

    }catch(e){
        console.error(e)
    }
}


export const fetchPlay = async(token, device, position, uri)=>{
    try{
        const response = await fetch(`${urlBase}/play?device_id=${device}`, {
            method:'PUT',
            headers:{
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "context_uri": uri,
                "offset": {
                    "position": position
                },
                "position_ms": 0
            })
        })

        if(!response.ok)throw new Error("No se ha podido reproduccir")
        
    }catch(e){
        console.error(e)
    }
}
export const fetchPlayTopTraks = async(token, device, position, uris)=>{
    try{
        const response = await fetch(`${urlBase}/play?device_id=${device}`, {
            method:'PUT',
            headers:{
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uris": uris,
                "offset": {
                    "position": position
                },
                "position_ms": 0
            })
        })

        if(!response.ok)throw new Error("No se ha podido reproduccir")
        
    }catch(e){
        console.error(e)
    }
}

export const fetchGetDevices = async(token)=>{
    try{
        const response = await fetch(`${urlBase}/devices`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if (!response.ok) throw new Error("Error al obtener los dispositivos")
        const data = await response.json()
        return data;
    }catch(e){
        console.error(e)
    }
}

export const fetchToggleShuffle=async(tk, state, id)=>{
    try{
        const response = await fetch(`${urlBase}/shuffle?device_id=${id}&state=${state}`,{
            method:'put',
            headers:{
                "Authorization":`Bearer ${tk}`
            }
        })
        if(!response.ok) throw new Error('Error al poner en modo aleatorio')
        return
    }catch(e){
        console.error(e)
    }
}


export const fetchSetRepeatMode= async(tk, device, state)=>{
    try{
        const response = await fetch(`${urlBase}/repeat?state=${state}&device_id=${device}`,{
            method:'put',
            headers:{
                "Authorization":`Bearer ${tk}`
            }
        })
        if (!response.ok) throw new Error('Error al cambiar el modo de repeticion')
    }catch(e){
        console.log(e)
    }
}