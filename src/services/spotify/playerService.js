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