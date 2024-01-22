export const fetchGetAlbum= async(id,token)=>{
    try{
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}?market=es`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        })
        if(!response.ok)throw new Error('No se ha podido conseguir la información del album')
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }
}