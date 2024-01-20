

export const fetchFeaturedPlaylists = async(token)=>{
    try{
        const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists",{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error('Error al recibir la playlist')
        }
        const data = await response.json()
        return data; 

    }catch(error){
        console.error(error)
    }
}